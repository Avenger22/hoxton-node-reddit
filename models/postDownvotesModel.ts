import {db} from "../dbConfig"

export const getAllPostDownvotes = db.prepare(`
SELECT postDownvotes.* FROM postDownvotes;
`);

export const getPostDownvoteById = db.prepare(`
SELECT * FROM postDownvotes WHERE id = ?
`);

export const updatePostDownvote = db.prepare(`
UPDATE postDownvotes SET userId = ?, postId = ?;
`)

export const deleteAllUserPostsDownvotesForPosts = db.prepare(`
DELETE FROM postDownvotes WHERE postId = ?;
`)

export const deleteAllUserPostsDownvotesForUsers = db.prepare(`
DELETE FROM postDownvotes WHERE userId = ?;
`)

export const deletePostDownvote = db.prepare(`
DELETE FROM postDownvotes WHERE id = ?;
`)