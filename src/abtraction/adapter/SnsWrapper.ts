import {
	DataDOM,
	DataFromHttpResponse,
	ResponseAgent,
} from "../../infastructure/client/proto";
import { IClient } from "./IClient";
import { ISNS, ISNSListener } from "./ISNS";
export class SnsWrapper implements ISNSListener {
	sesison_id: string;
	constructor(private sns: ISNS, private client: IClient) {
		this.sns.listener = this;
		this.sesison_id = sns.session_id;
	}
	async onSendDataHttpResponse(
		payload: DataFromHttpResponse
	): Promise<ResponseAgent> {
		return await this.client.sendDataHttpResponse(payload);
	}

	async onSendDataDOMHtml(payload: DataDOM): Promise<ResponseAgent> {
		return await this.client.sendDataDomHtlm(payload);
	}

	async initBrowser() {
		return await this.sns.inItWebBrowser();
	}

	startCrawl() {
		this.sns.startCrawlData();
	}

	sendActionDom(type: string, payload: any): Promise<boolean> {
		switch (type) {
			case "click":
				return this.sns.actionClick(payload);

			case "input":
				return this.sns.actionInput(payload);
		}
	}
}
