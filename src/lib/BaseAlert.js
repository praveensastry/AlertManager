class BaseAlert {
    constructor(window, notifier) {
        this.window = window;
        this.notifier = notifier;
        this.verifiedAt = null;
        this.isReadyForEvaluation = false;
        this.state = new Map();
    }

    check(data) {
        throw new Error("Cannot call methods on Abstract Class");
    }
}