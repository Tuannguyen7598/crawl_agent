import {
	Server,
	ServerUnaryCall,
	UntypedHandleCall,
	handleUnaryCall,
	sendUnaryData,
} from "@grpc/grpc-js";
import { SnsManager } from "../../abtraction/adapter/SnsManager";
import {
	ActionDOM,
	AgentService,
	ResponseAgent,
} from "../../infastructure/client/proto";

export class GRPCServer {
	constructor(private server: Server, private manager: SnsManager) {
		this.onListend();
	}

	protected onListend() {
		this.server.addService(AgentService, {
			sendActionDom: (
				data: ServerUnaryCall<ActionDOM, ResponseAgent>,
				callback: sendUnaryData<ResponseAgent>
			) => {
				this.manager.sendActionDOM(data, callback);
			},
		});
	}
}
