/* 

While the current implementation is quite simple,
it can be easily extended to do filtering, data transoformation, 
PII anonymization etc here in the Alert Manager before passing to
actula monitors.

 */
class AlertManager {
    constructor(monitors, shouldPersistData) {
        this.monitors = monitors;
        this.shouldPersistData = shouldPersistData || false;
        if (shouldPersistData) {
            this.storageDriver = new StorageDriver();
        }
    }

    process(data) {
        // Data Persistance is Alert Manager's concern
        // StorageDriver can be configured with appropriate storage config
        if (this.shouldPersistData) {
            this.storageDriver.save(data);
        }
        // Each Monitors state will only contain data necessary to verfiy and alert
        this.monitors.forEach(monitor => {
            monitor.trigger(data);
        });
        
    }
}

export default AlertManager;