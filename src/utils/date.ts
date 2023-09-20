// 指定した月の日数を計算する関数
export function getDaysInMonth(year: number, month: number) {
	return new Date(year, month, 0).getDate();
}

// 今月の日数を計算する関数
export function getDaysInThisMonth() {
	return getDaysInMonth(new Date().getFullYear(), new Date().getMonth() + 1);
}
