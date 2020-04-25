/* 

While the current implementation is quite simple,
it can be easily extended to do filtering, data transoformation, 
PII anonymization etc here in the Alert Manager before passing to
actula monitors.

 */
class AlertManager {
    constructor(monitors) {
        this.monitors = monitors;
    }

    process(data) {
        this.monitors.forEach(monitor => {
            monitor.trigger(data);
        });
    }
}

export default AlertManager;