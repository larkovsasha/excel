import {$} from "@core/dom";
import {Emitter} from "@core/Emitter";
import {StoreSubscriber} from "@core/storeSubscriber";
import {Actions} from "@/reducers/actions";

/**
 * main class in app which includes other components
 * and manage them
 */
export class Excel {
    /**
     * @param {Object} options options set.
     * options{
     *     components: [] // components to render
     * }
     */
    constructor( options) {
        this.components = options.components || [];
        this.emmiter = new Emitter();
        this.store = options.store;
        this.subscriber = new StoreSubscriber(this.store);
    }
    /**
     * create root element and append components instances
     * @return {Dom | string} return root
     */
    getRoot() {
        const $root = $.create('div', 'excel');

        const componentOptions = {
            emitter: this.emmiter,
            store: this.store,
        };
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el, componentOptions);
            $el.html(component.toHtml());
            $root.append($el);
            return component;
        });
        return $root.$el;
    }
    /**
     * init all components
     */
    init() {
        this.store.dispatch(Actions.updateDate());
        this.subscriber.subscribeComponents(this.components);
        this.components.forEach(component => component.init());
    }
    /**
     * destroy all components
     */
    destroy() {
        this.subscriber.unsubscribeComponents();
        this.components.forEach(comp => comp.destroy());
    }
}
