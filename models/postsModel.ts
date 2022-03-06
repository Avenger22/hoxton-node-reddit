import {db} from "../dbConfig"

export const getAllPosts = db.prepare(`
SELECT * FROM posts;
`);

export const getPostById = db.prepare(`
SELECT * FROM posts WHERE id = ?
`);

export const getPostsByUserId = db.prepare(`
SELECT * FROM posts WHERE userId = ?
`);

export const updatePost = db.prepare(`
UPDATE posts SET title = ?, content = ?, linksTo = ?, status = ?, pic = ?, createdTime = ?, userId = ?, subredditId = ?;
`)

export const deletePost = db.prepare(`
DELETE FROM posts WHERE id = ?;
`)