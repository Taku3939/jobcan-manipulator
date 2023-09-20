import { Page } from "playwright";

const JOBCAN_LOGIN_URL = "https://id.jobcan.jp/users/sign_in?app_key=atd";

export const loginPage = async (page: Page, email: string, password: string) => {
	// await page.setViewport({
	// 	width: 1920,
	// 	height: 1080,
	// 	deviceScaleFactor: 1,
	// });
	await page.goto(JOBCAN_LOGIN_URL);
	await page.locator("#user_email").fill(email);
	await page.locator("#user_password").fill(password);
	await page.click("#login_button");
};
