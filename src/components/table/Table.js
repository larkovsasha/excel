import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";

// eslint-disable-next-line require-jsdoc
export class Table extends ExcelComponent {
    /**
     * @return {string} return className
     */
    static get className() {
        return 'excel__table';
    }

    /**
     * @return {string} return html string
     */
    toHtml() {
        return `
            ${createTable(20)}
        `;
    }
}
