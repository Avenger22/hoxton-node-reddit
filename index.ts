// #region "importing and cofig stuff"
import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
import { createComment, createLogin, createPost, createSubreddit, createUserSubreddit, createUser, createPostUpvotes, createPostDownvotes, createCommentUpvotes, createCommentDownvotes } from "./setup";

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database("./data.db", {
  verbose: console.log,
});
// #endregion


// #region "Sql queries"


// #region 'Queries to get all rows from tables'
const getAllusers = db.prepare(`
SELECT users.* FROM users;
`);

const getAllSubreddits = db.prepare(`
SELECT * FROM subreddits;
`);

const getAllLogins = db.prepare(`
SELECT * FROM logins;
`);

const getAllComments = db.prepare(`
SELECT * FROM comments;
`);

const getAllPosts = db.prepare(`
SELECT * FROM posts;
`);

const getAllUserSubreddits = db.prepare(`
SELECT userSubreddits.* FROM userSubreddits;
`);

const getAllPostUpvotes = db.prepare(`
SELECT postUpvotes.* FROM postUpvotes;
`);

const getAllPostDownvotes = db.prepare(`
SELECT postDownvotes.* FROM postDownvotes;
`);

const getAllCommentUpvotes = db.prepare(`
SELECT commentUpvotes.* FROM commentUpvotes;
`);

const getAllCommentDownvotes = db.prepare(`
SELECT commentDownvotes.* FROM commentDownvotes;
`);
// #endregion

// #region 'Queries to get individual records from tables'
const getUserById = db.prepare(`
SELECT * FROM users WHERE id = ?
`);

const getCommentById = db.prepare(`
SELECT * FROM comments WHERE id = ?
`);

const getPostById = db.prepare(`
SELECT * FROM posts WHERE id = ?
`);

const getLoginById = db.prepare(`
SELECT * FROM logins WHERE id = ?
`);

const getSubredditById = db.prepare(`
SELECT * FROM subreddits WHERE id = ?
`);

const getUserSubredditById = db.prepare(`
SELECT * FROM userSubreddits WHERE id = ?
`);

const getPostUpvoteById = db.prepare(`
SELECT * FROM postUpvotes WHERE id = ?
`);

const getPostDownvoteById = db.prepare(`
SELECT * FROM postDownvotes WHERE id = ?
`);

const getCommentUpvoteById = db.prepare(`
SELECT * FROM commentUpvotes WHERE id = ?
`);

const getCommentDownvoteById = db.prepare(`
SELECT * FROM commentUpvotes WHERE id = ?
`);
// #endregion

// #region 'Queries to update individual records from tables'
const updateUser = db.prepare(`
UPDATE users SET firstName = ?, lastName = ?, userName = ?, gender = ?, birthday = ?, phoneNumber = ?, email = ?;
`)

const updateLogin = db.prepare(`
UPDATE logins SET status = ?, dateCreated = ?, time = ?, userId = ?;
`)

const updatePost = db.prepare(`
UPDATE posts SET title = ?, content = ?, linksTo = ?, status = ?, pic = ?, votes = ?, createdTime = ?, userId = ?, subredditId = ?;
`)

const updateSubreddit = db.prepare(`
UPDATE subreddits SET name = ?, followers = ?, online = ?, dateCreated = ?;
`)

const updateComment = db.prepare(`
UPDATE comments SET content = ?, upVotes = ?, downVotes = ?, dateCreated = ?, userId = ?, postId = ?;
`)

const updateUserSubreddit = db.prepare(`
UPDATE userSubreddits SET userId = ?, subredditId = ?;
`)

const updatePostUpvote = db.prepare(`
UPDATE postUpvotes SET userId = ?, postId = ?;
`)

const updatePostDownvote = db.prepare(`
UPDATE postDownvotes SET userId = ?, postId = ?;
`)

const updateCommentUpvote = db.prepare(`
UPDATE commentUpvotes SET userId = ?, commentId = ?;
`)

const updateCommentDownvote = db.prepare(`
UPDATE commentDownvotes SET userId = ?, commentId = ?;
`)
// #endregion

// #region 'Queries to delete individual records from tables'
const deleteUser = db.prepare(`
DELETE FROM users WHERE id = ?;
`)

const deleteComment = db.prepare(`
DELETE FROM comments WHERE id = ?;
`)

const deleteLogin = db.prepare(`
DELETE FROM logins WHERE id = ?;
`)

const deletePost = db.prepare(`
DELETE FROM posts WHERE id = ?;
`)

const deleteUserSubreddit = db.prepare(`
DELETE FROM userSubreddits WHERE id = ?;
`)

