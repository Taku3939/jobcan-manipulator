export type Project = {
	id: string;
	name: string;
	tasks: Task[];
};

export type Task = {
	id: string;
	name: string;
};
