
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS names;

CREATE TABLE names (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment TEXT NOT NULL,
    time_added TEXT NOT NULL,
    name_id INTEGER NOT NULL,
    FOREIGN KEY (name_id) REFERENCES names(id)
);


INSERT INTO names (name) VALUES ('Alice');
INSERT INTO names (name) VALUES ('Bob');
INSERT INTO names (name) VALUES ('Charlie');

INSERT INTO comments (comment, time_added, name_id) VALUES ('Great work!', '2024-03-20T10:30:00Z', 1);
INSERT INTO comments (comment, time_added, name_id) VALUES ('Interesting article.', '2024-03-20T11:15:00Z', 2);
INSERT INTO comments (comment, time_added, name_id) VALUES ('Thank you for the information.', '2024-03-20T12:00:00Z', 3);
INSERT INTO comments (comment, time_added, name_id) VALUES ('Great work!', '2024-03-20T10:30:00Z', 1);
INSERT INTO comments (comment, time_added, name_id) VALUES ('Interesting article.', '2024-03-20T11:15:00Z', 2);
INSERT INTO comments (comment, time_added, name_id) VALUES ('Thank you for the information.', '2024-03-20T12:00:00Z', 3);
INSERT INTO comments (comment, time_added, name_id) VALUES ('Great work!', '2024-03-20T10:30:00Z', 1);
INSERT INTO comments (comment, time_added, name_id) VALUES ('Interesting article.', '2024-03-20T11:15:00Z', 2);
INSERT INTO comments (comment, time_added, name_id) VALUES ('Thank you for the information.', '2024-03-20T12:00:00Z', 3);
INSERT INTO comments (comment, time_added, name_id) VALUES ('Great work!', '2024-03-20T10:30:00Z', 1);
INSERT INTO comments (comment, time_added, name_id) VALUES ('Interesting article.', '2024-03-20T11:15:00Z', 2);
INSERT INTO comments (comment, time_added, name_id) VALUES ('Thank you for the information.', '2024-03-20T12:00:00Z', 3);
INSERT INTO comments (comment, time_added, name_id) VALUES ('Great work!', '2024-03-20T10:30:00Z', 1);
INSERT INTO comments (comment, time_added, name_id) VALUES ('Interesting article.', '2024-03-20T11:15:00Z', 2);
INSERT INTO comments (comment, time_added, name_id) VALUES ('Thank you for the information.', '2024-03-20T12:00:00Z', 3);