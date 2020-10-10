const ImapClient = require("emailjs-imap-client");
import { ParsedMail } from "mailparser";
import { simpleParser } from "mailparser";
import { IServerInfo } from "./ServerInfo";

//this interface is used to describe a mailbox, & optionally a specific message ,to be supplied to various methods
export interface ICallOptions {
    mailbox: string,
    id?: number
}

//this one describes a received message. note that body is optional, remember it's not sent when listing messages😁
export interface IMessage {
    id: string,
    date: string,
    from: string,
    subject: string,
    body?: string
}

//describes a mailbox
export interface IMailbox {
    name: string,
    path:string
}

// Disable certificate validation (less secure, but needed for some servers).
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export class Worker {
    private static serverInfo: IServerInfo
    constructor(inServerInfo: IServerInfo){
        Worker.serverInfo = inServerInfo
    }

    // Connect to the SMTP server and return a client object for operations to use.
    private async connectToServer(): Promise<any> {
        const client:any = new ImapClient.default(
            Worker.serverInfo.imap.host,
            Worker.serverInfo.imap.port,
            {auth: Worker.serverInfo.imap.auth}
        )
        client.logLevel = client.LOG_LEVEL_NONE
        client.onerror = (inError: Error) => {
            console.log("IMAP.Worker.listMailboxes(): Connection error", inError);
        }
        await client.connect();
        return client;
    }
}