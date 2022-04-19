import {
    CHANGE_TEXT, COL_RESIZE,
    CHANGE_STYLES, ROW_RESIZE, APPLY_STYLES, CHANGE_TITLE,
} from "@/reducers/types";

/**
 * main  reducer for store
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export function rootReducer(state, action) {
    let stylesState;
    switch (action.type) {
    case '__INIT__':
        return {...state, currentStyles: {}};
    case COL_RESIZE:
        state.colState[action.id] = action.value;
        return {...state};
    case ROW_RESIZE:
        state.rowState[action.id] = action.value;
        return {...state};
    case CHANGE_TEXT:
        state.dataState[action.data.id] = action.data.value;
        return {...state, currentText: action.data.value};
    case CHANGE_STYLES:
        return {...state, currentStyles: action.data};
    case APPLY_STYLES:
        stylesState = state.stylesState || {};
        action.data.ids.forEach(({row, col}) => {
            const stringId = `${row}:${col}`;
            stylesState[stringId] = {
                ...stylesState[stringId],
                ...action.data.value,
            };
        });
        return {
            ...state,
            stylesState: {...stylesState},
        };
    case CHANGE_TITLE:
        return {...state, title: action.data};
    default: return state;
    }
}
