import {Router} from "@core/routes/Router";
import {DashboardPage} from "@/pages/DashboardPage";
import './scss/index.scss';
import {ExcelPage} from "@/pages/ExcelPage";

const router = new Router('#app', {
    dashBoard: DashboardPage,
    excel: ExcelPage,
});
router.init();
