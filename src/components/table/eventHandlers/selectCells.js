import {$} from "@core/dom";

import {cellsEqual,
    createIds,
    isCell} from "@/components/table/table.functions";

/**
 * @param {Dom} $root Table component
 * @param {Event} event
 * @param {TableSelection} selection See {@link TableSelection}
 * select cell or cells group
 */
export function selectCellsHandler($root, event, selection) {
    if (event.shiftKey) {
        createCellsGroup($root, selection, event.target);
    } else {
        const $el = $(event.target);
        selection.select($el);
        document.onmousemove = (e) => {
            // optimize
            // if the cursor moves in the cell itself,
            //  the rerender will not occur
            const needToRerender = (isCell(e) &&
                !cellsEqual($(e.target), selection.current) &&
                !cellsEqual(selection.groupEdgeCell, $(e.target)));
            if (needToRerender) {
                createCellsGroup($root, selection, e.target);
            }
        };
        document.onmouseup = (_) => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }
}

/**
 * @param {Dom} $root
 * @param {TableSelection} selection
 * @param {HTMLElement} target
 * find desired cells and send to selection.selectGroup
 */
const createCellsGroup = ($root, selection, target) => {
    const current = selection.current;
    target = $(target);
    const {ids, coords} = createIds(current, target);
    const cells = ids.map(id => $root.find(`[data-id="${id}"]`));
    selection.selectGroup(cells, coords, target);
};

