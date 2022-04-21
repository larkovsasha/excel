import {Page} from "@core/Page";
import {$} from "@core/dom";
import {createTableRecords} from "@/pages/dashboard.functions";

/**
 * DashboardPage
*/
export class DashboardPage extends Page {
    /**
     * return DashboardPage html
     * @return {string}
     */
    getRoot() {
        const now = Date.now().toString();
        return $.create('div', 'db').html(`
        <div class="db__header">
            <h1>Excel dashboard</h1>
        </div>

        <div class="db__new">
            <div class="db__view">
                <a href="#excel/${now}" class="db__new-create">
                    Новая <br/>Таблица
                </a>
            </div>
        </div>

        <div class="db__tables db__view">
            ${createTableRecords()}
        </div>`);
    }
}
