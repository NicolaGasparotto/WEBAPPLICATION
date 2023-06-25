-- SQLite
/*
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS contents;
DROP TABLE IF EXISTS pages;
*/

/*
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
*/

/*
-- Cancellazione dei dati dalla tabella "contents"
DELETE FROM contents;
DELETE FROM pages;

-- Popolamento della tabella "pages"
INSERT INTO pages (title, author, creationDate, publicationDate) VALUES
    ('The Graceful Giants: Exploring the World of Giraffes', 'John Doe', '2023-06-01', '2023-06-02'),
    ('Feeding Habits of Giraffes: Masters of Leafy Cuisine', 'John Doe', '2023-06-03', '2023-06-04'),
    ('Social Behavior of Giraffes: Towers of Togetherness', 'Jane Smith', '2023-06-05', NULL),
    ('Survivors of the Savannah: Giraffes in Arid Environments', 'Jane Smith', '2023-06-06', '2023-06-07'),
    ('The Remarkable Anatomy of Giraffes', 'Jane Smith', '2023-06-08', '2023-06-09'),
    ('Giraffes: Symbols of Elegance and Beauty', 'Jane Smith', '2023-06-10', '2023-06-11'),
    ('The Plight of Giraffes: Protecting an Endangered Species', 'Mike Johnson', '2023-06-12', NULL),
    ('Giraffes: Nature s Wonders in the African Wilderness', 'Mike Johnson', '2023-06-13', '2023-06-14');

-- Popolamento della tabella "contents"

-- Contenuti per la pagina 1
INSERT INTO contents (idPage, idContent, type, content) VALUES
    (1, 1, 'header', 'Introduction to Giraffes'),
    (1, 2, 'paragraph', 'Giraffes, with their long necks and towering presence, are majestic creatures that roam the African plains. They are known for their incredible height, making them the tallest animals on the planet.'),
    (1, 3, 'header', 'Distinctive Physical Features'),
    (1, 4, 'paragraph', 'One of the unique features of giraffes is their long neck, which allows them to reach high branches and leaves. Their elongated legs and powerful muscles enable them to move gracefully across the savannah, while their distinctive coat patterns provide camouflage in the wild.'),
    (1, 5, 'image', 'giraffe_01.png'),
    (1, 6, 'image', 'giraffe_03.png');

-- Contenuti per la pagina 2
INSERT INTO contents (idPage, idContent, type, content) VALUES
    (2, 1, 'header', 'Adaptations for High Vegetation'),
    (2, 2, 'paragraph', 'Giraffes have developed remarkable adaptations to feed on the leaves of tall trees. Their long necks and specialized tongues allow them to strip foliage from branches. Their diet primarily consists of leaves, twigs, and shoots, providing them with the necessary nutrients for survival.'),
    (2, 3, 'header', 'Feeding Techniques'),
    (2, 4, 'paragraph', 'To reach the highest leaves, giraffes use their elongated necks to extend upwards while standing on their hind legs. They delicately pluck the foliage with their prehensile tongues, which can measure up to 20 inches long.'),
    (2, 5, 'image', 'giraffe_02.png'),
    (2, 6, 'image', 'giraffe_05.png');

-- Contenuti per la pagina 3
INSERT INTO contents (idPage, idContent, type, content) VALUES
    (3, 1, 'header', 'Living in Towering Communities'),
    (3, 2, 'paragraph', 'Giraffes are social animals that form groups known as towers. These towers mainly consist of adult females and their young offspring. Male giraffes, on the other hand, tend to live in solitude or associate with other young males. Communication among giraffes involves body movements, visual signals, and vocalizations.'),
    (3, 3, 'header', 'Courtship and Mating'),
    (3, 4, 'paragraph', 'During the mating season, male giraffes engage in a unique behavior called necking. They use their long necks as weapons to compete for dominance and the right to mate with females. This ritualistic behavior involves swinging their necks at each other in powerful blows.'),
    (3, 5, 'image', 'giraffe_03.png'),
    (3, 6, 'image', 'giraffe_06.png');

-- Contenuti per la pagina 4
INSERT INTO contents (idPage, idContent, type, content) VALUES
    (4, 1, 'header', 'Adaptations to Arid Conditions'),
    (4, 2, 'paragraph', 'Giraffes are well adapted to survive in arid environments such as the savannah. They can endure long periods without water by obtaining moisture from the leaves they consume. These remarkable animals have developed physiological mechanisms to conserve water and regulate their body temperature efficiently.'),
    (4, 3, 'header', 'Water Requirements'),
    (4, 4, 'paragraph', 'Although giraffes can survive for weeks without drinking water, they will drink when available. They obtain most of their hydration from the moisture-rich leaves, but they can also utilize water sources such as rivers and waterholes when necessary.');

-- Contenuti per la pagina 5
INSERT INTO contents (idPage, idContent, type, content) VALUES
    (5, 1, 'header', 'The Extraordinary Neck'),
    (5, 2, 'paragraph', 'The most recognizable feature of giraffes is their long neck, composed of seven cervical vertebrae, just like humans. However, each of these vertebrae can measure up to 10 inches in length, allowing giraffes to reach foliage at considerable heights.'),
    (5, 3, 'header', 'Powerful Hearts and Circulatory System'),
    (5, 4, 'paragraph', 'To pump blood up their long necks against gravity, giraffes possess a robust cardiovascular system. Their hearts can weigh up to 25 pounds and pump approximately 60 liters of blood per minute, ensuring an adequate supply of oxygen and nutrients to all body parts.'),
    (5, 5, 'image', 'giraffe_05.png'),
    (5, 6, 'image', 'giraffe_07.png');

-- Contenuti per la pagina 6
INSERT INTO contents (idPage, idContent, type, content) VALUES
    (6, 1, 'header', 'Aesthetic Grace'),
    (6, 2, 'paragraph', 'Giraffes are often regarded as symbols of elegance and beauty. Their long, slender necks, expressive eyes, and gentle movements captivate observers worldwide. Their presence in the wild evokes a sense of awe and wonder.'),
    (6, 3, 'header', 'A Photographer s Delight'),
    (6, 4, 'paragraph', 'For wildlife enthusiasts and photographers, encountering giraffes in their natural habitat is a dream come true. These magnificent creatures provide stunning photographic opportunities, especially against the backdrop of the African savannah.'),
    (6, 5, 'image', 'giraffe_06.png'),
    (6, 6, 'image', 'giraffe_08.png');

-- Contenuti per la pagina 7
INSERT INTO contents (idPage, idContent, type, content) VALUES
    (7, 1, 'header', 'Threats to Giraffe Populations'),
    (7, 2, 'paragraph', 'Despite their grandeur, giraffes face significant threats to their survival. Habitat loss, poaching, and disease have contributed to the decline in their population numbers. Urgent conservation efforts are required to protect these iconic animals.'),
    (7, 3, 'header', 'Conservation Initiatives'),
    (7, 4, 'paragraph', 'Various organizations and wildlife conservation groups are actively working to safeguard giraffes and their habitats. These efforts involve promoting anti-poaching measures, creating protected areas, and raising awareness about the importance of giraffe conservation.'),
    (7, 5, 'image', 'giraffe_01.png'),
    (7, 6, 'image', 'giraffe_07.png');

-- Contenuti per la pagina 8
INSERT INTO contents (idPage, idContent, type, content) VALUES
    (8, 1, 'header', 'Nature s Masterpiece'),
    (8, 2, 'paragraph', 'In conclusion, giraffes are truly nature s wonders. Their unique physical attributes, captivating social behavior, and ability to thrive in challenging environments make them extraordinary creatures. Preserving their existence and safeguarding their habitats are crucial for ensuring that future generations can admire and appreciate these magnificent animals.'),
    (8, 3, 'header', 'The Splendor of Giraffe Patterns'),
    (8, 4, 'paragraph', 'Each giraffe s coat pattern is as unique as a human fingerprint. The distinct markings serve as effective camouflage in the wild, helping them blend with the surrounding vegetation and providing protection against predators.'),
    (8, 5, 'image', 'giraffe_02.png'),
    (8, 6, 'image', 'giraffe_08.png');
*/

