import puppeteer, { Page } from "puppeteer";
import { ISNS, ISNSListener } from "../../abtraction/adapter/ISNS";
import { BrowserWindow } from "electron";
import { DataDOM } from "../../infastructure/client/proto";
export class PuppeteerSns implements ISNS {
	listener: ISNSListener;
	sns: string = "puppeteer";
	win: Page;
	constructor(public session_id: string) {}
	async inItWebBrowser(url: string): Promise<void> {
		let browser = await puppeteer.launch({ headless: false });
		this.win = await browser.newPage();
		await this.win.goto(url);
		await this.win.setViewport({ width: 1000, height: 800 });
	}

	startCrawlData(): void {
		this.win.on("response", async (response) => {
			try {
				const body = await response.json();
				const url = response.url();

				this.listener.onSendDataHttpResponse({
					sns: this.sns,
					url: url,
					body: JSON.stringify(body),
					timestamp: new Date().getTime().toString(),
				});
			} catch (error) {}
		});
	}

	async actionClick(payload: any): Promise<boolean> {
		throw new Error("Not implemented yet");
	}

	async actionInput(payload: any): Promise<boolean> {
		throw new Error("Not implemented yet");
	}

	protected onSendDataFromDomHTML(payload: DataDOM): void {
		this.listener.onSendDataDOMHtml(payload);
	}
}
