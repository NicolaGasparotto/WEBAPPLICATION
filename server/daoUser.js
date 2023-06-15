"use strict";

/* Data Access Object (DAO) module for accessing users data */
const sqlite = require("sqlite3");
const crypto = require("crypto");

// open the database
const db = new sqlite.Database("blog.sqlite", (err) => {
  if (err) throw err;
});

// This function is used at log-in time to verify username and password.
function getUser(username, password) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE username=?";
    db.get(sql, [username], (err, row) => {
      if (err) {
        // database error
        reject(err);
      } else if (row === undefined) {
        // non-existent user
        resolve(false);
      } else {
        // from the user fields, some are discarded (e.g. salt, password)
        const { hash: hashTmp, salt: saltTmp, ...user } = row;

        crypto.scrypt(password, row.salt, 32, (err, computed_hash) => {
          if (err)
            // key derivation fails
            reject(err);
          if (crypto.timingSafeEqual(computed_hash, Buffer.from(row.hash, "hex"))) {
            // password ok
            resolve(user);
          } else {
            // password doesn't match
            resolve(false);
          }
        });
      }
    });
  });
}

exports.getUser = getUser;
