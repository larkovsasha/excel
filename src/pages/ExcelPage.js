import {Page} from "@core/Page";
import {Excel} from "@/components/excel/Excel";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Header} from "@/components/header/Header";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";
import {createStore} from "@core/createStore";
import {rootReducer} from "@/reducers/rootReducer";
import {storage} from "@core/utils";
import {getInitialState} from "@/reducers/initialState";

/**
 * Excel Page
 */
export class ExcelPage extends Page {
    /**
     * return Excel Page html
     * @return {Dom | string}
     */
    getRoot() {
        const key = `excel:${this.params || Date.now().toString()}`;
        const store = createStore(rootReducer, getInitialState(key));
        store.subscribe(state => {
            storage(key, state);
        });
        this.excel = new Excel( {
            components: [Header, Toolbar, Formula, Table],
            store,
        });
        return this.excel.getRoot();
    }

    /**
     * init listeners
     */
    afterRender() {
        this.excel.init();
    }

    /**
     * destroy page
     */
    destroy() {
        this.excel.destroy();
    }
}
