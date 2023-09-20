const commands = process.argv[2];

switch (commands) {
	case "complete":
		import("./commands/complete").then((m) => m.exe());
		break;
	case "projects":
		import("./commands/projects").then((m) => m.exe());
		break;
	default:
		console.log("無効なコマンドです");
		break;
}
