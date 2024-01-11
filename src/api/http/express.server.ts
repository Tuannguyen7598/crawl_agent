import express from "express";
import { SnsManager } from "../../abtraction/adapter/SnsManager";
import { PuppeteerSns } from "../../core.business/puppeteer";
import { ElectronSns } from "../../core.business/electron";

export class ExpressServer {
	constructor(app: express.Application, private manager: SnsManager) {
		app.post("/puppeteer/start", this.onPuppeteerStart);
		app.post("/electron/start", this.onElectronStart);
	}

	onPuppeteerStart = (req: express.Request, res: express.Response) => {
		let session_id = "puppeteer" + "_" + new Date().getTime();
		if (req.body?.session_id) {
			session_id = req.body?.session_id;
		}
		const sns = new PuppeteerSns(session_id);
		this.manager.createSns(sns, req.body.url);
		res.status(200).json({ session_id: session_id });
	};
	onElectronStart = (req: express.Request, res: express.Response) => {
		let session_id = "electron" + "_" + new Date().getTime();
		if (req.body?.session_id) {
			session_id = req.body?.session_id;
		}
		const sns = new ElectronSns(session_id);
		this.manager.createSns(sns, req.body.url);
		res.status(200).json({ session_id: session_id });
	};
}
