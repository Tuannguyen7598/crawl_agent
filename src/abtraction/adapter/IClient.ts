import {
	DataDOM,
	DataFromHttpResponse,
	ResponseAgent,
} from "../../infastructure/client/proto";

export interface IClient {
	sendDataHttpResponse(payload: DataFromHttpResponse): Promise<ResponseAgent>;
	sendDataDomHtlm(payload: DataDOM): Promise<ResponseAgent>;
}
