import { completeManHours } from "manipurator/manHours";
import { loginPage } from "manipurator/login";
import { chromium } from "playwright";
import "dotenv/config";

//ログイン情報
const EMAIL = process.env.JOBCAN_EMAIL as string;
const PASSWORD = process.env.JOBCAN_PASSWORD as string;
const HEADLESS = (process.env.JOBCAN_HEADLESS as string) === "true";

//自分のプロジェクトIDとタスクIDを入力
const PROJECT_ID = process.argv[3];
const TASK_ID = process.argv[4];

//工数を自動入力
export async function exe() {
	const browser = await chromium.launch({ headless: HEADLESS, channel: "chrome" });
	const page = await browser.newPage();
	await loginPage(page, EMAIL, PASSWORD);
	await completeManHours(page, PROJECT_ID, TASK_ID);
	await browser.close();
}
