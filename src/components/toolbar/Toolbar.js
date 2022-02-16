import {ExcelComponent} from "@core/ExcelComponent";

// eslint-disable-next-line require-jsdoc
export class Toolbar extends ExcelComponent {
    /**
     * @return {string} return className
     */
    static get className() {
        return 'excel__toolbar';
    }

    /**
     * @return {string} return html string
     */
    toHtml() {
        return `
            <div class="btn">
                <i class="material-icons">format_align_left</i>
            </div>

            <div class="btn">
                <i class="material-icons">format_align_justify</i>
            </div>

            <div class="btn">
                <i class="material-icons">format_align_right</i>
            </div>

            <div class="btn">
                <i class="material-icons">format_bold</i>
            </div>

            <div class="btn">
                <i class="material-icons">format_italic</i>
            </div>

            <div class="btn">
                <i class="material-icons">format_underline</i>
            </div>
        
        `;
    }
}
