

export interface ISNSListener {
    onSendData(): void;
}

export interface ISNS {
    listener: ISNSListener | undefined;
    session_id: string ;

    inItWebBrowser():Promise<void>
    startCrawlData():void
    stopCrawlData():void
    addScript():Promise<any>
}
