import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {Actions} from "@/reducers/actions";
import {defaultTitle} from "@/constants";
import {ActiveRoute} from "@core/routes/ActiveRoute";

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
            listeners: ['input', 'click'],
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
            <div class="btn" data-button="remove">
                <i class="material-icons" data-button="remove">delete</i>
            </div>

            <div class="btn" data-button="exit">
                <i class="material-icons" data-button="exit">exit_to_app</i>
            </div>
        </div>
        `;
    }
    // eslint-disable-next-line
    onInput(event) {
        const $target = $(event.target);
        this.$dispatch(Actions.changeTitle($target.text()));
    }
    // eslint-disable-next-line
    onClick(event) {
        const $target = $(event.target);
        if ($target.dataSet.button === 'remove') {
            localStorage.removeItem(`excel:${ActiveRoute.param}`);
            ActiveRoute.navigate('#');
        } else if ($target.dataSet.button=== 'exit') {
            ActiveRoute.navigate('#');
        }
    }
}
