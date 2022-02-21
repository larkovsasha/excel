import {DomListener} from '@core/DomListener';

/**
 * base class for components
 */
export class ExcelComponent extends DomListener {
    /**
     * @param {Dom} $root
     * @param {Object} options
     */
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.prepare();
        this.unsubscribers = [];
    }
    /**
     * method for logic to be executed after getting an instance of class
     * and before other methods
     */
    prepare() {
    }
    /**
     * init event listeners
     */
    init() {
        this.initDOMListeners();
    }
    /**
     * @param{string}event
     * @param{any}args
     * notify subscriber
     */
    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }
    /**
     * @param{string}event
     * @param{Function}fn
     * subscribe to event
     */
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }
    /**
     * remove event listeners
     */
    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach(unsub => unsub());
    }
}
