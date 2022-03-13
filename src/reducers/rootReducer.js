import {CHANGE_TEXT, COL_RESIZE, ROW_RESIZE} from "@/reducers/types";

/**
 * main  reducer for store
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export function rootReducer(state, action) {
    switch (action.type) {
    case COL_RESIZE:
        state.colState[action.id] = action.value;
        return {...state};
    case ROW_RESIZE:
        state.rowState[action.id] = action.value;
        return {...state};
    case CHANGE_TEXT:
        state.dataState[action.data.id] = action.data.value;
        console.log(state);
        return {...state, currentText: action.data.value};
    default: return state;
    }
}
