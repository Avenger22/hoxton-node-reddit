import {db} from "../dbConfig"

export const getAllPostUpvotes = db.prepare(`
SELECT postUpvotes.* FROM postUpvotes;
`);

export const getPostUpvoteById = db.prepare(`
SELECT * FROM postUpvotes WHERE id = ?
`);

export const updatePostUpvote = db.prepare(`
UPDATE postUpvotes SET userId = ?, postId = ?;
`)

export const deleteAllUserPostsUpvotesForPosts = db.prepare(`
DELETE FROM postUpvotes WHERE postId = ?;
`)

export const deleteAllUserPostsUpvotesForUsers = db.prepare(`
DELETE FROM postUpvotes WHERE userId = ?;
`)

export const deletePostUpvote = db.prepare(`
DELETE FROM postUpvotes WHERE id = ?;
`)