'use strict';

/* Data Access Object (DAO) module for accessing users data */
const sqlite = require("sqlite3");

// open the database
const db = new sqlite.Database("blog.sqlite", (err) => {
  if (err) throw err;
});

const crypto = require('crypto');

// This function is used at log-in time to verify username and password.
function getUser(username, password) {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE username=?';
      db.get(sql, [username], (err, row) => {
          if (err) { // database error
              reject(err);
          } else {
              if (!row) { // non-existent user
                  reject('Invalid username or password');
              } else {
                  crypto.scrypt(password, row.salt, 32, (err, computed_hash) => {
                      if (err) { // key derivation fails
                          reject(err);
                      } else {
                          const equal = crypto.timingSafeEqual(computed_hash, Buffer.from(row.hash, 'hex'));
                          if (equal) { // password ok
                              resolve(row);
                          } else { // password doesn't match
                              reject('Invalid username or password');
                          }
                      }
                  });
              }
          }
      });
  });
}

exports.getUser = getUser;