import {storage} from "@core/utils";

/**
 * returns item list of tables
 * @param{string}key local storage key
 * @return {string}
 */
function tableItemHtml(key) {
    const {title, openedDate} = storage(key);
    const id = key.split(':')[1];
    return `
        <li class="db__list-record">
            <a href="#excel/${id}">${title}</a>
            <strong>
                ${new Date(openedDate).toLocaleDateString()}
                ${new Date(openedDate).toLocaleTimeString()}
            </strong>
        </li>
    `;
}

/**
 * get all local storage keys
 * @return {Array}
 */
function getAllKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.includes('excel')) {
            continue;
        }
        keys.push(key);
    }
    return keys;
}

/**
 * create list of Tables
 * @return {string}
 */
export function createTableRecords() {
    const keys = getAllKeys();
    if (!keys) {
        return `<p>Пока тут пусто.</p>`;
    }
    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата окрытия</span>
        </div>
        <ul class="db__list">
            ${keys.map(tableItemHtml).join('')}
        </ul>
    `;
}
