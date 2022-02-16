import {$} from "@core/dom";

/**
 * main class in app which includes other components
 * and manage them
 */
export class Excel {
    /**
     * @param {string} selector dom selector
     * @param {Object} options options set.
     * options{
     *     components: [] // components to render
     * }
     */
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
    }
    /**
     * create root element and append components instances
     * @return {Dom} return root
     */
    getRoot() {
        const $root = $.create('div', 'excel');
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el);
            $el.html(component.toHtml());
            $root.append($el);
            return component;
        });
        return $root;
    }
    /**
     * render root element
     */
    render() {
        this.$el.append(this.getRoot());
        this.components.forEach(component => component.init());
    }
}
