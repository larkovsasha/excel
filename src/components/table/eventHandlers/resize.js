import {$} from "@core/dom";
import {Actions} from "@/reducers/actions";

/**
 * @param {Dom} $root
 * @param {Event} event
 * @return {Promise}
 * resize columns and rows
 */
export function resizeHandler($root, event) {
    return new Promise(resolve => {
        // column resize
        if (event.target.dataset.resize === 'col') {
            const $resizer = $(event.target);
            const $parent = $resizer.closest('[data-type="rezisable"]');
            const coords = $parent.getCoords();
            const colNumber = $parent.dataSet.col;


            $resizer.css({opacity: 1, bottom: '-5000px'});


            let value;
            document.onmousemove = e => {
                const delta = e.pageX - coords.right;
                value = coords.width + delta;

                // column cannot be less than 40px
                // resizer can't be on the left side of the column
                if (value <= 40) {
                    value = 40;
                }
                $resizer.css({left: (value - 1) + 'px'});
            };
            // find all cells in columns in change their width
            document.onmouseup = () => {
                $root
                    .findAll(`[data-col="${colNumber}"]`)
                    .forEach(el => {
                        el.style.width = value + 'px';
                    });
                $resizer.css({opacity: 0, bottom: 0, right: 0});

                document.onmousemove = null;
                document.onmouseup = null;
                resolve(Actions.colResize($parent.dataSet.col, value));
            };
        }

        // row resize
        if (event.target.dataset.resize === 'row') {
            const $resizer = $(event.target);
            const $parent = $resizer.closest('[data-type="rezisable"]');
            const coords = $parent.getCoords();
            $resizer.css({opacity: 1, right: '-5000px'});

            let value;
            document.onmousemove = e => {
                const delta = e.clientY - coords.bottom;
                value = coords.height + delta;
                if (value <= 20) {
                    value = 20;
                }
                $resizer.css({top: value - 1 + 'px'});
            };

            document.onmouseup = () => {
                $resizer.css({right: 0, opacity: 0});
                $parent.css({height: value + 'px'});
                document.onmousemove = null;
                document.onmouseup = null;
                resolve(Actions.rowResize($parent.dataSet.row, value));
            };
        }
    });
}