const deleteSubreddit = db.prepare(`
DELETE FROM subreddits WHERE id = ?;
`)

const deleteAllUserSubredditsForUser = db.prepare(`
DELETE FROM userSubreddits WHERE userId = ?;
`)

const deleteAllUserSubredditsForSubreddit = db.prepare(`
DELETE FROM userSubreddits WHERE subredditId = ?;
`)

const deleteAllLoginsForUser = db.prepare(`
DELETE FROM logins WHERE userId = ?;
`)

const deleteAllCommentsForUser = db.prepare(`
DELETE FROM comments WHERE userId = ?;
`)

const deleteAllPostsForUser = db.prepare(`
DELETE FROM posts WHERE userId = ?;
`)

const deleteAllPostsForSubreddit = db.prepare(`
DELETE FROM posts WHERE subredditId = ?;
`)

const deleteAllCommentsForPost = db.prepare(`
DELETE FROM comments WHERE postId = ?;
`)
// #endregion

// #region 'Join querys relationships'
const getUsersBySubredditId = db.prepare(`SELECT DISTINCT users.* FROM users
JOIN userSubreddits ON users.id = userSubreddits.userId
WHERE userSubreddits.subredditId = ?;`)

const getSubredditsByUserId = db.prepare(`SELECT DISTINCT subreddits.* FROM subreddits
JOIN userSubreddits ON subreddits.id = userSubreddits.subredditId
WHERE userSubreddits.userId = ?;`) // if i want to remove duplicates just remove .date and .score and that new date with same entry will be removed


const getUsersUpvotesByPostId = db.prepare(`SELECT DISTINCT users.* FROM users
JOIN postUpvotes ON users.id = postUpvotes.userId
WHERE postUpvotes.postId = ?;`)

const getPostsUpvotesByUserId = db.prepare(`SELECT DISTINCT posts.* FROM posts
JOIN postUpvotes ON posts.id = postUpvotes.postId
WHERE postUpvotes.userId = ?;`) 

const getUsersDownvotesByPostId = db.prepare(`SELECT DISTINCT users.* FROM users
JOIN postDownvotes ON users.id = postDownvotes.userId
WHERE postDownvotes.postId = ?;`)

const getPostsDownvotesByUserId = db.prepare(`SELECT DISTINCT posts.* FROM posts
JOIN postDownvotes ON posts.id = postDownvotes.postId
WHERE postDownvotes.userId = ?;`) 


const getUsersUpvotesByCommentId = db.prepare(`SELECT DISTINCT users.* FROM users
JOIN commentUpvotes ON users.id = commentUpvotes.userId
WHERE commentUpvotes.commentId = ?;`)

const getCommentsUpvotesByUserId = db.prepare(`SELECT DISTINCT comments.* FROM comments
JOIN commentUpvotes ON comments.id = commentUpvotes.commentId
WHERE commentUpvotes.userId = ?;`) 

const getUsersDownvotesByCommentId = db.prepare(`SELECT DISTINCT users.* FROM users
JOIN commentDownvotes ON users.id = commentDownvotes.userId
WHERE commentDownvotes.commentId = ?;`)

const getCommentsDownvotesByUserId = db.prepare(`SELECT DISTINCT comments.* FROM comments
JOIN commentDownvotes ON comments.id = commentDownvotes.commentId
WHERE commentDownvotes.userId = ?;`)


const getPostsForUser = db.prepare(`
SELECT * FROM posts
WHERE userId = ?;
`);

const getLoginsForUser = db.prepare(`
SELECT * FROM logins
WHERE userId = ?;
`);

const getCommentsForUser = db.prepare(`
SELECT * FROM comments
WHERE userId = ?;
`);

const getCommentsForPost = db.prepare(`
SELECT * FROM comments
WHERE postId = ?;
`);

const getPostsForSubreddit = db.prepare(`
SELECT * FROM posts
WHERE subredditId = ?;
`);
// #endregion


// #endregion


// #region "End points API"


// #region 'users end points'
app.get("/users", (req, res) => {

  const users = getAllusers.all();

  for (const user of users) {

    const subreddits = getSubredditsByUserId.all(user.id)
    user.subreddits = subreddits;

    const posts = getPostsForUser.all(user.id)
    user.posts = posts;

    const comments = getCommentsForUser.all(user.id)
    user.comments = comments

    const logins = getLoginsForUser.all(user.id)
    user.logins = logins

    const postsUpvotes = getPostsUpvotesByUserId.all(user.id)
    user.postsUpvotes = postsUpvotes;

    const postsDownvotes = getPostsDownvotesByUserId.all(user.id)
    user.postsDownvotes = postsDownvotes;

    const commentsUpvotes = getCommentsUpvotesByUserId.all(user.id)
    user.commentsUpvotes = commentsUpvotes;

    const commentsDownvotes = getCommentsDownvotesByUserId.all(user.id)
    user.commentsDownvotes = commentsDownvotes;

  }

  res.send(users);

});

