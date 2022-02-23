// #region "importing and cofig stuff"
import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
import { createUserSubreddit } from "./setup";
// import {createuser, createuserSubreddit, createuserSubredditer} from "./setup"

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
// #endregion

// #region 'Join querys relationships'
const getUsersBySubredditId = db.prepare(`SELECT DISTINCT users.* FROM users
JOIN userSubreddits ON users.id = userSubreddits.userId
WHERE userSubreddits.subredditId = ?;`)

const getSubredditsByUserId = db.prepare(`SELECT DISTINCT subreddits.* FROM subreddits
JOIN userSubreddits ON subreddits.id = userSubreddits.subredditId
WHERE userSubreddits.userId = ?;`) // if i want to remove duplicates just remove .date and .score and that new date with same entry will be removed

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

// #region 'SQL CUD operations

// const deleteuser = db.prepare(`
// DELETE FROM users WHERE id = ?;
// `)

// const deleteuserSubredditer = db.prepare(`
// DELETE FROM userSubredditers WHERE id = ?;
// `)

// const deleteuserSubreddit = db.prepare(`
// DELETE FROM userSubreddits WHERE id = ?;
// `)

// const updateser = db.prepare(`
// UPDATE users SET name = ?, email = ?;
// `)

// const updateuserSubredditer = db.prepare(`
// UPDATE userSubredditers SET name = ?, email = ?;
// `)

// const updateuserSubreddit = db.prepare(`
// UPDATE userSubreddits SET userId = ?, userSubredditerId = ?, date = ?, score = ?;
// `)

// const deleteAlluserSubredditsForuser = db.prepare(`
// DELETE FROM userSubreddits WHERE userId = ?;
// `)

// const deleteAlluserSubredditsForuserSubredditer = db.prepare(`
// DELETE FROM userSubreddits WHERE userSubredditerId = ?;
// `)

// #endregion


// #endregion


// #region 'End points API'


// #region 'users end points'
app.get("/users", (req, res) => {

  const users = getAllusers.all();

  for (const user of users) {

    const subreddits = getSubredditsByUserId.all(user.id)
    user.subreddits = subreddits;

    const posts = getPostsForUser.all(user.id)
    user.posts = posts;

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

    res.send(user);

  }

  else {
    res.send({"error": "undefined"})
  }

});

// app.post('/users', (req, res) => {

//   // creating an museum is still the same as last week
//   const { name, email } = req.body
//   const info = createuser.run(name, email)

//   // const errors = []

//   // if (typeof name !== 'string') errors.push()

//   if (info.changes > 0) {
//     const user = getuserById.get(info.lastInsertRowid)
//     res.send(user)
//   } 
  
//   else {
//     res.send({ error: 'Something went wrong.' })
//   }

// })

// app.delete('/users/:id', (req, res) => {

//   const id = req.params.id
//   deleteAlluserSubredditsForuser.run(id)
//   const info = deleteuser.run(id)

//   if (info.changes === 0) {
//     res.status(404).send({ error: 'user not found.' })
//   } 
  
//   else {
//     res.send({ message: 'user deleted.' })
//   }

// })

// app.patch('/users/:id', (req, res) => {

//   const id = req.params.id;
//   const { name, email } = req.body

//   const info = updateuser.run(name, email)
//   const updateduser = getuserById.get(Number(id))

//   if (info.changes > 0) {
//     res.send(updateduser)
//   }

//   else {
//     res.send({ error: 'Something went wrong.' })
//   }

// })
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

// app.post('/userSubreddits', (req, res) => {

//   const { userId, subbreditId } = req.body
//   const info = createUserSubreddit.run(userId, subbreditId)

//   // const errors = []

//   // if (typeof name !== 'string') errors.push()

//   if (info.changes > 0) {
//     const userSubreddit = getUserSubredditById.get(info.lastInsertRowid)
//     res.send(userSubreddit)
//   } 
  
//   else {
//     res.send({ error: 'Something went wrong.' })
//   }

// })

// app.delete('/userSubreddits/:id', (req, res) => {

//   const id = req.params.id
//   // deleteAlluserSubredditsForuserSubredditer.run(id)
//   const userSubreddits = getAllUserSubreddits.all()

//   for (const userSubreddit of userSubreddits) {

//     if (userSubreddit.subredditId === id) {
//       console.log("userSubreddit deleting id :", userSubreddit)
//       deleteuserSubreddit.run(userSubreddit.id)
//     }

//   }

//   const info = deleteuserSubredditer.run(id)

//   if (info.changes === 0) {
//     res.status(404).send({ error: 'userSubredditer not found.' })
//   } 
  
//   else {
//     res.send({ message: 'userSubredditer deleted.' })
//   }

// })

// app.patch('/userSubredditers/:id', (req, res) => {

//   const id = req.params.id;
//   const { name, email } = req.body

//   const info = updateuserSubreddit.run(name, email)
//   const updateduserSubredditer = getuserSubredditerById.get(Number(id))

//   if (info.changes > 0) {
//     res.send(updateduserSubredditer)
//   }

//   else {
//     res.send({ error: 'Something went wrong.' })
//   }

// })
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

      res.send(post);

    }

    else {
      res.send({"error": "undefined"})
    }

});

// app.post('/posts', (req, res) => {

//   // creating an museum is still the same as last week
//   const { userId, userSubredditerId, date, score } = req.body
//   const info = createuserSubreddit.run(userId, userSubredditerId, date, score)

//   // const errors = []

//   // if (typeof name !== 'string') errors.push()

