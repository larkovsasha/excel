import {
    APPLY_STYLES, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE,
    COL_RESIZE, ROW_RESIZE,
} from "@/reducers/types";

export const Actions = {
    colResize(id, value) {
        return {
            type: COL_RESIZE,
            id,
            value,
        };
    },

    rowResize(id, value) {
        return {
            type: ROW_RESIZE,
            id,
            value,
        };
    },

    changeText(data) {
        return {
            type: CHANGE_TEXT,
            data,
        };
    },
    changeCurrentCellStyles(data) {
        return {
            type: CHANGE_STYLES,
            data,
        };
    },
    applyStyles(data) {
        return {
            type: APPLY_STYLES,
            data,
        };
    },
    changeTitle(data) {
        return {
            type: CHANGE_TITLE,
            data,
        };
    },
};
