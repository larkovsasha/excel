// eslint-disable-next-line require-jsdoc
class Dom {
    /**
     * @param {HTMLElement | string} selector
     */
    constructor(selector) {
        this.$el = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector;
    }

    /**
     * @param {string | undefined} html get or set html
     * @return {string | Object}
     */
    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }

    /**
     * clear html
     * @return {Object}
     */
    clear() {
        this.html('');
        return this;
    }

    /**
     * append nodes to html element
     * @param {HTMLElement | Dom} node
     * @return {Dom}
     */
    append(node) {
        // node can be HTMLElement or Dom instance that return from create
        if (node instanceof Dom) {
            node = node.$el;
        }
        this.$el.append(node);
        return this;
    }

    /**
     * append event listener
     * @param {string} event
     * @param {function} callback
     */
    on(event, callback) {
        this.$el.addEventListener(event, callback);
    }

    /**
     * remove event listener
     * @param {string} event
     * @param {function} callback
     */
    off(event, callback) {
        console.log(callback);
        this.$el.removeEventListener(event, callback);
    }
    /**
     * return closest element parent with selector,
     * which are wrapped by Dom class
     * @param {string} selector
     * @return {Dom}
     */
    closest(selector) {
        return $(this.$el.closest(selector));
    }
    /**
     * @return {Object} coordinates of element
     */
    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    /**
     * @param {string} selector
     * @return {NodeList}
     */
    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    /**
     * @param {Object} styles styles to apply
     */
    css(styles) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key];
        });
    }

    /**
     * @return {Object}
     */
    get dataSet() {
        return this.$el.dataset;
    }
}

/**
 * function for simple work with DOM
 * @param {string | HTMLElement} el
 * @return {Object} Dom
 */
export function $(el) {
    return new Dom(el);
}

$.create = (tagName, ...classes) => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(...classes);
    }
    return $(el);
};

