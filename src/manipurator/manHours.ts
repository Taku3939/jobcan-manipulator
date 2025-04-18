import { Page } from "playwright";
import { delay } from "utils/sleep";
import { getDaysInThisMonth } from "utils/date";
import { Project, Task } from "domain/project";
import nqdm from "nqdm";

const JOBCAN_MAN_HOUR_URL = "https://ssl.jobcan.jp/employee/man-hour-manage";

export const getProjects = async (page: Page): Promise<Project[]> => {
	await page.goto(JOBCAN_MAN_HOUR_URL);

	//モーダルを開く
	await page.click(".table > tbody > tr:nth-child(1) > .align-middle > .btn");

	//適当に0.5s待つ
	await delay(500);

	//登録済みの工数があれば一旦削除する
	let buttons = await page.locator("span.jbc-btn-danger");
	while ((await buttons?.count()) > 1) {
		buttons.first().click();

		await page.click("body");
		buttons = await page.locator("span.jbc-btn-danger");
	}

	// 一件だけ登録する
	await page.click(".table > tbody > tr:nth-child(1) > .align-middle > .btn");
	await page.waitForSelector(".table > .man-hour-table-edit > .daily > .align-middle:nth-child(2) > .form-control");

	//プロジェクトの一覧を取得する
	const projectPartials = await page
		.locator(".table > .man-hour-table-edit > .daily > .align-middle:nth-child(2) > .form-control")
		.evaluate((node: HTMLSelectElement) =>
			Array.from(node.options)
				.slice(1)
				.map((option) => ({
					name: option.textContent ?? "",
					id: option.value,
				})),
		);

	const projects: Project[] = [];
	for (const partial of projectPartials) {
		//プロジェクトを選択する
		await page
			.locator(".table > .man-hour-table-edit > .daily > .align-middle:nth-child(2) > .form-control")
			.selectOption(partial.id.toString());

		//タスクの一覧を取得する
		await page.waitForSelector(".table > .man-hour-table-edit > .daily > .align-middle:nth-child(3) > .form-control");
		const tasks: Task[] = await page
			.locator(".table > .man-hour-table-edit > .daily > .align-middle:nth-child(3) > .form-control")
			.evaluate((node: HTMLSelectElement) =>
				Array.from(node.options)
					.slice(1)
					.map((option) => ({
						name: option.textContent ?? "",
						id: option.value,
					})),
			);

		projects.push({ id: partial.id, name: partial.name, tasks });
	}
	return projects;
};

export const completeManHours = async (page: Page, project_id: string, task_id: string) => {
	for (const v of nqdm(getDaysInThisMonth())) {
		await page.goto(JOBCAN_MAN_HOUR_URL);

		//モーダルを開く
		await page.click(`.table > tbody > tr:nth-child(${(v + 1).toString()}) > .align-middle > .btn`);

		//適当に0.5s待つ
		await delay(500);

		//登録済みの工数があれば全て削除する
		let buttons = await page.locator("span.jbc-btn-danger");
		while ((await buttons?.count()) > 1) {
			buttons.first().click();

			await page.click("body");
			buttons = await page.locator("span.jbc-btn-danger");
		}

		//新たにプロジェクトを登録する
		await page.click(".table > tbody > tr:nth-child(1) > .align-middle > .btn");
		await page.waitForSelector(".table > .man-hour-table-edit > .daily > .align-middle:nth-child(2) > .form-control");
		await page
			.locator(".table > .man-hour-table-edit > .daily > .align-middle:nth-child(2) > .form-control")
			.selectOption(project_id);
		await page.waitForSelector(".table > .man-hour-table-edit > .daily > .align-middle:nth-child(3) > .form-control");
		await page
			.locator(".table > .man-hour-table-edit > .daily > .align-middle:nth-child(3) > .form-control")
			.selectOption(task_id);

		//時間を取得する
		const titleSelector = await page.$("h5.modal-title");
		const titleProperty = await titleSelector?.getProperty("textContent");
		const titleJson = await titleProperty?.jsonValue();
		const title = titleJson?.slice(-5);

		//0ならスキップ
		if (!title || title === "00:00") continue;
		await page.locator(".table > .man-hour-table-edit > .daily > .align-middle > .form-control-sm").fill(title);

		//保存
		await page.click("body");
		await page.click("#save");

		//適当に0.5s待つ
		await delay(500);
	}
};
