import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {Actions} from "@/reducers/actions";
import {defaultTitle} from "@/constants";

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
            listeners: ['input'],
            ...options,
        });
    }

    /**
     * @return {string} return html string
     */
    toHtml() {
        const title = this.store.getState().title || defaultTitle;
        return `
        <input type="text" class="input" value="${title}">

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
    // eslint-disable-next-line
    onInput(event) {
        const $target = $(event.target);
        this.$dispatch(Actions.changeTitle($target.text()));
    }
}
