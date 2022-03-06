import {db} from "../dbConfig"

export const getAllCommentDownvotes = db.prepare(`
SELECT commentDownvotes.* FROM commentDownvotes;
`);

export const getCommentDownvoteById = db.prepare(`
SELECT * FROM commentUpvotes WHERE id = ?
`);

export const updateCommentDownvote = db.prepare(`
UPDATE commentDownvotes SET userId = ?, commentId = ?;
`)

export const deleteCommentDownvote = db.prepare(`
DELETE FROM commentDownvotes WHERE id = ?;
`)