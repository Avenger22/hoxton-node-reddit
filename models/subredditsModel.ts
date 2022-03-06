import {db} from "../dbConfig"

export const getAllSubreddits = db.prepare(`
SELECT * FROM subreddits;
`);

export const getSubredditById = db.prepare(`
SELECT * FROM subreddits WHERE id = ?
`);

export const updateSubreddit = db.prepare(`
UPDATE subreddits SET name = ?, dateCreated = ?;
`)

export const deleteSubreddit = db.prepare(`
DELETE FROM subreddits WHERE id = ?;
`)