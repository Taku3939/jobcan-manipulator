import { Page } from "puppeteer";
import { getEndDate } from "utils/date";
import { delay } from "utils/sleep";
const JOBCAN_MAN_HOUR_URL = "https://ssl.jobcan.jp/employee/man-hour-manage";

export const completeManHours = async (page: Page, project_id: string, task_id: string) => {
	for (let i = 1; i < getEndDate() + 1; i++) {
		await page.goto(JOBCAN_MAN_HOUR_URL);

		//モーダルを開く
		await page.click(`.table > tbody > tr:nth-child(${i.toString()}) > .align-middle > .btn`);

		//適当に1s待つ
		await delay(1000);

		//登録済みの工数があれば全て削除する
		await page.waitForSelector("span.jbc-btn-danger");
		let buttons = await page.$$("span.jbc-btn-danger");
		while (buttons.length > 1) {
			await page.evaluate((element) => {
				element.click();
			}, buttons[0]);

			await page.click("body");
			buttons = await page.$$("span.jbc-btn-danger");
		}

		//新たにプロジェクトを登録する
		await page.click(".table > tbody > tr:nth-child(1) > .align-middle > .btn");
		await page.waitForSelector(".table > .man-hour-table-edit > .daily > .align-middle:nth-child(2) > .form-control");
		await page.select(
			".table > .man-hour-table-edit > .daily > .align-middle:nth-child(2) > .form-control",
			project_id,
		);
		await page.waitForSelector(".table > .man-hour-table-edit > .daily > .align-middle:nth-child(3) > .form-control");
		await page.select(".table > .man-hour-table-edit > .daily > .align-middle:nth-child(3) > .form-control", task_id);

		//時間を取得する
		const titleSelector = await page.$("h5.modal-title");
		const titleProperty = await titleSelector?.getProperty("textContent");
		const titleJson = await titleProperty?.jsonValue();
		const title = titleJson?.slice(-5);

		//0ならスキップ
		if (!title || title === "00:00") continue;
		await page.type(".table > .man-hour-table-edit > .daily > .align-middle > .form-control-sm", title);

		//保存
		await page.click("body");
		await page.click("#save");
	}
};
