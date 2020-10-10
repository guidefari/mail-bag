const path = require("path")
const fs = require("fs")

export interface IServerInfo {
    smtp : {
        host: string, port: number,
        auth: {user: string, pass: string}
    },
    imap : {
        host: string, port: number,
        auth: { user: string, pass: string }
    }
}

export let serverInfo: IServerInfo

//reading serverinfo json file
const rawInfo: string = fs.readFileSync(path.join(__dirname, "../serverInfo.json"));
serverInfo = JSON.parse(rawInfo);
console.log("ServerInfo: ", serverInfo);