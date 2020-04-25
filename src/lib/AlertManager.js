class AlertManager {
    constructor(monitors) {
        this.monitors = monitors;
        this.state = new Map();
    }

    process(data) {
        this.monitors.forEach(monitor => {
            monitor.check(data);
        });

        
    }
}