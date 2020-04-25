import ConsoleNotification from "./Notifications/ConsoleNotification.js";

class NotificationManager {
    constructor(channels) {
        if (channels === undefined) {
            channels = [{type: "console"}];
        }
        this.channels = channels;
    }

    // Ideally this mapping should be read from configuration
    mapChannelsToNotifications(message, type) {
        switch (type) {
            case "console":
                let notification = new ConsoleNotification(message);
                notification.send();
                break;
            default:
                break;
        }
    }

    notify(message, channelFilterFn) {
        let channels = this.channels;
        if (channelFilterFn) {
            channels = channels.filter(channelFilters);
        }
        channels.forEach((channel) => {
            this.mapChannelsToNotifications(message, channel.type);
        })
    }
}

export default NotificationManager;