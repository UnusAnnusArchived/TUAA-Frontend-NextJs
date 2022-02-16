import mysql from "mysql";
import config from "./config.json";

export const db = mysql.createPool(config.mysql);

export function promiseQuery(query: string): Promise<any> ***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    db.query(query, (err, rows) => ***REMOVED***
      if (err) ***REMOVED***
        return reject(err);
  ***REMOVED***

      resolve(rows);
***REMOVED***);
***REMOVED***);
***REMOVED***
