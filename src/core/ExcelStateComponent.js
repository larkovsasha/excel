import {ExcelComponent} from "@core/ExcelComponent";

/**
 * creates a local state of the component
 */
export class ExcelStateComponent extends ExcelComponent {
    /**
     * creates a local state of the component
     */
    constructor(...args) {
        super(...args);
    }

    /**
     * @param{Object} state
      * initializes local state in component
     */
    initState(state = {}) {
        this.state = state;
    }

    // /**
    //  * return html template which depends on the state
    //  * @return{String}
    //  */
    // get template() {
    //     console.log(1, 't');
    //     return this.toHtml();
    // }

    /**
     * @param{Object} newState
     * initializes local state in component
     */
    setState(newState) {
        this.state = {...this.state, ...newState};
        // this will rerender component, when state changed
        this.$root.html(this.toHtml());
    }
}
