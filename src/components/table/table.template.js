// codes of start and end letter that are used in table
const CODES = {
    A: 65,
    Z: 90,
};

/**
 * create cell
 * @param {string} _ not needed argument
 * @param{number} index
 * @return{string}cell HTML string
 */
function createCell(_, index) {
    return `
        <div class="cell" contenteditable data-col="${index}"></div>
    `;
}

/**
 * create col
 * @param{string}content column content
 * @param{number}index HTML string
 * @return{string}column HTML string
 */
function createCol(content, index) {
    return `
        <div class="column" data-type="rezisable" data-col="${index}">
            ${content}
            <div class="column-resize"  data-resize="col"></div>
        </div>
    `;
}

/**
 * create row
 * @param{string} content row-data HTML string
 * @param{string} number count of row
 * @return{string}row HTML string
 */
function createRow(content, number = '') {
    const resize = number ?
        '<div class="row-resize" data-resize="row"></div>' :
        '';
    return `
        <div class="row" data-type="rezisable">
            <div class="row-info" >
                ${number}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

/**
 * create table
 * @param{number}rowsCount
 * @return{string}row HTML string
 */
export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map((_, index) => {
            return createCol(String.fromCharCode(CODES.A + index), index);
        })
        .join('');
    rows.push(createRow(cols));

    for (let i = 1; i < rowsCount + 1; i++) {
        const row = createRow(new Array(colsCount)
            .fill('')
            .map(createCell)
            .join(''), i.toString());
        rows.push(row);
    }
    return rows.join('');
}
