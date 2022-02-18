import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";

// eslint-disable-next-line require-jsdoc
export class Table extends ExcelComponent {
    /**
     * @return {string} return className
     */
    static get className() {
        return 'excel__table';
    }

    // eslint-disable-next-line require-jsdoc
    constructor($root) {
        super($root, {
            listeners: ['mousedown'],
        });
    }

    /**
     * @return {string} return html string
     */
    toHtml() {
        return `
            ${createTable(200)}
        `;
    }

    /**
     * @param {Event} event
     * resize columns and rows
     */
    onMousedown(event) {
        resizeHandler(this.$root, event);
    }
}