//   if (info.changes > 0) {
//     const userSubreddit = getuserSubredditById.get(info.lastInsertRowid)
//     res.send(userSubreddit)
//   } 
  
//   else {
//     res.send({ error: 'Something went wrong.' })
//   }

// })

// app.delete('/posts/:id', (req, res) => {

//   const id = req.params.id
//   const info = deleteuserSubreddit.run(id)

//   if (info.changes === 0) {
//     res.status(404).send({ error: 'userSubreddit not found.' })
//   } 
  
//   else {
//     res.send({ message: 'userSubreddit deleted.' })
//   }

// })

// app.patch('/posts/:id', (req, res) => {

//   const id = req.params.id;
//   const { userId, userSubredditerId, date, score } = req.body

//   const info = updateuserSubreddit.run(userId, userSubredditerId, date, score)
//   const updateduserSubreddit = getuserSubredditById.get(Number(id))

//   if (info.changes > 0) {
//     res.send(updateduserSubreddit)
//   }

//   else {
//     res.send({ error: 'Something went wrong.' })
//   }

// })
// #endregion

// #region 'comments end points'
app.get("/comments", (req, res) => {

  const comments = getAllComments.all();

  for (const comment of comments) {

    const user = getUserById.get(comment.userId);
    comment.user = user;

    const posts = getPostById.get(comment.postId);
    comment.post = posts;

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

// app.post('/comments', (req, res) => {

//   // creating an museum is still the same as last week
//   const { userId, userSubredditerId, date, score } = req.body
//   const info = createuserSubreddit.run(userId, userSubredditerId, date, score)

//   // const errors = []

//   // if (typeof name !== 'string') errors.push()

//   if (info.changes > 0) {
//     const userSubreddit = getuserSubredditById.get(info.lastInsertRowid)
//     res.send(userSubreddit)
//   } 
  
//   else {
//     res.send({ error: 'Something went wrong.' })
//   }

// })

// app.delete('/comments/:id', (req, res) => {

//   const id = req.params.id
//   const info = deleteuserSubreddit.run(id)

//   if (info.changes === 0) {
//     res.status(404).send({ error: 'userSubreddit not found.' })
//   } 
  
//   else {
//     res.send({ message: 'userSubreddit deleted.' })
//   }

// })

// app.patch('/comments/:id', (req, res) => {

//   const id = req.params.id;
//   const { userId, userSubredditerId, date, score } = req.body

//   const info = updateuserSubreddit.run(userId, userSubredditerId, date, score)
//   const updateduserSubreddit = getuserSubredditById.get(Number(id))

//   if (info.changes > 0) {
//     res.send(updateduserSubreddit)
//   }

//   else {
//     res.send({ error: 'Something went wrong.' })
//   }

// })
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

// app.post('/logins', (req, res) => {

//   // creating an museum is still the same as last week
//   const { userId, userSubredditerId, date, score } = req.body
//   const info = createuserSubreddit.run(userId, userSubredditerId, date, score)

//   // const errors = []

//   // if (typeof name !== 'string') errors.push()

//   if (info.changes > 0) {
//     const userSubreddit = getuserSubredditById.get(info.lastInsertRowid)
//     res.send(userSubreddit)
//   } 
  
//   else {
//     res.send({ error: 'Something went wrong.' })
//   }

// })

// app.delete('/logins/:id', (req, res) => {

//   const id = req.params.id
//   const info = deleteuserSubreddit.run(id)

//   if (info.changes === 0) {
//     res.status(404).send({ error: 'userSubreddit not found.' })
//   } 
  
//   else {
//     res.send({ message: 'userSubreddit deleted.' })
//   }

// })

// app.patch('/logins/:id', (req, res) => {

//   const id = req.params.id;
//   const { userId, userSubredditerId, date, score } = req.body

//   const info = updateuserSubreddit.run(userId, userSubredditerId, date, score)
//   const updateduserSubreddit = getuserSubredditById.get(Number(id))

//   if (info.changes > 0) {
//     res.send(updateduserSubreddit)
//   }

//   else {
//     res.send({ error: 'Something went wrong.' })
//   }

// })
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

// app.post('/subreddits', (req, res) => {

//   // creating an museum is still the same as last week
//   const { userId, userSubredditerId, date, score } = req.body
//   const info = createuserSubreddit.run(userId, userSubredditerId, date, score)

//   // const errors = []

//   // if (typeof name !== 'string') errors.push()

//   if (info.changes > 0) {
//     const userSubreddit = getuserSubredditById.get(info.lastInsertRowid)
//     res.send(userSubreddit)
//   } 
  
//   else {
//     res.send({ error: 'Something went wrong.' })
//   }

// })

// app.delete('/subreddits/:id', (req, res) => {

//   const id = req.params.id
//   const info = deleteuserSubreddit.run(id)

//   if (info.changes === 0) {
//     res.status(404).send({ error: 'userSubreddit not found.' })
//   } 
  
//   else {
//     res.send({ message: 'userSubreddit deleted.' })
//   }

// })

// app.patch('/subreddits/:id', (req, res) => {

//   const id = req.params.id;
//   const { userId, userSubredditerId, date, score } = req.body

//   const info = updateuserSubreddit.run(userId, userSubredditerId, date, score)
//   const updateduserSubreddit = getuserSubredditById.get(Number(id))

//   if (info.changes > 0) {
//     res.send(updateduserSubreddit)
//   }

//   else {
//     res.send({ error: 'Something went wrong.' })
//   }

// })
// #endregion


// #endregion

app.listen(4000, () => console.log(`Listening on: http://localhost:4000`));