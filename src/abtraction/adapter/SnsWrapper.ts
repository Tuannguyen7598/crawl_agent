
import { IClient } from "./IClient";
import { ISNS, ISNSListener } from "./ISNS";
export class SnsWrapper implements ISNSListener {
    sesison_id:string
    constructor(private sns: ISNS, private client: IClient) {
       this.sesison_id = sns.session_id
    }
    onSendData(): void {
        this.client.sendData()
    }


    async initBrowser(){
       return await this.sns.inItWebBrowser()
    }

    startCrawl(){
        this.sns.startCrawlData()
    }

    stopCrawl(){
      return  this.sns.stopCrawlData()
    }


    addScript(){
        this.sns.addScript()
    }
    
}
