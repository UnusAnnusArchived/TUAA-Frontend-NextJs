import mysql from "mysql";
import config from "./config.json";

export const db = mysql.createPool(config.mysql);

export function promiseQuery(query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query(query, (err, rows) => {
      if (err) {
        return reject(err);
      }

      resolve(rows);
    });
  });
}
