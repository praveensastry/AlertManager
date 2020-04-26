import BaseAlert from "./BaseAlert.js";

class TrendWindowAlert extends BaseAlert {
    constructor(window, notifier, throttleDuration, waitForFullEvaluationWindow) {
        super(window, notifier, waitForFullEvaluationWindow);
        this.trendDirection = null;
        this.lastAlertedAt = null;
        this.throttleDuration = throttleDuration;
        this.currentRate = null;
        this.previousRate = null;
    }

    getTrendingSubArray(input) {
        if (input.length < 3) {
            return input;
        }

        // detect trend if trendDirection is not set
        let trendDirection = input[input.length - 1].rate > input[input.length - 2].rate ? 1 : -1;

        for (let i = input.length - 2; i >= 1; i--) {
            let currentTrend = (input[i].rate - input[i - 1].rate) > 0 ? 1 : -1;
            if (currentTrend !== trendDirection) {
                //if trend changed return sub arry
                return input.slice(i)
            }
        }

        // if no trend identified return last two elements
        return input.slice(input.length - 2);
    }

    shouldAlert(start, end, lastAlertedAt, throttleDuration, minimumWindow, currentTime) {
        return ((end - start) > minimumWindow) &&
            ((currentTime - lastAlertedAt) > throttleDuration)
    }

    checkCondition(rates, verificationPayload) {
        const newrate = verificationPayload.rate;
        const newTimestamp = verificationPayload.timestamp;

        //find trend
        // if no trend return false


        const now = new Date().getTime();
        const start = rates[0].timestamp;
        const end = rates[rates.length - 1].timestamp;
        if (this.shouldAlert(start, end, this.lastAlertedAt, this.throttleDuration, this.window, now)) {
            this.lastAlertedAt = now;
            const notificationPayload = {
                timestamp: verificationPayload.timestamp,
                currencyPair: verificationPayload.currencyPair,
                alert: trendDirection > 0 ? "rising" : "falling",
                seconds: this.trendDirection
            }
            this.notifier.notify(JSON.stringify(notificationPayload));
        }
    }

    // Override BaseAlert's behaviour
    trigger(data) {
        const currencyPair = data.currencyPair;
        if (!this.state.has(currencyPair)) {
            this.state.set(currencyPair, [{ rate: data.rate, timestamp: data.timestamp }]);
        } else {
            const rates = this.state.get(currencyPair);
            rates.push({ 
                rate: data.rate, 
                timestamp: data.timestamp 
            });
            // No alert when we don't have data of size minimum evaluation window
            if (this.waitForFullEvaluationWindow && rates.length < this.window) {
                this.state.set(currencyPair, rates);
                return;
            } else {
                let trendingSubArray = this.getTrendingSubArray(rates);
                if (trendingSubArray.length < rates.length) {
                    // No trend identified that is of length minimumTrendWindow, so no alert
                    // Discard old data and keep only trending elements
                    this.state.set(currencyPair, trendingSubArray)
                    return;
                }

                // Data has a trend and is of size >= minTrendWindow
                // Check and Alert
                this.state.set(currencyPair, rates);
            }
        }
    }
}

export default TrendWindowAlert;