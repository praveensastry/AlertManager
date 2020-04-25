class NotificationManager {
    constructor(type) {
        this.type = type;
    }

    send(message) {
        switch (this.type) {
            case "console":
                console.log(message);
                break;
            default:
                break;
        }
    }
}