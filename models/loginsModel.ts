import {db} from "../dbConfig"

export const getAllLogins = db.prepare(`
SELECT * FROM logins;
`);

export const getLoginById = db.prepare(`
SELECT * FROM logins WHERE id = ?
`);

export const updateLogin = db.prepare(`
UPDATE logins SET status = ?, dateCreated = ?, time = ?, userId = ?;
`)

export const deleteLogin = db.prepare(`
DELETE FROM logins WHERE id = ?;
`)