app.get("/users/:id", (req, res) => {

  const id = req.params.id;
  const user = getUserById.get(id);
  
  if (user) {

    const subreddits = getSubredditsByUserId.all(user.id)
    user.subreddits = subreddits;

    const posts = getPostsForUser.all(user.id)
    user.posts = posts;

    const comments = getCommentsForUser.all(user.id)
    user.comments = comments

    const logins = getLoginsForUser.all(user.id)
    user.logins = logins

    const postsUpvotes = getPostsUpvotesByUserId.all(user.id)
    user.postsUpvotes = postsUpvotes;

    const postsDownvotes = getPostsDownvotesByUserId.all(user.id)
    user.postsDownvotes = postsDownvotes;

    const commentsUpvotes = getPostsUpvotesByUserId.all(user.id)
    user.commentsUpvotes = commentsUpvotes;

    const commentsDownvotes = getPostsDownvotesByUserId.all(user.id)
    user.commentsDownvotes = commentsDownvotes;

    res.send(user);

  }

  else {
    res.send({"error": "undefined"})
  }

});

app.post('/users', (req, res) => {

  // creating an museum is still the same as last week
  const { firstName, lastName, userName, gender, birthday, phoneNumber, email } = req.body
  const info = createUser.run(firstName, lastName, userName, gender, birthday, phoneNumber, email)

  // const errors = []

  // if (typeof name !== 'string') errors.push()

  if (info.changes > 0) {
    const user = getUserById.get(info.lastInsertRowid)
    res.send(user)
  } 
  
  else {
    res.send({ error: 'Something went wrong.' })
  }

})

app.delete('/users/:id', (req, res) => {
 
  const id = req.params.id

  deleteAllUserSubredditsForUser.run(id)
  deleteAllPostsForUser.run(id)
  deleteAllLoginsForUser.run(id)
  deleteAllCommentsForUser.run(id)

  const info = deleteUser.run(id)

  if (info.changes === 0) {
    res.status(404).send({ error: 'user not found.' })
  } 
  
  else {
    res.send({ message: 'user deleted.' })
  }

})

app.patch('/users/:id', (req, res) => {

  const id = req.params.id;
  const { firstName, lastName, userName, gender, birthday, phoneNumber, email } = req.body

  const info = updateUser.run(firstName, lastName, userName, gender, birthday, phoneNumber, email)
  const updatedUser = getUserById.get(Number(id))

  if (info.changes > 0) {
    res.send(updatedUser)
  }

  else {
    res.send({ error: 'Something went wrong.' })
  }

})
// #endregion

// #region 'userSubreddits end points'
app.get("/userSubreddits", (req, res) => {

  const userSubreddits = getAllUserSubreddits.all();
  res.send(userSubreddits);

});

app.get("/userSubreddits/:id", (req, res) => {

  const id = req.params.id;
  const userSubreddit = getUserSubredditById.get(id);

  if (userSubreddit) {
    res.send(userSubreddit);
  }

  else {
    res.send({"error": "undefined"})
  }

});

app.post('/userSubreddits', (req, res) => {

  const { userId, subbreditId } = req.body
  const info = createUserSubreddit.run(userId, subbreditId)

  // const errors = []

  // if (typeof name !== 'string') errors.push()

  if (info.changes > 0) {
    const userSubreddit = getUserSubredditById.get(info.lastInsertRowid)
    res.send(userSubreddit)
  } 
  
  else {
    res.send({ error: 'Something went wrong.' })
  }

})

app.delete('/userSubreddits/:id', (req, res) => {

  const id = req.params.id
  deleteUserSubreddit.run(id)

  const info = deleteUserSubreddit.run(id)

  if (info.changes === 0) {
    res.status(404).send({ error: 'userSubreddit not found.' })
  } 
  
  else {
    res.send({ message: 'userSubreddit deleted.' })
  }

})

app.patch('/userSubredditers/:id', (req, res) => {

  const id = req.params.id;
  const { userId, subredditId } = req.body

  const info = updateUserSubreddit.run(userId, subredditId)
  const updatedUserSubreddit = getUserSubredditById.get(Number(id))

  if (info.changes > 0) {
    res.send(updatedUserSubreddit)
  }

  else {
    res.send({ error: 'Something went wrong.' })
  }

})
// #endregion

