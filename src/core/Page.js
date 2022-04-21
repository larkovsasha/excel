/**
 * page of application
 */
export class Page {
    /**
     * @param{Object}params
     */
    constructor(params) {
        this.params = params;
    }
    /**
     * return Page html
     */
    getRoot() {
        throw new Error('you need' +
            ' to rewrite the method in the inherited class');
    }
    /**
     * will be executed after installation in dom
     */
    afterRender() {
    }

    /**
     * destroy
     */
    destroy() {
    }
}
