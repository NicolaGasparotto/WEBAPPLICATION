"use strict";

const PORT = 3000;

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const dao = require("./dao"); // module for accessing the DB
const userDao = require('./daoUser'); // module for accessing the user table in the DB
const fs = require("fs");

const passport = require('passport');                              // authentication middleware
const LocalStrategy = require('passport-local');                   // authentication strategy (username and password)


// init express
const app = express();
app.use(morgan("dev"));
app.use(express.json());


/** Set up and enabling Cross-Origin Resurce Sharing */
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

/** Delay MiddleWare */
/*
const delay = require('express-delay');
app.use(delay(200,2500));
*/

// to send static files (images in this case)
app.use("/static", express.static("public"));


/*** Passport ***/
passport.use(new LocalStrategy((username, password, callback) => {
  userDao.getUser(username, password).then((user) => {
      if(!user)
        return callback(null, false, 'Incorrect username or password');  
      
      return callback(null, user); // NOTE: user info in the session (all fields returned by userDao.getUser, i.e, id, username, name)
    }).catch((err) => { return callback(err); });
}));

// Serializing in the session the user object given from LocalStrategy(verify).
passport.serializeUser(function (user, callback) {
  callback(null, user);
});

// Starting from the data in the session, we extract the current (logged-in) user.
passport.deserializeUser(function (user, callback) {
  return callback(null, user); // this will be available in req.user
});

/** Creating the session */
const session = require('express-session');

app.use(session({
  secret: "the session key it's a secret!!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.authenticate('session'));


/** Defining authentication verification middleware **/
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}


/*** Utility Functions ***/


/*** Users APIs ***/
// This route is used for performing login.
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => { 
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json({ error: info});
      }
      // success, perform the login and extablish a login session
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser() in LocalStratecy Verify Fn
        return res.json(req.user);
      });
  })(req, res, next);
});

// GET /api/sessions/current
// This route checks whether the user is logged in or not.
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.json({error: 'Not authenticated'});
  // removed .status(401) so in the console is not visualized  
});

// DELETE /api/session/current
// This route is used for logout the current user.
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.status(200).json({});
  });
});


/*** APIs ***/
// GET all page web
app.get("/api/pages", (req, res) => {
  dao
    .getPagesList()
    .then((pages) => res.json(pages))
    .catch((error) => res.status(500).send(error));
});

// 
app.get("/api/pages/:pageId", (req, res) => {
  dao
  .getPageById(req.params.pageId)
  .then((page) => res.json(page))
  .catch((error) => res.send(500).send(error));
});

// GET content list based on pageId
app.get("/api/contents/:pageId", (req, res) => {
  const pageId = req.params.pageId;
  dao
    .getPageContents(pageId)
    .then((contents) => res.json(contents))
    .catch((error) => res.status(500).send(error));
});

// GET blogname
app.get("/api/blogname", (req, res) => {
  dao
    .getBlogName()
    .then((name) => res.json(name))
    .catch((error) => res.status(500).send(error));
});


app.use(isLoggedIn);

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

// checking validity of the author name
app.post("/api/checkauthor", (req, res) => {
  dao
    .checkAuthor(req.body.author)
    .then((value) => res.json(value))
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