// #region 'posts end points'
app.get("/posts", (req, res) => {

  const posts = getAllPosts.all();

  for (const post of posts) {

    const comments = getCommentsForPost.all(post.id)
    post.comments = comments;

    const user = getUserById.get(post.userId);
    post.user = user;

    const subreddit = getSubredditById.get(post.subredditId);
    post.subreddit = subreddit;

    const usersUpvotes = getUsersUpvotesByPostId.all(user.id)
    user.usersUpvotes = usersUpvotes;

    const usersDownvotes = getUsersDownvotesByPostId.all(user.id)
    user.usersDownvotes = usersDownvotes;

  }

  res.send(posts);

});

app.get("/posts/:id", (req, res) => {

    const id = req.params.id;
    const post = getPostById.get(id);

    if (post) {

      const comments = getCommentsForPost.all(post.id)
      post.comments = comments;

      const user = getUserById.get(post.userId);
      post.user = user;

      const subreddit = getSubredditById.get(post.subredditId);
      post.subreddit = subreddit;

      const usersUpvotes = getUsersUpvotesByPostId.all(user.id)
      user.usersUpvotes = usersUpvotes;

      const usersDownvotes = getUsersDownvotesByPostId.all(user.id)
      user.usersDownvotes = usersDownvotes;

      res.send(post);

    }

    else {
      res.send({"error": "undefined"})
    }

});

app.post('/posts', (req, res) => {

  // creating an museum is still the same as last week
  const { title, content, linksTo, status, pic, votes, createdTime, userId, subredditId } = req.body
  const info = createPost.run(title, content, linksTo, status, pic, votes, createdTime, userId, subredditId)

  // const errors = []

  // if (typeof name !== 'string') errors.push()

  if (info.changes > 0) {
    const post = getPostById.get(info.lastInsertRowid)
    res.send(post)
  } 
  
  else {
    res.send({ error: 'Something went wrong.' })
  }

})

app.delete('/posts/:id', (req, res) => {

  const id = req.params.id
  deleteAllCommentsForPost.run(id)

  const info = deletePost.run(id)

  if (info.changes === 0) {
    res.status(404).send({ error: 'post not found.' })
  } 
  
  else {
    res.send({ message: 'post deleted.' })
  }

})

app.patch('/posts/:id', (req, res) => {

  const id = req.params.id;
  const { title, content, linksTo, status, pic, votes, createdTime, userId, subredditId } = req.body

  const info = updatePost.run(title, content, linksTo, status, pic, votes, createdTime, userId, subredditId)
  const updatedPost = getPostById.get(Number(id))

  if (info.changes > 0) {
    res.send(updatedPost)
  }

  else {
    res.send({ error: 'Something went wrong.' })
  }

})
// #endregion

// #region 'comments end points'
app.get("/comments", (req, res) => {

  const comments = getAllComments.all();

  for (const comment of comments) {

    const user = getUserById.get(comment.userId);
    comment.user = user;

    const posts = getPostById.get(comment.postId);
    comment.post = posts;

    const usersUpvotes = getUsersUpvotesByCommentId.all(user.id)
    user.usersUpvotes = usersUpvotes;

    const usersDownvotes = getUsersDownvotesByCommentId.all(user.id)
    user.usersDownvotes = usersDownvotes;

  }

  res.send(comments);

});

app.get("/comments/:id", (req, res) => {

    const id = req.params.id;
    const comment = getCommentById.get(id)

    if (comment) {

      const user = getUserById.get(comment.userId);
      comment.user = user;

      const posts = getPostById.get(comment.postId);
      comment.post = posts;

      res.send(comment);

    }

    else {
      res.send({"error": "undefined"})
    }

});

app.post('/comments', (req, res) => {

  // creating an museum is still the same as last week
  const { content, upVotes, downVotes, dateCreated, userId, postId } = req.body
  const info = createComment.run( content, upVotes, downVotes, dateCreated, userId, postId )

  // const errors = []

  // if (typeof name !== 'string') errors.push()

  if (info.changes > 0) {
    const comment = getCommentById.get(info.lastInsertRowid)
    res.send(comment)
  } 
  
  else {
    res.send({ error: 'Something went wrong.' })
  }

})

app.delete('/comments/:id', (req, res) => {

  const id = req.params.id
  const info = deleteComment.run(id)

  if (info.changes === 0) {
    res.status(404).send({ error: 'comment not found.' })
  } 
  
  else {
    res.send({ message: 'comment deleted.' })
  }

})

