import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo } from "nodemailer";
import { IServerInfo } from "./ServerInfo";

export class Worker {
    private static serverInfo: IServerInfo

    constructor(inServerInfo: IServerInfo) {
        Worker.serverInfo = inServerInfo
    }
// with Promise<string>, we’re essentially saying to TypeScript: “this function returns a Promise, but it promises to return a string eventually so make sure the variable that the returned value goes into is that type"
//Promise<string> is a generic, should you want to look into it further
    public sendMessage(inOptions: SendMailOptions): Promise<string> {

        console.log("SMTP.Worker.sendMessage()", inOptions);
    
        return new Promise((inResolve, inReject) => {
          const transport: Mail = nodemailer.createTransport(Worker.serverInfo.smtp);
          transport.sendMail(
            inOptions,
            (inError: Error | null, inInfo: SentMessageInfo) => {
              if (inError) {
                console.log("SMTP.Worker.sendMessage(): Error", inError);
                inReject(inError);
              } else {
                console.log("SMTP.Worker.sendMessage(): Ok", inInfo);
                inResolve();
              }
            }
          );
        });
}

}