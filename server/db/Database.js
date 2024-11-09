import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class Database {
    constructor() {
        this.db = new sqlite3.Database(join(__dirname, 'notes.db'), (err) => {
            if (err) {
                console.error('Error connecting to database:', err);
            } else {
                console.log('Connected to SQLite database');
                this.initDatabase();
            }
        });
    }

    initDatabase() {
        const sql = `
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        
        this.db.run(sql, (err) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Notes table created or already exists');
            }
        });
    }


    // Read all notes
    getAllNotes() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM notes ORDER BY created_at DESC';
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Read a single note
    getNoteById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM notes WHERE id = ?';
            this.db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Update a note
    updateNote(id, title, content) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE notes 
                SET title = ?, 
                    content = ?,
                    updated_at = CURRENT_TIMESTAMP 
                WHERE id = ?
            `;
            this.db.run(sql, [title, content, id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id, title, content, changes: this.changes });
                }
            });
        });
    }

    // Delete a note
    deleteNote(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM notes WHERE id = ?';
            this.db.run(sql, [id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id, changes: this.changes });
                }
            });
        });
    }
} 