import BaseAlert from "./BaseAlert.js";

class MovingAverageAlert extends BaseAlert {
    constructor(window, notifier, waitForFullEvaluationWindow) {
        super(window, notifier, waitForFullEvaluationWindow);
    }

    checkCondition(rates, verificationPayload) {
        const currentRate = verificationPayload.rate;
        // Instead of calculating avg all the time
        // we can optimize it by memoization
        const threshold = rates.reduce((a, b) => { a + b, 0 }) / this.window;
        const change = Math.abs(threshold - currentRate);
        const percentageChange = (change / threshold) * 100;

        if (percentageChange > 10) {
            const notificationPayload = {
                timestamp: verificationPayload.timestamp,
                currencyPair: verificationPayload.currencyPair,
                alert: "spotChange"
            }
            this.notifier.notify(JSON.stringify(notificationPayload));
        }
    }

    trigger(data) {
        // Use BaseAlert Trigger with this Alert's Alert function
        super.trigger(data, this.checkCondition);
    }
}

export default MovingAverageAlert;