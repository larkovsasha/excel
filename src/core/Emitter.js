/**
 * class for для передачи данными между компонентами
 */
export class Emitter {
    // eslint-disable-next-line require-jsdoc
    constructor() {
        this.listeners = {};
    }
    /**
     * @param {string} event
     * @param {any} args
     * @return {boolean}
     */
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false;
        }
        this.listeners[event].forEach(listener => {
            listener(...args);
        });
        return true;
    }
    /**
     * subscribe to event
     * @param {string} event
     * @param {Function} fn
     * @return {Function}
     */
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => {
                return listener !== fn;
            });
        };
    }
}
