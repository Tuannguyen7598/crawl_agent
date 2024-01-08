import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { ActionDOM, ResponseAgent } from "../../infastructure/client/proto";
import { IClient } from "./IClient";
import { ISNS, ISNSListener } from "./ISNS";
import { SnsWrapper } from "./SnsWrapper";

export class SnsManager {
	list_wrapper: Map<string, SnsWrapper> = new Map();
	constructor(private client: IClient) {}

	async createSns(sns: ISNS) {
		const wrapper = new SnsWrapper(sns, this.client);
		await wrapper.initBrowser();
		this.list_wrapper.set(wrapper.sesison_id, wrapper);
		wrapper.startCrawl();
	}

	async startCrawlAll() {
		for (const value of this.list_wrapper.values()) {
			value.startCrawl();
		}
	}

	findSns(sesison_id: string): SnsWrapper {
		const sns = this.list_wrapper.get(sesison_id);
		if (!sns) {
			throw new Error("SNS not found");
		}
		return sns;
	}

	async sendDataHttpResponse() {
		this.client.sendDataHttpResponse({
			body: "123",
			sns: "kjk",
			timestamp: "ghh",
			url: "ssd",
		});
	}

	async sendActionDOM(
		payload: ServerUnaryCall<ActionDOM, ResponseAgent>,
		callback: sendUnaryData<ResponseAgent>
	) {
		const sns = this.findSns(payload.request.sessionId);
		const result = await sns.sendActionDom(
			payload.request.actionType,
			payload.request.payload
		);
		if (result) {
			callback(null, { message: "SUCCESS", status: true });
		}
		callback(null, { message: "ERROR", status: false });
	}
}
