/* 
This Abstraction will be useful if we want to create 
multiple notification channels like email, push etc..
Also this can be used to buld common mechanisma fro notificatio
like status, loggging, metric collection etc..
 */
class BaseNotification {
    constructor(message, collectMetrics) {
        this.message = message;
        this.readStatus = null;
        this.deliveryStatus = null;
        this.collectMetrics = collectMetrics || false;
    }

    send() {
        throw new Error("Method not impleneted in inherting child")
    }
}

export default BaseNotification;