app.patch('/comments/:id', (req, res) => {

  const id = req.params.id;
  const { content, upVotes, downVotes, dateCreated, userId, postId } = req.body

  const info = updateComment.run(content, upVotes, downVotes, dateCreated, userId, postId)
  const updatedComment = getCommentById.get(Number(id))

  if (info.changes > 0) {
    res.send(updatedComment)
  }

  else {
    res.send({ error: 'Something went wrong.' })
  }

})
// #endregion

// #region 'logins end points'
app.get("/logins", (req, res) => {

  const logins = getAllLogins.all();

  for (const login of logins) {

    const user = getUserById.get(login.userId);
    login.user = user;

  }

  res.send(logins);

});

app.get("/logins/:id", (req, res) => {

    const id = req.params.id;
    const login = getLoginById.get(id)

    if (login) {

      const user = getUserById.get(login.userId);
      login.user = user;

      res.send(login);

    }

    else {
      res.send({"error": "undefined"})
    }

});

app.post('/logins', (req, res) => {

  // creating an museum is still the same as last week
  const { status, dateCreated, time, userId } = req.body
  const info = createLogin.run(status, dateCreated, time, userId)

  // const errors = []

  // if (typeof name !== 'string') errors.push()

  if (info.changes > 0) {
    const logins = getLoginById.get(info.lastInsertRowid)
    res.send(logins)
  } 
  
  else {
    res.send({ error: 'Something went wrong.' })
  }

})

app.delete('/logins/:id', (req, res) => {

  const id = req.params.id
  const info = deleteLogin.run(id)

  if (info.changes === 0) {
    res.status(404).send({ error: 'login not found.' })
  } 
  
  else {
    res.send({ message: 'login deleted.' })
  }

})

app.patch('/logins/:id', (req, res) => {

  const id = req.params.id;
  const { status, dateCreated, time, userId } = req.body

  const info = updateLogin.run(status, dateCreated, time, userId)
  const updatedLogin = getLoginById.get(Number(id))

  if (info.changes > 0) {
    res.send(updatedLogin)
  }

  else {
    res.send({ error: 'Something went wrong.' })
  }

})
// #endregion

// #region 'subreddits end points'
app.get("/subreddits", (req, res) => {

  const subreddits = getAllSubreddits.all();

  for (const subreddit of subreddits) {

    const users = getUsersBySubredditId.all(subreddit.id)
    subreddit.users = users;

    const posts = getPostsForSubreddit.all(subreddit.id)
    subreddit.posts = posts;

  }

  res.send(subreddits);

});

app.get("/subreddits/:id", (req, res) => {

    const id = req.params.id;
    const subreddit = getSubredditById.get(id);

    if (subreddit) {

      const users = getUsersBySubredditId.all(subreddit.id)
      subreddit.users = users;

      const posts = getPostsForSubreddit.all(subreddit.id)
      subreddit.posts = posts;

      res.send(subreddit);

    }

    else {
      res.send({"error": "undefined"})
    }

});

app.post('/subreddits', (req, res) => {

  // creating an museum is still the same as last week
  const { name, followers, online, dateCreated } = req.body
  const info = createSubreddit.run(name, followers, online, dateCreated)

  // const errors = []

  // if (typeof name !== 'string') errors.push()

  if (info.changes > 0) {
    const subreddits = getSubredditById.get(info.lastInsertRowid)
    res.send(subreddits)
  } 
  
  else {
    res.send({ error: 'Something went wrong.' })
  }

})

app.delete('/subreddits/:id', (req, res) => {

  const id = req.params.id

  deleteAllUserSubredditsForSubreddit.run(id)
  deleteAllPostsForSubreddit.run(id)
  deleteAllCommentsForPost.run(id)

  const info = deleteSubreddit.run(id)

  if (info.changes === 0) {
    res.status(404).send({ error: 'Subreddit not found.' })
  } 
  
  else {
    res.send({ message: 'Subreddit deleted.' })
  }

})

app.patch('/subreddits/:id', (req, res) => {

  const id = req.params.id;
  const { name, followers, online, dateCreated } = req.body

  const info = updateSubreddit.run(name, followers, online, dateCreated)
  const updatedSubreddit = getSubredditById.get(Number(id))

  if (info.changes > 0) {
    res.send(updatedSubreddit)
  }

  else {
    res.send({ error: 'Something went wrong.' })
  }

})
// #endregion


// #endregion


app.listen(4000, () => console.log(`Listening on: http://localhost:4000`));