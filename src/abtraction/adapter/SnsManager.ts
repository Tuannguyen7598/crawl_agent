import { IClient } from "./IClient";
import { ISNS, ISNSListener } from "./ISNS";
import { SnsWrapper } from "./SnsWrapper";

export class SnsManager {
    listener: ISNSListener
    list_wrapper: Map<string, SnsWrapper> = new Map()
    constructor(private client: IClient) {

    }


    async createSns(sns: ISNS) {
        const wrapper = new SnsWrapper(sns, this.client)
        await wrapper.initBrowser()
        this.list_wrapper.set(wrapper.sesison_id, wrapper)
        wrapper.startCrawl()
    }



    async startCrawlAll() {
        for (const value of this.list_wrapper.values()) {
            value.startCrawl()
        }
    }

    async stopCrawlAll() {
        for (const value of this.list_wrapper.values()) {
            value.stopCrawl()
        }

    }



}