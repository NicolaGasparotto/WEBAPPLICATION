-- SQLite
/*
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS contents;
DROP TABLE IF EXISTS pages;
*/

/*
CREATE TABLE users (
    userId INTEGER PRIMARY KEY,
    name TEXT,
    username TEXT,
    password TEXT,
    salt TEXT,
    admin INTEGER DEFAULT 0
);

CREATE TABLE pages (
    idPage INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT,
    creationDate DATE,
    publicationDate DATE DEFAULT NULL
);

CREATE TABLE contents (
    idContent INTEGER PRIMARY KEY,
    idPage INTEGER,
    type TEXT,
    content TEXT
);
*/

/*
INSERT INTO users (name, username, password, salt, admin) VALUES
    ('John Doe', 'johndoe', 'password1', 'salt1', 0),
    ('Jane Smith', 'janesmith', 'password2', 'salt2', 0),
    ('Mike Johnson', 'mikejohnson', 'password3', 'salt3', 1);

DELETE FROM contents;


INSERT INTO pages (title, author, creationDate, publicationDate) VALUES
    ('Page 1', (SELECT name FROM users WHERE name = 'John Doe'), '2023-06-01', '2023-06-02'),
    ('Page 2', (SELECT name FROM users WHERE name = 'John Doe'), '2023-06-03', '2023-06-04'),
    ('Page 3', (SELECT name FROM users WHERE name = 'Jane Smith'), '2023-06-05', NULL),
    ('Page 4', (SELECT name FROM users WHERE name = 'Jane Smith'), '2023-06-06', '2023-06-07'),
    ('Page 5', (SELECT name FROM users WHERE name = 'Mike Johnson'), '2023-06-08', '2023-06-09'),
    ('Page 6', (SELECT name FROM users WHERE name = 'Mike Johnson'), '2023-06-10', '2023-06-11');

--- PRAGMA table_info(pages);
*/


-- Popolamento per la pagina 1
INSERT INTO contents (idPage, idContent, type, content) VALUES
(1, 1, 'header', 'Header content for page 1'),
(1, 2, 'image', 'giraffe_01.png'),
(1, 3, 'paragraph', 'Content of the paragraph for page 1');

-- Popolamento per la pagina 2
INSERT INTO contents (idPage, idContent, type, content) VALUES
(2, 1, 'header', 'Header content for page 2'),
(2, 2, 'image', 'giraffe_02.png'),
(2, 3, 'paragraph', 'Content of the paragraph for page 2'),
(2, 4, 'paragraph', 'Additional content of the paragraph for page 2. This paragraph has more than double the words compared to the previous example.');

-- Popolamento per la pagina 3
INSERT INTO contents (idPage, idContent, type, content) VALUES
(3, 1, 'header', 'Header content for page 3'),
(3, 2, 'image', 'giraffe_03.png'),
(3, 3, 'paragraph', 'Content of the paragraph for page 3'),
(3, 4, 'paragraph', 'Additional content of the paragraph for page 3. This paragraph has more than double the words compared to the previous example.'),
(3, 5, 'paragraph', 'Another content of the paragraph for page 3');

-- Popolamento per la pagina 4
INSERT INTO contents (idPage, idContent, type, content) VALUES
(4, 1, 'header', 'Header content for page 4'),
(4, 2, 'image', 'giraffe_04.png'),
(4, 3, 'paragraph', 'Content of the paragraph for page 4'),
(4, 4, 'paragraph', 'Additional content of the paragraph for page 4. This paragraph has more than double the words compared to the previous example.'),
(4, 5, 'paragraph', 'Another content of the paragraph for page 4'),
(4, 6, 'paragraph', 'And another one for page 4. This paragraph also has more than double the words compared to the previous example.');

-- Popolamento per la pagina 5
INSERT INTO contents (idPage, idContent, type, content) VALUES
(5, 1, 'header', 'Header content for page 5'),
(5, 2, 'image', 'giraffe_01.png'),
(5, 3, 'paragraph', 'Content of the paragraph for page 5'),
(5, 4, 'paragraph', 'Additional content of the paragraph for page 5. This paragraph has more than double the words compared to the previous example.'),
(5, 5, 'paragraph', 'Another content of the paragraph for page 5'),
(5, 6, 'paragraph', 'And another one for page 5. This paragraph also has more than double the words compared to the previous example.'),
(5, 7, 'paragraph', 'Last content of the paragraph for page 5');

-- Popolamento per la pagina 6
INSERT INTO contents (idPage, idContent, type, content) VALUES
(6, 1, 'header', 'Header content for page 6'),
(6, 2, 'image', 'giraffe_02.png'),
(6, 3, 'paragraph', 'Content of the paragraph for page 6'),
(6, 4, 'paragraph', 'Additional content of the paragraph for page 6. This paragraph has more than double the words compared to the previous example.'),
(6, 5, 'paragraph', 'Another content of the paragraph for page 6'),
(6, 6, 'paragraph', 'And another one for page 6. This paragraph also has more than double the words compared to the previous example.'),
(6, 7, 'paragraph', 'Last content of the paragraph for page 6'),
(6, 8, 'paragraph', 'Penultimate content of the paragraph for page 6. This paragraph has more than double the words compared to the previous example.');


/*
CREATE TABLE blogname (
    id INTEGER PRIMARY KEY,
    name TEXT
);

INSERT INTO blogname (name) VALUES ('My Blog');
*/
