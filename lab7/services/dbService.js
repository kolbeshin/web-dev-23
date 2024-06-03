// services/dbService.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;


async function initDB() {
    db = await open({
        filename: './comments.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS names (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            comment TEXT NOT NULL,
            time_added TEXT NOT NULL,
            name_id INTEGER NOT NULL,
            FOREIGN KEY (name_id) REFERENCES names(id)
        );
    `);
}

async function readComments(limit, offset) {
    return db.all(`
        SELECT comments.id, comments.comment, comments.time_added, names.name
        FROM comments
        JOIN names ON comments.name_id = names.id
        LIMIT ? OFFSET ?
    `, [limit, offset]);
}

async function getLimitComments() {
    const result = await db.get('SELECT COUNT(*) as count FROM comments');
    return result.count;
}

async function addComment(name, comment) {
    const timeAdded = new Date().toISOString();
    const nameRow = await db.get('SELECT id FROM names WHERE name = ?', [name]);
    let nameId;

    if (nameRow) {
        nameId = nameRow.id;
    } else {
        const result = await db.run('INSERT INTO names (name) VALUES (?)', [name]);
        nameId = result.lastID;
    }

    const result = await db.run('INSERT INTO comments (comment, time_added, name_id) VALUES (?, ?, ?)', [comment, timeAdded, nameId]);
    const newComment = await db.get('SELECT comments.id, comments.comment, comments.time_added, names.name FROM comments JOIN names ON comments.name_id = names.id WHERE comments.id = ?', [result.lastID]);

    return newComment;
}

export { initDB, readComments, getLimitComments, addComment };