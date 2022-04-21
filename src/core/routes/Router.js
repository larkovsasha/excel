import {$} from "@core/dom";
import {ActiveRoute} from "@core/routes/ActiveRoute";

/**
 * class for implementing the transition between pages without reload
 */
export class Router {
    /**
     * @param{string}selector
     * @param{Object}routes
     */
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is required');
        }
        this.$placeholder = $(selector);
        this.routes = routes;
        this.page = null;
        this.changePageHandler = this.changePageHandler.bind(this);
    }

    /**
     * start router working
     */
    init() {
        window.addEventListener('hashchange', this.changePageHandler);
        this.changePageHandler();
    }

    /**
     * work when url changed
     * @param{event} event
     */
    changePageHandler(event) {
        if (this.page) {
            this.page.destroy();
        }
        this.$placeholder.clear();
        const Page = ActiveRoute.path.includes('excel') ?
            this.routes.excel:
            this.routes.dashBoard;

        this.page = new Page(ActiveRoute.param);
        this.$placeholder.append(this.page.getRoot());

        this.page.afterRender();
    }

    /**
     * remove eventListener
     */
    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler);
    }
}
