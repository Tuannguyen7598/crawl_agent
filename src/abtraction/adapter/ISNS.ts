import {
	DataDOM,
	DataFromHttpResponse,
	ResponseAgent,
} from "../../infastructure/client/proto";

export interface ISNSListener {
	onSendDataHttpResponse(payload: DataFromHttpResponse): Promise<ResponseAgent>;
	onSendDataDOMHtml(payload: DataDOM): Promise<ResponseAgent>;
}

export interface ISNS {
	listener: ISNSListener | undefined;
	session_id: string;

	inItWebBrowser(): Promise<void>;
	startCrawlData(): void;
	actionClick(payload: any): Promise<boolean>;
	actionInput(payload: any): Promise<boolean>;
}
