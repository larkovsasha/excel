import {range} from "@core/utils";

/**
 * @param {Event} event
 * @return {boolean}
 *  whether the event element is a cell
 */
export const isCell = (event) => {
    return event.target.dataset.type === 'cell';
};

/**
 * @param {Dom} cell1
 * @param {Dom} cell2
 * @return {boolean}
 *  returns whether the cells are the same
 */
export const cellsEqual = (cell1, cell2) => {
    if (!cell1 || !cell2) {
        return false;
    }
    const {row: row1, col: col1} = cell1.id();
    const {row: row2, col: col2} = cell2.id();
    return row1 === row2 && col1 === col2;
};

/**
 * @param {Dom} current
 * @param {Dom} target
 * @return {Object} cell array and coordinates for cell group
 */
export const createIds = (current, target) => {
    const rows = range(current.id().row, target.id().row);
    const cols = range(current.id().col, target.id().col);

    const coords = {
        colsStart: cols[0],
        colsEnd: cols[cols.length - 1],
        rowsStart: rows[0],
        rowsEnd: rows[rows.length - 1],
    };
    // create id for cell
    // example: ['0:0', '0:1', '1:0'...]
    const ids = rows.reduce((acc, row) => {
        cols.forEach(col => acc.push(`${row}:${col}`));
        return acc;
    }, []);
    return {ids, coords};
};


export const nextSelector = (key, {col, row}) => {
    const MIN_VALUE = 0;
    switch (key) {
    case 'Enter':
    case 'ArrowDown':
        row++;
        break;
    case 'Tab':
    case 'ArrowRight':
        col++;
        break;
    case 'ArrowLeft':
        col = col - 1 < MIN_VALUE ? col : col - 1;
        break;
    case 'ArrowUp':
        row = row - 1 < MIN_VALUE ? row : row - 1;
        break;
    }
    return `[data-id="${row}:${col}"]`;
};
