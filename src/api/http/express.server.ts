import express from "express";
import { SnsManager } from "../../abtraction/adapter/SnsManager";
import { LinkedlnSns } from "../../core.business/linkedln/linkedln.sns";
import { UpworkSns } from "../../core.business/upwork/upwork.sns";
export class ExpressServer {
	constructor(app: express.Application, private manager: SnsManager) {
		app.post("/linkedln/start", this.onLinkedLnStart);
		app.post("/upwork/start", this.onUpWorkStart);
		app.post("/test", this.onTest);
	}

	onLinkedLnStart = (req: express.Request, res: express.Response) => {
		let session_id = "linkedln" + "_" + new Date().getTime();
		if (req.body?.session_id) {
			session_id = req.body?.session_id;
		}
		const sns = new LinkedlnSns(session_id);
		this.manager.createSns(sns);
		res.status(200).json({ session_id: session_id });
	};
	onUpWorkStart = (req: express.Request, res: express.Response) => {
		let session_id = "upwork" + "_" + new Date().getTime();
		if (req.body?.session_id) {
			session_id = req.body?.session_id;
		}
		const sns = new UpworkSns(session_id);
		this.manager.createSns(sns);
		res.status(200).json({ session_id: session_id });
	};
	onTest = (req: express.Request, res: express.Response) => {
		this.manager.sendDataHttpResponse();
		res.status(200).json({ status: "oke" });
	};
}
