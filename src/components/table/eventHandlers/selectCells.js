import {$} from "@core/dom";

import {createIds, isCell} from "@/components/table/table.functions";

/**
 * @param {Dom} $root
 * @param {Event} event
 * @param {TableSelection} selection See {@link TableSelection}
 * select cell or cells group
 */
export function selectCellsHandler($root, event, selection) {
    if (isCell(event)) {
        if (event.shiftKey) {
            createCellsGroup($root, selection, event.target);
        } else {
            const $el = $(event.target);
            selection.select($el);
            document.onmousemove = (e) => {
                if (isCell(e)) {
                    createCellsGroup($root, selection, e.target);
                }
            };
            document.onmouseup = (_) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
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
    selection.selectGroup(cells, coords);
};

