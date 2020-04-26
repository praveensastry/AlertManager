class BaseAlert {
    constructor(window, notifier, waitForFullEvaluationWindow) {
        this.window = window;
        this.notifier = notifier;
        this.threshold = -1;
        this.state = new Map();
        this.waitForFullEvaluationWindow = waitForFullEvaluationWindow || false;
    }

    // This method is useful for alerts where the data in observations
    // is limited to evaluation window size precisely.
    // This can be overridden if the behaviour needs to be changed.
    trigger(data, alertFunction) {
        // const timestamp = data.timestamp;
        const currencyPair = data.currencyPair;
        const rate = data.rate;
        if (!this.state.has(currencyPair)) {
            this.state.set(currencyPair,[rate]);
        } else {
            const rates = this.state.get(currencyPair);
            // No need to check when we don't have full evaluation window
            if (this.waitForFullEvaluationWindow && rates.length < this.window) {
                rates.push(rate);
                this.state.set(currencyPair, rates);
                return;
            } else {
                // Create a new copy of rates for the evaluation period
                // instead of passing the state around to minimize concurrency issues
                alertFunction.call(this, [...rates], data);
                // Make room for current rate
                if (rates.length === this.window) {
                    rates.shift();
                }
                // Add current rate
                rates.push(rate);
                // update state
                this.state.set(currencyPair, rates);
            }
        }
    }
}

export default BaseAlert;