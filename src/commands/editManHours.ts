import { completeManHours } from "core/manHours";
import { loginPage } from "core/login";
import { chromium } from "playwright";
import "dotenv/config";

//ログイン情報
const EMAIL = process.env.JOBCAN_EMAIL as string;
const PASSWORD = process.env.JOBCAN_PASSWORD as string;

//自分のプロジェクトIDとタスクIDを入力
const PROJECT_ID = process.env.JOBCAN_PROJECT_ID as string;
const TASK_ID = process.env.JOBCAN_TASK_ID as string;

//工数を自動入力
(async () => {
	const browser = await chromium.launch({ headless: false });
	const page = await browser.newPage();
	await loginPage(page, EMAIL, PASSWORD);
	await completeManHours(page, PROJECT_ID, TASK_ID);
	await browser.close();
})();
