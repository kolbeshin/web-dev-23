import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
    filename: './comments.db',
    driver: sqlite3.Database
});

const initDB = async () => {
    const db = await dbPromise;
    await db.exec(`
        CREATE TABLE IF NOT EXISTS names (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE
        );
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            comment TEXT,
            name_id INTEGER,
            time_added TEXT DEFAULT (datetime('now','localtime')),
            FOREIGN KEY (name_id) REFERENCES names(id)
        );
    `);
};

const readComments = async (limit, offset) => {
    const db = await dbPromise;
    return db.all(`
        SELECT comments.id, comments.comment, names.name, comments.time_added 
        FROM comments 
        JOIN names ON comments.name_id = names.id
        ORDER BY comments.id DESC
        LIMIT ? OFFSET ?`,
        [limit, offset]
    );
};

const getLimitComments = async () => {
    const db = await dbPromise;
    const result = await db.get(`SELECT COUNT(*) AS count FROM comments`);
    return result.count;
};

const addComment = async (name, comment) => {
    const db = await dbPromise;
    await db.run(`INSERT OR IGNORE INTO names (name) VALUES (?)`, [name]);
    const nameRow = await db.get(`SELECT id FROM names WHERE name = ?`, [name]);
    const result = await db.run(`
        INSERT INTO comments (comment, name_id) VALUES (?, ?)`,
        [comment, nameRow.id]
    );
    const newComment = await db.get(`
        SELECT comments.id, comments.comment, names.name, comments.time_added 
        FROM comments 
        JOIN names ON comments.name_id = names.id
        WHERE comments.id = ?`,
        [result.lastID]
    );
    return newComment;
};

const getCommentById = async (id) => {
    const db = await dbPromise;
    return db.get(`
        SELECT comments.id, comments.comment, names.name, comments.time_added 
        FROM comments 
        JOIN names ON comments.name_id = names.id
        WHERE comments.id = ?`,
        [id]
    );
};

const updateComment = async (id, newComment) => {
    const db = await dbPromise;
    await db.run(`UPDATE comments SET comment = ? WHERE id = ?`, [newComment, id]);
    return getCommentById(id);
};

const deleteComment = async (id) => {
    const db = await dbPromise;
    await db.run(`DELETE FROM comments WHERE id = ?`, [id]);
};

export { initDB, readComments, getLimitComments, addComment, getCommentById, updateComment, deleteComment };
