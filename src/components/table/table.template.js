// codes of start and end letter that are used in table
const CODES = {
    A: 65,
    Z: 90,
};
const DEFAULT_WIDTH = 120 + 'px';
const DEFAULT_HEIGHT = 24 + 'px';

/**
 * create cell
 * @param {number} row not needed argument
 * @param {Object} state
 * @return{Function}
 */
function createCell(row, state) {
    /**
     * create cell
     * @param {string} _ not needed argument
     * @param{number} index
     * @return{string}cell HTML string
     */
    const colState = state.colState;
    const dataState = state.dataState;
    return (_, index) => {
        const id = `${row}:${index}`;
        const width = (colState[index] || DEFAULT_WIDTH) + 'px';
        const value = dataState[id] ? dataState[id] : '';
        return `
        <div 
            class="cell" contenteditable 
            data-col="${index}"
            data-type="cell"
            data-id="${id}"
            style="width: ${width}"
        >${value}</div>
    `;
    };
}

/**
 * create col
 * @param{string}content column content with cells
 * @param{number}index HTML string
 * @param{Object}colState state with widths of cols
 * @return{string}column HTML string
 */
function createCol(content, index, colState) {
    const width = (colState[index] || DEFAULT_WIDTH) + 'px';
    return `
        <div class="column" 
        data-type="rezisable"
         data-col="${index}"
          style="width: ${width}">
            ${content}
            <div class="column-resize"  data-resize="col"></div>
        </div>
    `;
}

/**
 * create row
 * @param{string} cells row-data HTML string
 * @param{Object} rowState
 * @param{string} number count of row
 * @return{string}row HTML string
 */
function createRow(cells, rowState= {}, number = '') {
    const resize = number ?
        '<div class="row-resize" data-resize="row"></div>' :
        '';
    const height = (rowState[number] || DEFAULT_HEIGHT) + 'px';
    return `
        <div class="row" 
          data-type="rezisable"
          data-row=${number}
          style="height: ${height}">
            <div class="row-info" >
                ${number}
                ${resize}
            </div>
            <div class="row-data">${cells}</div>
        </div>
    `;
}

/**
 * create table
 * @param{number}rowsCount
 * @param{Object}state
 * @return{string}row HTML string
 */
export function createTable(rowsCount = 15, state) {
    const {rowState, colState} = state;
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    // create first row of letters
    const cols = new Array(colsCount)
        .fill('')
        .map((_, index) => {
            return createCol(
                String.fromCharCode(CODES.A + index), index, colState,
            );
        })
        .join('');
    rows.push(createRow(cols));

    // create rows of cells
    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(rowIndex, state))
            .join('');
        const row = createRow(cells, rowState, (rowIndex + 1).toString());

        rows.push(row);
    }
    return rows.join('');
}
