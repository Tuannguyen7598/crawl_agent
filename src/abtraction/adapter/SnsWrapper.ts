import {
	DataDOM,
	DataFromHttpResponse,
	ResponseAgent,
} from "../../infastructure/client/proto";
import { IClient } from "./IClient";
import { ActionDom, ISNS, ISNSListener } from "./ISNS";
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

	onSendActionDom(type: string, payload: any): Promise<boolean> {
		switch (type) {
			case "click":
				return this.sns.actionClick(payload);

			case "input":
				return this.sns.actionInput(payload);
		}
	}

	async initBrowser(url: string) {
		return await this.sns.inItWebBrowser(url);
	}

	startCrawl() {
		this.sns.startCrawlData();
	}

	addActionToDom(element: string, action: ActionDom) {
		return this.sns.addActionToDom(element, action);
	}
}
