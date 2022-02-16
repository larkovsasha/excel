// codes of start and end letter that are used in table
const CODES = {
    A: 65,
    Z: 90,
};

/**
 * create cell
 * @return{string}cell HTML string
 */
function createCell() {
    return `
        <div class="cell" contenteditable></div>
    `;
}

/**
 * create col
 * @param{string}content column content
 * @return{string}column HTML string
 */
function createCol(content) {
    return `
        <div class="column">
            ${content}
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
    return `
        <div class="row">
            <div class="row-info">${number}</div>
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
            return createCol(String.fromCharCode(CODES.A + index));
        })
        .join('');
    rows.push(createRow(cols));

    for (let i = 1; i < rowsCount + 1; i++) {
        const row = createRow(new Array(colsCount).fill(createCell())
            .join(''), i.toString());
        rows.push(row);
    }
    return rows.join('');
}
