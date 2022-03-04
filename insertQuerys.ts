// #region "Database config"
import Database from "better-sqlite3";

export const db = new Database("./data.db", {
    verbose: console.log,
});
// #endregion

// #region 'Insert querys'

//@ts-ignore
export const createUser = ({firstName, lastName, userName, gender, birthday, phoneNumber, email, isOnline}) => db.prepare(`
    INSERT INTO users (firstName, lastName, userName, gender, birthday, phoneNumber, email, isOnline) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
`).run(firstName, lastName, userName, gender, birthday, phoneNumber, email, isOnline)

//@ts-ignore
export const createComment = ({content, dateCreated, userId, postId}) => db.prepare(`
INSERT INTO comments (content, dateCreated, userId, postId) VALUES (?, ?, ?, ?);
`).run(content, dateCreated, userId, postId)

//@ts-ignore
export const createPostUpvotes = ({userId, postId}) => db.prepare(`
INSERT INTO postUpvotes (userId, postId) VALUES (?, ?);
`).run(userId, postId)

//@ts-ignore
export const createPostDownvotes = ({userId, postId}) => db.prepare(`
INSERT INTO postDownvotes (userId, postId) VALUES (?, ?);
`).run(userId, postId)

//@ts-ignore
export const createCommentUpvotes = ({userId, commentId}) => db.prepare(`
INSERT INTO commentUpvotes (userId, commentId) VALUES (?, ?);
`).run(userId, commentId)

//@ts-ignore
export const createCommentDownvotes = ({userId, commentId}) => db.prepare(`
INSERT INTO commentDownvotes (userId, commentId) VALUES (?, ?);
`).run(userId, commentId)

//@ts-ignore
export const createUserSubreddit = ({userId, subredditId}) => db.prepare(`
INSERT INTO userSubreddits (userId, subredditId) VALUES (?, ?);
`).run(userId, subredditId)

//@ts-ignore
export const createPost = ({title, content, linksTo, status, pic, createdTime, userId, subredditId}) => db.prepare(`
INSERT INTO posts (title, content, linksTo, status, pic, createdTime, userId, subredditId ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
`).run(title, content, linksTo, status, pic, createdTime, userId, subredditId)

//@ts-ignore
export const createLogin = ({status, dateCreated, time, userId}) => db.prepare(`
INSERT INTO logins (status, dateCreated, time, userId) VALUES (?, ?, ?, ?);
`).run(status, dateCreated, time, userId)

//@ts-ignore
export const createSubreddit = ({name, dateCreated}) => db.prepare(`
INSERT INTO subreddits (name, dateCreated ) VALUES (?, ?);
`).run(name, dateCreated)
// #endregion