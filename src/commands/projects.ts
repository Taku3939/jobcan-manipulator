import { getProjects } from "manipurator/manHours";
import { loginPage } from "manipurator/login";
import { chromium } from "playwright";
import "dotenv/config";

//ログイン情報
const EMAIL = process.env.JOBCAN_EMAIL as string;
const PASSWORD = process.env.JOBCAN_PASSWORD as string;

//自分のプロジェクトIDとタスクIDを入力
const HEADLESS = (process.env.HEADLESS as string) === "true";

//工数を自動入力
export async function exe() {
	const browser = await chromium.launch({ headless: HEADLESS });
	const page = await browser.newPage();
	await loginPage(page, EMAIL, PASSWORD);
	const projects = await getProjects(page);
	console.log(JSON.stringify(projects, null, 2));
	await browser.close();
}
