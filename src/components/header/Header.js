import {ExcelComponent} from "@core/ExcelComponent";

// eslint-disable-next-line require-jsdoc
export class Header extends ExcelComponent {
    /**
     * @return {string} return className
     */
    static get className() {
        return 'excel__header';
    }
    /**
     * @param {Dom} $root className
     * @param {Object} options
     */
    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options,
        });
    }

    /**
     * @return {string} return html string
     */
    toHtml() {
        return `
        <input type="text" class="input" value="Новая таблица">

        <div class="btns-box">
            <div class="btn">
                <i class="material-icons">delete</i>
            </div>

            <div class="btn">
                <i class="material-icons">exit_to_app</i>
            </div>
        </div>
        `;
    }
}
