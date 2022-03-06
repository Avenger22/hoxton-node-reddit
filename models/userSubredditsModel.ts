import {db} from "../dbConfig"

export const getAllUserSubreddits = db.prepare(`
SELECT userSubreddits.* FROM userSubreddits;
`);

export const getUserSubredditById = db.prepare(`
SELECT * FROM userSubreddits WHERE id = ?
`);

export const updateUserSubreddit = db.prepare(`
UPDATE userSubreddits SET userId = ?, subredditId = ?;
`)

export const deleteUserSubreddit = db.prepare(`
DELETE FROM userSubreddits WHERE id = ?;
`)