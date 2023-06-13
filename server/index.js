"use strict";

const PORT = 3000;

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const dao = require("./dao"); // module for accessing the DB
const fs = require("fs");

function delay(req, res, next) {
  setTimeout(() => {
    next();
  }, 1500);
}

// init express
const app = express();

app.use(morgan("dev"));
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//app.use(delay); // to test loading. REMOVE IT!

// to send static files (images in this case)
app.use("/static", express.static("public"));

/*** APIs ***/
// GET all page web
app.get("/api/pages", (req, res) => {
  dao
    .getPagesList()
    .then((pages) => res.json(pages))
    .catch((error) => res.status(500).send(error));
});

// GET content list based on pageId
app.get("/api/contents/:pageId", (req, res) => {
  const pageId = req.params.pageId;
  dao
    .getPageContents(pageId)
    .then((contents) => res.json(contents))
    .catch((error) => res.status(500).send(error));
});

// DELETE page and its contents based on pageId
app.delete("/api/pages/:pageId", (req, res) => {
  const pageId = req.params.pageId;
  dao
    .deletePage(pageId)
    .then((value) => res.json(value))
    .catch((error) => res.status(500).send(error));
});

// PUT update page and its contents based on pageId
app.put("/api/pages/:pageId", (req, res) => {
  const pageId = req.params.pageId;
  const { lContents: contents, ...page } = req.body;
  
  dao
    .updatePageContents(pageId, page, contents)
    .then((contents) => res.json(contents))
    .catch((error) => res.status(500).send(error));
});

app.post("/api/pages", (req, res) => {
  const { lContents: contents, ...page } = req.body;

  dao
    .addNewPage(page, contents)
    .then((values) => res.json(values))
    .catch((error) => res.status(500).send(error));
});

// GET all the images available
app.get("/api/images", (req, res) => {
  const imageDirectory = "public/images"; // Directory delle immagini sul server
  
  fs.readdir(imageDirectory, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      const imageNames = files.filter((file) => file.endsWith(".png") || file.endsWith(".jpg"));
      res.json(imageNames);
    }
  });
});


// GET blogname
app.get("/api/blogname", (req, res) => {
  dao
    .getBlogName()
    .then((name) => res.json(name))
    .catch((error) => res.status(500).send(error));
});

// PUT blogname
app.put("/api/blogname", (req, res) => {
  const newName = req.body.name;
  dao
    .updateBlogName(newName)
    .then(() => res.sendStatus(200))
    .catch((error) => res.status(500).send(error));
});

/** SERVER ACTIVATION: */
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
});
