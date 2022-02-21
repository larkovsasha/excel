/**
 * @param {number} start
 * @param {number} end
 * @return {Array} return range between start and end
 */
export function range(start, end) {
    if (start > end) {
        [start, end] = [end, start];
    }
    return new Array(Math.abs(start - end) + 1)
        .fill('')
        .map((_, index) => start + index);
}
