import {db} from "../dbConfig"

export const getAllComments = db.prepare(`
SELECT * FROM comments;
`);

export const getCommentById = db.prepare(`
SELECT * FROM comments WHERE id = ?
`);

export const updateComment = db.prepare(`
UPDATE comments SET content = ?, dateCreated = ?, userId = ?, postId = ?;
`)

export const deleteComment = db.prepare(`
DELETE FROM comments WHERE id = ?;
`)