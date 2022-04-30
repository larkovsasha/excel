import {createToolbar} from "@/components/toolbar/toolbar.template";
import {$} from "@core/dom";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {defaultFormulaStyles} from "@/constants";

// eslint-disable-next-line require-jsdoc
export class Toolbar extends ExcelStateComponent {
    /**
     * @return {string} return className
     */
    static get className() {
        return 'excel__toolbar';
    }

    /**
     * @param {Dom} $root className
     * @param {Object} options
     */
    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options,
        });
    }

    /**
     * init DomListeners and Selectors
     */
    init() {
        super.init();
        // this.$subscribe(state =>{
        //     this.$formula.text(state.currentText);
        //     console.log(state, 'formula');
        // });
    }
    /**
     * method calls before embedding in DOM
     */
    prepare() {
        const initialState = {...defaultFormulaStyles};
        this.initState(initialState);
    }

    // /**
    //  * @return {string} return html string
    //  */
    // get template() {
    //     console.log('temp');
    //     return createToolbar(this.state);
    // }

    /**
     * @return {string} return html string
     */
    toHtml() {
        return createToolbar(this.state);
    }

    /**
     * @param {Object} changes on store changed
     */
    storeChanged({currentStyles}) {
        this.setState(currentStyles);
    }

    /**
     * @param{Event} e
     */
    onClick(e) {
        const $target = $(e.target);
        if ($target.dataSet.type === 'tl_button') {
            const value = JSON.parse($target.dataSet.value);
            this.$emit('toolbar:ApplyStyles', value);
        }
    }
}
