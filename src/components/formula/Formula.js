import {ExcelComponent} from "@core/ExcelComponent";

// eslint-disable-next-line require-jsdoc
export class Formula extends ExcelComponent {
    /**
     * @param {HTMLElement} $root
     */
    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['click', 'input'],
        });
    }
    /**
     * @return {string} return className
     */
    static get className() {
        return 'excel__formula';
    }

    /**
     * @return {string} return html string
     */
    toHtml() {
        return `
        <div class="formula-info">fx</div>
        <div class="formula-input" contenteditable spellcheck="false"></div>
        `;
    }

    /**
     * on formula input
     * @param{event}event
     */
    onInput(event) {
        console.log("Formula: input", event);
    }

    /**
     * on formula click
     * @param{event}event
     */
    onClick(event) {
        console.log("Formula: click", event);
    }
}
