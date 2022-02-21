import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/eventHandlers/resize";
import {TableSelection} from "@/components/table/TableSelection";
import {selectCellsHandler} from "@/components/table/eventHandlers/selectCells";
import {nextSelector} from "@/components/table/table.functions";
import {$} from "@core/dom";

// eslint-disable-next-line require-jsdoc
export class Table extends ExcelComponent {
    /**
     * @return {string} return className
     */
    static get className() {
        return 'excel__table';
    }

    /**
     * @param {Dom} $root className
     * @param {Object} options
     */
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options,
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
     * See {@link ExcelComponent.prepare}
     */
    prepare() {
        this.selection = new TableSelection();
    }
    /**
     * init DomListeners and Selectors
     */
    init() {
        super.init();

        const $cell = this.$root.find('[data-id="0:1"]');
        this.selectCell($cell);
        this.$on('formula:input', text => {
            this.selection.current.text(text);
        });
        this.$on('formula:done', text => {
            this.selection.current.focus();
        });
    }
    /**
     * select current cell and create new Event
     * @param {Dom} $cell className
     */
    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:cellSelect', $cell);
    }

    /**
     * @param {Event} event
     * resize columns and rows
     */
    onMousedown(event) {
        resizeHandler(this.$root, event);
        selectCellsHandler(this.$root, event, this.selection);
    }
    /* Сделать возможность менять текст в ячеке стрелками*/
    /**
     * @param {Event} event
     * navigation through the table with buttons
     */
    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowUp',
            'ArrowDown',
            'ArrowRight',
            'ArrowLeft',
        ];
        const {key} = event;
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.selection.current.id();
            const selector = nextSelector(key, id);
            const $next = this.$root.find(selector);
            if ($next.$el) {
                this.selectCell($next);
            }
        }
    }
    /**
     * @param {Event} event
     */
    onInput(event) {
        this.$emit('table:input', $(event.target));
    }
}

