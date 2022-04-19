import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";

// eslint-disable-next-line require-jsdoc
export class Formula extends ExcelComponent {
    /**
     * @param {Dom} $root className
     * @param {Object} options
     */
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options,
        });
    }

    /**
     * @return {string} return className
     */
    static get className() {
        return 'excel__formula';
    }

    /**
     * init DomListeners and Selectors
     */
    init() {
        super.init();
        this.$formula = this.$root.find('#formula-input');
        this.$on('table:cellSelect', $cell => {
            this.$formula.text($cell.text());
        });
        this.$on('table:input', $cell => {
            this.$formula.text($cell.text());
        });
        // this.$subscribe(state =>{
        //     this.$formula.text(state.currentText);
        //     console.log(state, 'formula');
        // });
    }

    // eslint-disable-next-line require-jsdoc
    storeChanged({currentText}) {
        this.$formula.text(currentText);
    }

    /**
     * @return {string} return html string
     */
    toHtml() {
        return `
        <div class="formula-info">fx</div>
        <div id="formula-input"
         class="formula-input" contenteditable spellcheck="false"></div>
        `;
    }

    /**
     * on formula input
     * @param{Event}event
     */
    onInput(event) {
        this.emitter.emit('formula:input', $(event.target).text());
    }
    /**
     * on press enter focus moves to cell
     * @param{Event}event
     */
    onKeydown(event) {
        const keys = ['Tab', 'Enter'];
        if (keys.includes(event.key)) {
            event.preventDefault();
            this.emitter.emit('formula:done');
        }
    }
}
