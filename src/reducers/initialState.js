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
};
export const initialState = storage('excel-state') ?
    storage('excel-state') :
    defaultState;
