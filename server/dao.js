"use strict";

const sqlite = require("sqlite3");

// open the database
const db = new sqlite.Database("blog.sqlite", (err) => {
  if (err) throw err;
});

// Funzioni per la tabella "pages"
exports.getPagesList = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM pages";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

exports.getPageById = (pageId) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.get("SELECT * FROM pages WHERE idPage = ?", [pageId], (error, row) => {
        if (error) {
          reject(error);
        } else if(row === undefined){
          resolve(false);
        } else {
          resolve(row);
        }
      });
    });
  });
}

exports.getPageContents = (pageId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM contents WHERE idPage = ?";
    db.all(sql, [pageId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

exports.deletePage = (pageId) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("DELETE FROM pages WHERE idPage = ?", [pageId], function (err) {
        if (err) {
          reject(err);
          return;
        }
        db.run(
          "DELETE FROM contents WHERE idPage = ?",
          [pageId],
          function (err) {
            if (err) {
              reject(err);
              return;
            }
            resolve(this.changes);
          }
        );
      });
    });
  });
};

exports.addNewPage = (page, lContents) => {

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        "INSERT INTO pages (title, author, publicationDate, creationDate) VALUES (?, ?, ?, ?)",
        [page.title, page.author, page.publicationDate, page.creationDate],
        function (err) {
          if (err) {
            reject(err.message);
          } else {
            const idPage = this.lastID; 
            const stmt = db.prepare(
              "INSERT INTO contents (idContent, idPage, type, content) VALUES (?, ?, ?, ?)"
            );
            lContents.forEach((content) => {
              stmt.run(content.idContent, idPage, content.type, content.content);
            });
            stmt.finalize();
            resolve(idPage, this.changes);
          }
        }
      );
    });
  });
};

exports.updatePageContents = (pageId, page, lContents) => {

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("DELETE FROM contents WHERE idPage = ?", [pageId], function (err) {
        if (err) {
          reject(err);
          return;
        }
        const stmt = db.prepare(
          "INSERT INTO contents (idContent, idPage, type, content) VALUES (?, ?, ?, ?)"
        );
        lContents.forEach((content) => {
          stmt.run(content.idContent, pageId, content.type, content.content);
        });
        stmt.finalize();
        db.run(
          "UPDATE pages SET title = ?, author = ?, publicationDate = ? WHERE idPage = ?",
          [page.title, page.author, page.publicationDate, pageId],
          function (err) {
            if (err) {
              reject(err);
              return;
            }
            resolve(this.changes);
          }
        );
      });
    });
  });
};

// GET blogname
exports.getBlogName = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.get("SELECT name FROM blogname", (error, row) => {
        if (error) {
          reject(error);
        } else {
          resolve(row.name);
        }
      });
    });
  });
};

// PUT blogname
exports.updateBlogName = (newName) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("UPDATE blogname SET name = ?", [newName], function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });
};
