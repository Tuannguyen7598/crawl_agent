import { ISNS, ISNSListener } from "../../abtraction/adapter/ISNS";
import { BrowserWindow } from "electron";
export class UpworkSns implements ISNS {
	listener: ISNSListener;
	sns: string;
	win: BrowserWindow;

	constructor(public session_id: string) {}
	async inItWebBrowser(): Promise<void> {
		try {
			this.win = new BrowserWindow({
				width: 800,
				height: 600,
				webPreferences: {
					nodeIntegration: true,
					partition: this.session_id,
				},
			});
			await this.win.loadURL("https://www.upwork.com/");
		} catch (error) {
			console.log(error);
		}
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
						.then(function (response) {
							const dataCrawl = JSON.parse(response.body);
						});
				}
			});

			this.win?.webContents.debugger.sendCommand("Network.enable");
		} catch (err) {
			console.log("Debugger attach failed: ", err);
		}
	}
	stopCrawlData(): void {}

	addScript(): Promise<any> {
		return;
	}
}
