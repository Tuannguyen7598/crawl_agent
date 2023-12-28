import { ISNS, ISNSListener } from "../../abtraction/adapter/ISNS";
import {BrowserWindow} from 'electron';
export class LinkedlnSns implements ISNS {
    listener: ISNSListener 
    sns: string 
    win: BrowserWindow 
    constructor(public session_id: string) { }
    async inItWebBrowser(): Promise<void> {
       this.win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                partition:'persist' + this.session_id
            }
        });
        await this.win.loadURL('https://linkedin.com/');
    }

    startCrawlData(): void {
        console.log('start crawl data');
        
        try {
            this.win.webContents.debugger.attach('1.3');
          } catch (err) { 
           console.log('debugger attach failed: ', err);
          } 
          
          this.win.webContents.debugger.on('detach', (event, reason) => { 
            console.log('debugger detached due to: ', reason);
          });
          
          this.win.webContents.debugger.on('message', (event, method, params) => {
            if (method === 'network.responsereceived') { 
              console.log(params.response.url); 
              this.win.webContents.debugger.sendCommand('network.getresponsebody', { requestid: params.requestid }).then(function(response) {
                console.log(response);
              });
            }
          });
          
          this.win.webContents.debugger.sendCommand('network.enable')
        return
    }

    stopCrawlData(): void {
        
    }


    addScript(): Promise<any> {
        return
    }
}