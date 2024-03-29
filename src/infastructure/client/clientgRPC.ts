import { credentials } from "@grpc/grpc-js";
import { IClient } from "../../abtraction/adapter/IClient";
import {
	AgentClient,
	DataDOM,
	DataFromHttpResponse,
	ResponseAgent,
} from "./proto";

export class ClientgRPC implements IClient {
	client: AgentClient;
	constructor() {
		this.client = new AgentClient(
			"127.0.0.1:50052",
			credentials.createInsecure()
		);
	}
	sendDataHttpResponse(payload: DataFromHttpResponse): Promise<ResponseAgent> {
		return new Promise((resolve, reject) => {
			this.client.sendDataHttp(payload, (error, response) => {
				if (error) {
					reject(error);
				} else {
					resolve(response);
				}
			});
		});
	}

	sendDataDomHtlm(payload: DataDOM): Promise<ResponseAgent> {
		console.log("payload", payload);

		return new Promise((resolve, reject) => {
			this.client.sendDataDom(payload, (error, response) => {
				if (error) {
					reject(error);
				} else {
					resolve(response);
				}
			});
		});
	}
}
