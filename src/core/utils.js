/**
 * @param {number} start
 * @param {number} end
 * @return {Array} return range between start and end
 */
export function range(start, end) {
    if (start > end) {
        [start, end] = [end, start];
    }
    return new Array(Math.abs(start - end) + 1)
        .fill('')
        .map((_, index) => start + index);
}

/**
 * get or set store to local storage
 * @param {string} key
 * @param {Object} data
 * @return {Object}
 */
export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key));
    }
    localStorage.setItem(key, JSON.stringify(data));
}


/**
 * checks if objects are equal
 * @param {Object} a
 * @param {Object} b
 * @return {boolean}
 */
export function isEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * transform camel string to dashed case
 * @param {string} str
 * @return {string}
 */
export function camelToDashed(str) {
    return str.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
}

/**
 * transform styles object to inline styles
 * @param {Object} styles
 * @return {string}
 */
export function toInlineStyles(styles) {
    if (!styles) {
        return '';
    }
    styles = Object.keys(styles).map(key => {
        return `${camelToDashed(key)}: ${styles[key]}`;
    }).join(';');
    return styles;
}

/**
 * @param {Function} fn
 * @param {Number} wait
 * @return {string}
 */
export function debounce(fn, wait) {
    let timeout;
    return (...args) => {
        const later = () => {
            clearTimeout(timeout);
            // eslint-disable-next-line no-invalid-this
            fn.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
