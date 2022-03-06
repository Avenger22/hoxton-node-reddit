import {db} from "../dbConfig"

export const getAllusers = db.prepare(`
SELECT users.* FROM users;
`);

export const getUserById = db.prepare(`
SELECT * FROM users WHERE id = ?
`);

export const updateUser = db.prepare(`
UPDATE users SET firstName = ?, lastName = ?, userName = ?, gender = ?, birthday = ?, phoneNumber = ?, email = ?, isOnline = ?;
`)

export const deleteUser = db.prepare(`
DELETE FROM users WHERE id = ?;
`)