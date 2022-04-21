import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/eventHandlers/resize";
import {TableSelection} from "@/components/table/TableSelection";
import {selectCellsHandler} from "@/components/table/eventHandlers/selectCells";
import {isCell, nextSelector} from "@/components/table/table.functions";
import {$} from "@core/dom";
import {Actions} from "@/reducers/actions";
import {defaultFormulaStyles} from "@/constants";

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
            ${createTable(200, this.store.getState())}
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

        const $cell = this.$root.find('[data-id="0:0"]');
        this.selectCell($cell);
        this.$on('formula:input', text => {
            this.selection.current.text(text);
            this.changeText(text);
        });
        this.$on('formula:done', text => {
            this.selection.current.focus();
        });

        this.$on('toolbar:ApplyStyles', value => {
            this.selection.applyStyles(value);
            this.$dispatch(Actions.applyStyles({
                value,
                ids: this.selection.selectedIds,
            }));
            this.$dispatch(Actions.changeCurrentCellStyles(value));
        });
    }

    /**
     * select current cell and emit cellSelect
     * @param {Dom} $cell className
     */
    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:cellSelect', $cell);
        this.$dispatch({type: 'select'});
        this.changeText($cell.text());
        const styles = $cell.getStyles(Object.keys(defaultFormulaStyles ));
        this.$dispatch(Actions.changeCurrentCellStyles(styles));
    }


    /**
     * select cell group
     * @param {Event} event className
     */
    handleSelectCellGroup(event) {
        if (isCell(event)) {
            const $cell = $(event.target);
            this.$emit('table:cellSelect', $cell);
            this.$dispatch({type: 'select'});

            const styles = $cell.getStyles(Object.keys(defaultFormulaStyles ));
            this.$dispatch(Actions.changeCurrentCellStyles(styles));
            selectCellsHandler(this.$root, event, this.selection);
        }
    }

    /**
     * resize column or row
     * @param {Event} event className
     */
    async handleResizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event);
            this.$dispatch(data);
        } catch (e) {
            console.warn(e);
        }
    }

    /**
     * @param {Object} value
     * change currentText in store
     */
    changeText(value) {
        const {row, col} = this.selection.current.id();
        const id = `${row}:${col}`;
        this.$dispatch(Actions.changeText({
            id,
            value,
        }));
    }

    /**
     * @param {Event} event
     * resize columns and rows
     */
    onMousedown(event) {
        this.handleResizeTable(event);
        this.handleSelectCellGroup(event);
    }


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
     * emit text to formula
     */
    onInput(event) {
        this.changeText($(event.target).text());
    }
}

