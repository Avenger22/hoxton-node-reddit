
import Database from "better-sqlite3";

const db = new Database("./data.db", {
    verbose: console.log,
});

// #region 'Insert querys'
export const createUser = db.prepare(`
INSERT INTO users (firstName, lastName, userName, gender, birthday, phoneNumber, email) VALUES (?, ?, ?, ?, ?, ?, ?);
`)

export const createComment = db.prepare(`
INSERT INTO comments (content, dateCreated, userId, postId) VALUES (?, ?, ?, ?);
`)

export const createPostUpvotes = db.prepare(`
INSERT INTO postUpvotes (userId, postId) VALUES (?, ?);
`)

export const createPostDownvotes = db.prepare(`
INSERT INTO postDownvotes (userId, postId) VALUES (?, ?);
`)

export const createCommentUpvotes = db.prepare(`
INSERT INTO commentUpvotes (userId, commentId) VALUES (?, ?);
`)

export const createCommentDownvotes = db.prepare(`
INSERT INTO commentDownvotes (userId, commentId) VALUES (?, ?);
`)

export const createUserSubreddit = db.prepare(`
INSERT INTO userSubreddits (userId, subredditId) VALUES (?, ?);
`)

export const createPost = db.prepare(`
INSERT INTO posts (title, content, linksTo, status, pic, createdTime, userId, subredditId ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
`)

export const createLogin = db.prepare(`
INSERT INTO logins (status, dateCreated, time, userId) VALUES (?, ?, ?, ?);
`)

export const createSubreddit = db.prepare(`
INSERT INTO subreddits (name, dateCreated ) VALUES (?, ?);
`)
// #endregion