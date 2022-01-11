import nodemailer from "nodemailer";
import fs from "fs";
import config from "./config.json";

export const mailer = nodemailer.createTransport(config.smtp);

export var noReplyEmail = "noreply@unusannusarchive.tk";

export var emails:Emails = {};

const dir = fs.readdirSync("emails");
for (let i = 0; i < dir.length; i++) {
  emails[dir[i]] = {
    subject: fs.readFileSync(`emails/${dir[i]}/subject.txt`, "utf-8"),
    text: fs.readFileSync(`emails/${dir[i]}/index.txt`, "utf-8"),
    html: fs.readFileSync(`emails/${dir[i]}/index.html`, "utf-8")
  };
}

export interface Email {
  subject: string;
  text: string;
  html: string;
}

export interface Emails {
  [key: string]: Email;
}

export default function sendEmail(type:string, to:string, replaceFunction:(string:string, isHTML:boolean) => string = (string:string) => { return string; }):Promise<nodemailer.SentMessageInfo> {
  return new Promise((resolve, reject) => {
    if (emails[type]) {
      const email:Email = emails[type];
      mailer.sendMail({
        from: noReplyEmail,
        to,
        subject: replaceFunction(email.subject, false),
        text: replaceFunction(email.text, false),
        html: replaceFunction(email.html, true)
      }).then((value) => {
        resolve(value);
      }).catch((reason) => {
        reject(reason);
      });
    } else {
      reject(new Error("Email type does not exist!"));
    }
  });
}
