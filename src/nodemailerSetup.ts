import nodemailer from "nodemailer";
import fs from "fs";
import config from "./config.json";

export const mailer = nodemailer.createTransport(config.smtp);

export var noReplyEmail = "noreply@unusannusarchive.tk";

export var emails: Emails = ***REMOVED******REMOVED***;

let dir: string[] = [];
if (fs.existsSync("emails")) ***REMOVED***
  dir = fs.readdirSync("emails");
***REMOVED***
for (let i = 0; i < dir.length; i++) ***REMOVED***
  emails[dir[i]] = ***REMOVED***
    subject: fs.readFileSync(`emails/$***REMOVED***dir[i]***REMOVED***/subject.txt`, "utf-8"),
    text: fs.readFileSync(`emails/$***REMOVED***dir[i]***REMOVED***/index.txt`, "utf-8"),
    html: fs.readFileSync(`emails/$***REMOVED***dir[i]***REMOVED***/index.html`, "utf-8"),
***REMOVED***;
***REMOVED***

export interface Email ***REMOVED***
  subject: string;
  text: string;
  html: string;
***REMOVED***

export interface Emails ***REMOVED***
  [key: string]: Email;
***REMOVED***

export default function sendEmail(
  type: string,
  to: string,
  replaceFunction: (string: string, isHTML: boolean) => string = (string: string) => ***REMOVED***
    return string;
***REMOVED***
): Promise<nodemailer.SentMessageInfo> ***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    if (emails[type]) ***REMOVED***
      const email: Email = emails[type];
      mailer
        .sendMail(***REMOVED***
          from: noReplyEmail,
          to,
          subject: replaceFunction(email.subject, false),
          text: replaceFunction(email.text, false),
          html: replaceFunction(email.html, true),
    ***REMOVED***)
        .then((value) => ***REMOVED***
          resolve(value);
    ***REMOVED***)
        .catch((reason) => ***REMOVED***
          reject(reason);
    ***REMOVED***);
***REMOVED*** else ***REMOVED***
      reject(new Error("Email type does not exist!"));
***REMOVED***
***REMOVED***);
***REMOVED***
