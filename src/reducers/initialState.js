import {storage} from "@core/utils";
import {defaultFormulaStyles, defaultTitle} from "@/constants";

export const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    currentStyles: {...defaultFormulaStyles},
    stylesState: {},
    currentText: '',
    title: defaultTitle,
    openedDate: new Date().toJSON(),
};


/**
 * return initial state
 * @param {string} key
 * @return {Object}
 */
export function getInitialState(key) {
    console.log(key);
    return storage(key) ?
        storage(key) :
        JSON.parse(JSON.stringify(defaultState));
}
