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
    }
    // /**
    //  * @return {string} return html string
    //  */
    // toHtml() {
    //     return '<div>component</div>';
    // }
    /**
     * init event listeners
     */
    init() {
        this.initDOMListeners();
    }

    /**
     * remove event listeners
     */
    destroy() {
        this.removeDOMListeners();
    }
}
