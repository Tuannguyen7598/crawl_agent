import { ActionDom, ISNS, ISNSListener } from "../../abtraction/adapter/ISNS";
import { app, BrowserWindow, ipcMain } from "electron";
import {
	DataDOM,
	DataFromHttpResponse,
} from "../../infastructure/client/proto";
import path from "path";

export class ElectronSns implements ISNS {
	listener: ISNSListener;
	sns: string = "electron";
	win: BrowserWindow;

	constructor(public session_id: string) {
		ipcMain.on("dom_click", (event, payload) => {
			payload["type"] = "click";
			payload["sns"] = "Electron";
			console.log(payload);

			// this.onSendDataFromDomHTML(payload);
		});
		ipcMain.on("dom_input", (event, payload) => {
			payload["type"] = "input";
			payload["sns"] = "Electron";
			// this.onSendDataFromDomHTML(payload);
		});
	}
	async inItWebBrowser(url: string): Promise<void> {
		try {
			const preload = path.join(__dirname, "../preload/listen_event_dom.js");
			this.win = new BrowserWindow({
				width: 1400,
				height: 1200,
				webPreferences: {
					nodeIntegration: true,
					partition: this.session_id,
					preload: preload,
				},
			});
			this.win.on("closed", () => {
				this.win = null;
			});
			await this.win.loadURL(url);
		} catch (error) {
			console.log(error);
		}
	}

	protected async onSendDataHttpResponse(
		payload: DataFromHttpResponse
	): Promise<any> {
		return await this.listener.onSendDataHttpResponse(payload);
	}

	protected onSendDataFromDomHTML(payload: DataDOM): void {
		this.listener.onSendDataDOMHtml(payload);
	}

	async actionClick(payload: any): Promise<boolean> {
		this.win.webContents.send("action_click", payload);
		return true;
	}

	async actionInput(payload: any): Promise<boolean> {
		this.win.webContents.send("action_input", payload);

		return true;
	}

	startCrawlData(): void {
		try {
			this.win?.webContents.debugger.attach("1.3");
			this.win?.webContents.debugger.on("detach", (event, reason) => {
				console.log("Debugger detached due to: ", reason);
			});
			this.win?.webContents.debugger.on("message", (event, method, params) => {
				// console.log('param',params);
				// console.log('methor',method);
				// console.log('event',event);

				if (method === "Network.responseReceived") {
					this.win?.webContents.debugger
						.sendCommand("Network.getResponseBody", {
							requestId: params.requestId,
						})
						.then(async (response) => {
							const dataCrawl = JSON.parse(response.body);
							const res = await this.onSendDataHttpResponse({
								body: JSON.stringify(dataCrawl),
								sns: this.sns,
								timestamp: new Date().toISOString(),
								url: params.response.url,
							});
							console.log("response", res);
						})
						.catch(() => {});
				}
			});
			this.win?.webContents.debugger.sendCommand("Network.enable");
		} catch (err) {
			console.log("Debugger attach failed: ", err);
		}
	}

	addActionToDom(element: string, action: ActionDom): Promise<any> {
		ipcMain.emit(action, element);
		return;
	}
}
