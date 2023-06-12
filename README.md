[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/_XpznRuT)
# Exam #1: "CMSmall"

## Student: s319834 GASPAROTTO NICOLA 

# Server side

## API Server

- POST `/api/login`
  - request parameters and request body content
  - response body content


- GET `/api/pages`
  - request parameters: none
  - response body content: a list of all the pages in the database
- POST `/api/pages`
  - request body content: the page just created 


- GET `/api/pages/:pageId`
  - request parameters: none
  - response body content: a list of all the pages in the database
- PUT `/api/pages/:pageId`
  - request body content: the page just created 



## Database Tables

- Table `users` - contains all the user Information: `userId, name (must be an Unique value not already present in the table), username, password, salt, admin`
- Table `pages` - contains all the infromation about the page: `idPage, title, author, creationDate, publicationDate`
- Table `contens` - contains all the content of the page: `idContent, idPage, type, content ( text or imageNamePath )`


# Client side


## React Client Application Routes

- Route `/`: main page with a navbar and a list of pages and it will be displayed in frontOffice view by Default.

             logged user will have another button to switch to the Backoffice view or back to FrontOffice view.
             ( this means that there is no need to have the different pages for the two views that share already a lot of components )

- Route `/pages/:pageId`: page with the content of the page and it will be displayed in frontOffice view 
- Route `/newPage`: page with a form to create a new page and it will be displayed in backOffice view
- Route `/pages/:pageId/edit`: page with a form to edit a page and it will be displayed in backOffice view 

- Route `/login`: page with a form to login
- Route `/*`: everything else that is not one of the previous valid routes will be redirected to a page not found page
## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

# Usage info

## Example Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)
