const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Create the comments table if it does not exist
async function initializeDatabase() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS comments (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            message VARCHAR(1000) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log("Comments database is ready.");
}

initializeDatabase().catch(console.error);

// Get every comment
app.get("/api/comments", async (request, response) => {
    try {
        const result = await pool.query(`
            SELECT id, name, message, created_at
            FROM comments
            ORDER BY created_at ASC
        `);

        response.json(result.rows);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Could not load comments." });
    }
});

// Save a new comment
app.post("/api/comments", async (request, response) => {
    try {
        let { name, message } = request.body;

        name = String(name || "Anonymous").trim();
        message = String(message || "").trim();

        if (!name) {
            name = "Anonymous";
        }

        if (!message) {
            return response.status(400).json({
                error: "The comment cannot be empty."
            });
        }

        if (name.length > 50 || message.length > 1000) {
            return response.status(400).json({
                error: "The name or comment is too long."
            });
        }

        const result = await pool.query(
            `INSERT INTO comments (name, message)
             VALUES ($1, $2)
             RETURNING id, name, message, created_at`,
            [name, message]
        );

        response.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Could not publish comment." });
    }
});

app.listen(PORT, () => {
    console.log(`Website running on port ${PORT}`);
});