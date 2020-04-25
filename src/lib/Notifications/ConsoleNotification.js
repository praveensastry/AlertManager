import BaseNotification from "./BaseNotification.js";

class ConsoleNotification extends BaseNotification {
    constructor(message) {
        super(message);
    }

    send() {
        if (this.collectMetrics) {
            //emit metrics for notifications
        }
        console.log(this.message);
        // mark delivered status
        // mark read status
    }
}

export default ConsoleNotification;