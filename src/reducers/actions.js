import {CHANGE_TEXT, COL_RESIZE, ROW_RESIZE} from "@/reducers/types";

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
};