/*
CREATE TABLE blogname (
    id INTEGER PRIMARY KEY,
    name TEXT
);

INSERT INTO blogname (name) VALUES ('My Blog');
*/
/*
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    hash TEXT,
    salt TEXT,
    name TEXT,
    backOfficeView INTEGER DEFAULT 0,
    admin INTEGER DEFAULT 0
);
*/

/* pwdjohn, pwdjane, pwdmike, pwdmarco */
/*
INSERT INTO users (username, hash, salt, name, backOfficeView, admin) VALUES
    ('johndoe@polito.it', 'eef0cf837e95b0f4a5d410dd53a7f0ef4043480ccd03ccdfa1dfe60c03d7c04a', 'cf5dcac259d783dd', 'John Doe', 0, 0),
    ( 'janesmith@polito.it', 'ed58a7900f5260c5d345335970f41c16456a4fef6eee8f691615226a543002e9', '62e812c857f1eab0', 'Jane Smith', 0, 0),
    ( 'mikejohnson@polito.it', '48523e29854c82c8298750424caed253e5842f45d41152390581ee44940bdef1', '1633d64620394d87', 'Mike Johnson', 0, 1);
*/
/*
-- Contenuti per la pagina 1
INSERT INTO contents (idPage, type, content) VALUES
    (1, 'header', 'Introduction to Giraffes'),
    (1, 'paragraph', 'Giraffes, with their long necks and towering presence, are majestic creatures that roam the African plains. They are known for their incredible height, making them the tallest animals on the planet.'),
    (1, 'header', 'Distinctive Physical Features'),
    (1, 'paragraph', 'One of the unique features of giraffes is their long neck, which allows them to reach high branches and leaves. Their elongated legs and powerful muscles enable them to move gracefully across the savannah, while their distinctive coat patterns provide camouflage in the wild.'),
    (1, 'image', 'giraffe_01.png'),
    (1, 'image', 'giraffe_03.png');

-- Contenuti per la pagina 2
INSERT INTO contents (idPage, type, content) VALUES
    (2, 'header', 'Adaptations for High Vegetation'),
    (2, 'paragraph', 'Giraffes have developed remarkable adaptations to feed on the leaves of tall trees. Their long necks and specialized tongues allow them to strip foliage from branches. Their diet primarily consists of leaves, twigs, and shoots, providing them with the necessary nutrients for survival.'),
    (2, 'header', 'Feeding Techniques'),
    (2, 'paragraph', 'To reach the highest leaves, giraffes use their elongated necks to extend upwards while standing on their hind legs. They delicately pluck the foliage with their prehensile tongues, which can measure up to 20 inches long.'),
    (2, 'image', 'giraffe_02.png'),
    (2, 'image', 'giraffe_05.png');

-- Contenuti per la pagina 3
INSERT INTO contents (idPage, type, content) VALUES
    (3, 'header', 'Living in Towering Communities'),
    (3, 'paragraph', 'Giraffes are social animals that form groups known as towers. These towers mainly consist of adult females and their young offspring. Male giraffes, on the other hand, tend to live in solitude or associate with other young males. Communication among giraffes involves body movements, visual signals, and vocalizations.'),
    (3, 'header', 'Courtship and Mating'),
    (3, 'paragraph', 'During the mating season, male giraffes engage in a unique behavior called necking. They use their long necks as weapons to compete for dominance and the right to mate with females. This ritualistic behavior involves swinging their necks at each other in powerful blows.'),
    (3, 'image', 'giraffe_03.png'),
    (3, 'image', 'giraffe_06.png');

-- Contenuti per la pagina 4
INSERT INTO contents (idPage, type, content) VALUES
    (4, 'header', 'Adaptations to Arid Conditions'),
    (4, 'paragraph', 'Giraffes are well adapted to survive in arid environments such as the savannah. They can endure long periods without water by obtaining moisture from the leaves they consume. These remarkable animals have developed physiological mechanisms to conserve water and regulate their body temperature efficiently.'),
    (4, 'header', 'Water Requirements'),
    (4, 'paragraph', 'Although giraffes can survive for weeks without drinking water, they will drink when available. They obtain most of their hydration from the moisture-rich leaves, but they can also utilize water sources such as rivers and waterholes when necessary.');

-- Contenuti per la pagina 5
INSERT INTO contents (idPage, type, content) VALUES
    (5, 'header', 'The Extraordinary Neck'),
    (5, 'paragraph', 'The most recognizable feature of giraffes is their long neck, composed of seven cervical vertebrae, just like humans. However, each of these vertebrae can measure up to 10 inches in length, allowing giraffes to reach foliage at considerable heights.'),
    (5, 'header', 'Powerful Hearts and Circulatory System'),
    (5, 'paragraph', 'To pump blood up their long necks against gravity, giraffes possess a robust cardiovascular system. Their hearts can weigh up to 25 pounds and pump approximately 60 liters of blood per minute, ensuring an adequate supply of oxygen and nutrients to all body parts.'),
    (5, 'image', 'giraffe_05.png'),
    (5, 'image', 'giraffe_07.png');

-- Contenuti per la pagina 6
INSERT INTO contents (idPage, type, content) VALUES
    (6, 'header', 'Aesthetic Grace'),
    (6, 'paragraph', 'Giraffes are often regarded as symbols of elegance and beauty. Their long, slender necks, expressive eyes, and gentle movements captivate observers worldwide. Their presence in the wild evokes a sense of awe and wonder.'),
    (6, 'header', 'A Photographer s Delight'),
    (6, 'paragraph', 'For wildlife enthusiasts and photographers, encountering giraffes in their natural habitat is a dream come true. These magnificent creatures provide stunning photographic opportunities, especially against the backdrop of the African savannah.'),
    (6, 'image', 'giraffe_06.png'),
    (6, 'image', 'giraffe_08.png');

-- Contenuti per la pagina 7
INSERT INTO contents (idPage, type, content) VALUES
    (7, 'header', 'Threats to Giraffe Populations'),
    (7, 'paragraph', 'Despite their grandeur, giraffes face significant threats to their survival. Habitat loss, poaching, and disease have contributed to the decline in their population numbers. Urgent conservation efforts are required to protect these iconic animals.'),
    (7, 'header', 'Conservation Initiatives'),
    (7, 'paragraph', 'Various organizations and wildlife conservation groups are actively working to safeguard giraffes and their habitats. These efforts involve promoting anti-poaching measures, creating protected areas, and raising awareness about the importance of giraffe conservation.'),
    (7, 'image', 'giraffe_01.png'),
    (7, 'image', 'giraffe_07.png');

-- Contenuti per la pagina 8
INSERT INTO contents (idPage, type, content) VALUES
    (8, 'header', 'Nature s Masterpiece'),
    (8, 'paragraph', 'In conclusion, giraffes are truly nature s wonders. Their unique physical attributes, captivating social behavior, and ability to thrive in challenging environments make them extraordinary creatures. Preserving their existence and safeguarding their habitats are crucial for ensuring that future generations can admire and appreciate these magnificent animals.'),
    (8, 'header', 'The Splendor of Giraffe Patterns'),
    (8, 'paragraph', 'Each giraffe s coat pattern is as unique as a human fingerprint. The distinct markings serve as effective camouflage in the wild, helping them blend with the surrounding vegetation and providing protection against predators.'),
    (8, 'image', 'giraffe_02.png'),
    (8, 'image', 'giraffe_08.png');
*/

INSERT INTO users (username, hash, salt, name, backOfficeView, admin) VALUES
    ('marcorossi@polito.it', 'fe7cb11cec18ba469b506757bc92166a63a4e2af20d30ccd80e22d732eaf79be', '7791e8bd66d0510d', 'Marco Rossi', 0, 0);