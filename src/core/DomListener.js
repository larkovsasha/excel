/**
 * add and remove event listener
 */
export class DomListener {
    /**
     * @param {Dom} $root
     * @param {string[]} listeners
     */
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No root provided for DomListener');
        }
        this.$root = $root;
        this.listenrs = listeners;
    }
    /**
     * add event listeners to component
     */
    initDOMListeners() {
        this.listenrs.forEach(listener => {
            const eventCallbackName = createMethodName(listener);
            if (!this[eventCallbackName]) {
                throw new Error(`Method ${eventCallbackName} is not implemented
                 in ${this.name} Component`);
            }
            this[eventCallbackName] = this[eventCallbackName].bind(this);
            this.$root.on(listener, this[eventCallbackName]);
        });
    }

    /**
     * remove event component's listeners
     */
    removeDOMListeners() {
        this.listenrs.forEach(listener =>{
            const eventCallbackName = createMethodName(listener);
            this.$root.off(listener, this[eventCallbackName]);
        });
    }
}

/**
 * create method name which is determined in component
 * @param{string}event
 * @return{string}
 */
function createMethodName(event) {
    return 'on' + event[0].toUpperCase() + event.slice(1);
}
createMethodName('0');

