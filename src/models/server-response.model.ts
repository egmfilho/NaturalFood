export class Status {
	public code: number;
	public message: string;
}

export class Response {
	public status: Status;
	public info: any;
	public data: any;
}