/**
 * class for simple working with url
 */
export class ActiveRoute {
    /**
     * return current path
     * @return {string}
     */
    static get path() {
        return window.location.hash.slice(1);
    }

    /**
     * return current param
     * @return {string}
     */
    static get param() {
        return ActiveRoute.path.split('/')[1];
    }

    /**
     * change url hash
     * @param {string}path
     */
    static navigate(path) {
        window.location.hash = path;
    }
}
