const selectedClassName = 'selected';
const groupSelectedClassName = 'selected-background';
/**
 * class for cell selection
 */
export class TableSelection {
    // eslint-disable-next-line require-jsdoc
    constructor() {
        this.group = [];
        this.current = null;
        this.groupEdgeCell = null;
    }
    /**
     * @param {Dom} $el dom selector
     */
    select($el) {
        $el.focus();
        this.clear();
        this.group = [];
        this.current = $el;
        this.group.push($el);
        $el.addClass(selectedClassName);
    }
    /**
     * clear selected cells
     */
    clear() {
        this.group.forEach($cell => {
            $cell.removeClass(selectedClassName);
            $cell.removeClass(groupSelectedClassName);
            $cell.css({boxShadow: ''});
        });
        this.group = [];
    }
    /**
     * @param{Dom[]}$group
     * @param{Object}coordinates coordinates of cells group
     * @param{Dom}groupEdgeCell the cell in which the cursor is
     * located when scaling the selected area
     * set cells group
     */
    selectGroup($group = [], coordinates, groupEdgeCell) {
        this.groupEdgeCell = groupEdgeCell;
        this.groupCoords = coordinates;
        this.clear();
        this.current.addClass(selectedClassName).focus();
        this.group = $group;

        this.group.forEach($el => this.applyCellsStyles($el));
    }
    /**
     * @param{Dom}$cell
     * set css to cell
     */
    applyCellsStyles($cell) {
        const {row, col} = $cell.id();
        if (row === this.groupCoords.rowsStart) {
            $cell.updateCss({boxShadow: '0px -2px #1a73e8'});
        }
        if (row === this.groupCoords.rowsEnd) {
            $cell.updateCss({boxShadow: '0 2px #1a73e8'});
        }
        if (col === this.groupCoords.colsStart) {
            $cell.updateCss({boxShadow: '-2px 0px #1a73e8'});
        }
        if (col === this.groupCoords.colsEnd) {
            $cell.updateCss({boxShadow: '2px 0 #1a73e8'});
        }
        $cell.addClass(groupSelectedClassName);
    }
}
