import {db} from "../dbConfig"

export const getAllCommentUpvotes = db.prepare(`
SELECT commentUpvotes.* FROM commentUpvotes;
`);

export const getCommentUpvoteById = db.prepare(`
SELECT * FROM commentUpvotes WHERE id = ?
`);

export const updateCommentUpvote = db.prepare(`
UPDATE commentUpvotes SET userId = ?, commentId = ?;
`)

export const deleteAllUserCommentsUpvotesForComments = db.prepare(`
DELETE FROM commentUpvotes WHERE commentId = ?;
`)

export const deleteAllUserCommentsUpvotesForUsers = db.prepare(`
DELETE FROM commentUpvotes WHERE userId = ?;
`)

export const deleteCommentUpvote = db.prepare(`
DELETE FROM commentUpvotes WHERE id = ?;
`)