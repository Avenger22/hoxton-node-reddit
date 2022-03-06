import {db} from "../dbConfig"

// #region 'Join querys relationships'
export const getUsersBySubredditId = db.prepare(`SELECT DISTINCT users.* FROM users
JOIN userSubreddits ON users.id = userSubreddits.userId
WHERE userSubreddits.subredditId = ?;`)

export const getSubredditsByUserId = db.prepare(`SELECT DISTINCT subreddits.* FROM subreddits
JOIN userSubreddits ON subreddits.id = userSubreddits.subredditId
WHERE userSubreddits.userId = ?;`) // if i want to remove duplicates just remove .date and .score and that new date with same entry will be removed


export const getUsersUpvotesByPostId = db.prepare(`SELECT DISTINCT users.* FROM users
JOIN postUpvotes ON users.id = postUpvotes.userId
WHERE postUpvotes.postId = ?;`)

export const getPostsUpvotesByUserId = db.prepare(`SELECT DISTINCT posts.* FROM posts
JOIN postUpvotes ON posts.id = postUpvotes.postId
WHERE postUpvotes.userId = ?;`) 

export const getUsersDownvotesByPostId = db.prepare(`SELECT DISTINCT users.* FROM users
JOIN postDownvotes ON users.id = postDownvotes.userId
WHERE postDownvotes.postId = ?;`)

export const getPostsDownvotesByUserId = db.prepare(`SELECT DISTINCT posts.* FROM posts
JOIN postDownvotes ON posts.id = postDownvotes.postId
WHERE postDownvotes.userId = ?;`) 


export const getUsersUpvotesByCommentId = db.prepare(`SELECT DISTINCT users.* FROM users
JOIN commentUpvotes ON users.id = commentUpvotes.userId
WHERE commentUpvotes.commentId = ?;`)

export const getCommentsUpvotesByUserId = db.prepare(`SELECT DISTINCT comments.* FROM comments
JOIN commentUpvotes ON comments.id = commentUpvotes.commentId
WHERE commentUpvotes.userId = ?;`) 

export const getUsersDownvotesByCommentId = db.prepare(`SELECT DISTINCT users.* FROM users
JOIN commentDownvotes ON users.id = commentDownvotes.userId
WHERE commentDownvotes.commentId = ?;`)

export const getCommentsDownvotesByUserId = db.prepare(`SELECT DISTINCT comments.* FROM comments
JOIN commentDownvotes ON comments.id = commentDownvotes.commentId
WHERE commentDownvotes.userId = ?;`)


export const getPostsForUser = db.prepare(`
SELECT * FROM posts
WHERE userId = ?;
`);

export const getLoginsForUser = db.prepare(`
SELECT * FROM logins
WHERE userId = ?;
`);

export const getCommentsForUser = db.prepare(`
SELECT * FROM comments
WHERE userId = ?;
`);

export const getCommentsForPost = db.prepare(`
SELECT * FROM comments
WHERE postId = ?;
`);

export const getPostsForSubreddit = db.prepare(`
SELECT * FROM posts
WHERE subredditId = ?;
`);
// #endregion