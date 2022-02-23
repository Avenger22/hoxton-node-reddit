import Database from 'better-sqlite3'

const db = new Database('./data.db', {
  verbose: console.log
})

// #region 'Mock data array of objects for db'
const users = [
  { 
    firstName: 'Jurgen',
    lastName: 'Hasmeta',
    userName: 'Avenger22',
    gender: 'M',
    birthday: '22/12/1997',
    phoneNumber: '0631234511',
    email: "jurgen@email.com" 
  },
  { 
    firstName: 'Gozzo',
    lastName: 'Sundberg',
    userName: 'Sundberg28',
    gender: 'M',
    birthday: '22/11/1997',
    phoneNumber: '0631335511',
    email: "Sundberg@email.com" 
  },
  { 
    firstName: 'Iason',
    lastName: 'Petőfi',
    userName: 'Petőfi25',
    gender: 'M',
    birthday: '12/12/1997',
    phoneNumber: '0671234511',
    email: "Petőfi@email.com"  
  },
  { 
    firstName: 'Ekin',
    lastName: 'Machado',
    userName: 'Machado99',
    gender: 'M',
    birthday: '2/12/1994',
    phoneNumber: '0631234533',
    email: "Machado@email.com"  
  }
]

const logins = [
  {
    status: 'success',
    dateCreated: '12/11/2021',
    time: '15:45',
    userId: 2
  },
  {
    status: 'success',
    dateCreated: '12/11/2020',
    time: '17:45',
    userId: 2
  },
  {
    status: 'success',
    dateCreated: '3/11/2021',
    time: '18:45',
    userId: 1
  }
]

const posts = [
  { 
    title: "Mike tyson returns to fight in UFC, dana white refuses him sayng 'too old'",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt",
    linksTo: "https://www.nowhere.com",
    status: "ongoing",
    pic: "image.jpg",
    votes: 45,
    createdTime: "21/10/2021",
    userId: 1,
    subredditId: 2
  },
  { 
    title: "LMAO what a meme",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt",
    linksTo: "https://www.nowhere.com",
    status: "ongoing",
    pic: "image.jpg",
    votes: 1257,
    createdTime: "17/10/2021",
    userId: 2,
    subredditId: 3
  },
  { 
    title: "Khabib beats and submits Conor Mcgregor and reamins undefeated",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt",
    linksTo: "https://www.nowhere.com",
    status: "ongoing",
    pic: "image.jpg",
    votes: 5434,
    createdTime: "08/10/2018",
    userId: 3,
    subredditId: 2
  },
  { 
    title: "F1 massive sponsorship is sealed the deal today in italy",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt",
    linksTo: "https://www.nowhere.com",
    status: "ongoing",
    pic: "image43.jpg",
    votes: 178,
    createdTime: "11/10/2021",
    userId: 4,
    subredditId: 1
  },
  { 
    title: "A cute cat playing with its owners",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt",
    linksTo: "https://www.nowhere.com",
    status: "ongoing",
    pic: "image1.jpg",
    votes: 77,
    createdTime: "1/10/2021",
    userId: 2,
    subredditId: 4
  }
]

const subreddits = [
  {
    name: "formula1",
    followers: 50553,
    online: 356,
    dateCreated: "05/01/2008"
  },
  {
    name: "ufc",
    followers: 1560553,
    online: 1570,
    dateCreated: "05/07/2009"
  },
  {
    name: "memes",
    followers: 500550553,
    online: 356333,
    dateCreated: "05/08/2009"
  },
  {
    name: "random",
    followers: 530553,
    online: 3563,
    dateCreated: "07/08/2013"
  }
]

const comments = [
  {
    content: "hey yoo",
    upVotes: 37,
    downVotes: 11,
    dateCreated: "21/05/2020",
    userId: 1,
    postId: 4
  },
  {
    content: "hey yoo 2",
    upVotes: 13,
    downVotes: 18,
    dateCreated: "21/05/2029",
    userId: 1,
    postId: 4
  },
  {
    content: "hey yooooooooo",
    upVotes: 156,
    downVotes: 11,
    dateCreated: "21/05/2022",
    userId: 2,
    postId: 3
  },
  {
    content: "coment a",
    upVotes: 50,
    downVotes: 144,
    dateCreated: "11/09/2020",
    userId: 1,
    postId: 2
  },
  {
    content: "hey yoooeoehjeohe",
    upVotes: 2,
    downVotes: 13,
    dateCreated: "3/05/2020",
    userId: 4,
    postId: 1
  }
]

const userSubreddits = [
  {
    userId: 2,
    subredditId: 1
  },
  {
    userId: 1,
    subredditId: 1
  },
  {
    userId: 3,
    subredditId: 2
  },
  {
    userId: 1,
    subredditId: 3
  }
]
// #endregion

// #region 'Creating tables after droping etc sql'
db.exec(`
DROP TABLE IF EXISTS logins;
DROP TABLE IF EXISTS subreddits;
DROP TABLE IF EXISTS userSubreddits;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS comments;

CREATE TABLE IF NOT EXISTS users (
  "id" INTEGER PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" INTEGER NOT NULL,
  "userName" TEXT NOT NULL,
  "gender" TEXT NOT NULL,
  "birthday" TEXT NOT NULL,
  "phoneNumber" TEXT NOT NULL,
  "email" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS subreddits (
  "id" INTEGER PRIMARY KEY,
  "name" TEXT NOT NULL,
  "followers" INTEGER NOT NULL,
  "online" INTEGER NOT NULL,
  "dateCreated" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  "id" INTEGER PRIMARY KEY,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "linksTo" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "pic" TEXT NOT NULL,
  "votes" INTEGER NOT NULL,
  "createdTime" TEXT NOT NULL,
  "userId" INTEGER NOT NULL,
  "subredditId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id"),
  FOREIGN KEY ("subredditId") REFERENCES "subreddits" ("id")
);

CREATE TABLE IF NOT EXISTS comments (
  "id" INTEGER PRIMARY KEY,
  "content" TEXT NOT NULL,
  "upVotes" INTEGER NOT NULL,
  "downVotes" INTEGER NOT NULL,
  "dateCreated" TEXT NOT NULL,
  "userId" INTEGER NOT NULL,
  "postId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id"),
  FOREIGN KEY ("postId") REFERENCES "posts" ("id")
);

CREATE TABLE IF NOT EXISTS userSubreddits (
  "id" INTEGER PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "subredditId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id"),
  FOREIGN KEY ("subredditId") REFERENCES "subreddits" ("id")
);

CREATE TABLE IF NOT EXISTS logins (
  "id" INTEGER PRIMARY KEY,
  "status" TEXT NOT NULL,
  "dateCreated" TEXT NOT NULL,
  "time" TEXT NOT NULL,
  "userId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id")
);
`)
// #endregion

// #region 'Insert querys'
export const createUser = db.prepare(`
INSERT INTO users ( firstName, lastName, userName, gender, birthday, phoneNumber, email ) VALUES (?, ?, ?, ?, ?, ?, ?);
`)

export const createComment = db.prepare(`
INSERT INTO comments (content, upVotes, downVotes, dateCreated, userId, postId) VALUES (?, ?, ?, ?, ?, ?);
`)

export const createUserSubreddit = db.prepare(`
INSERT INTO userSubreddits (userId, subredditId) VALUES (?, ?);
`)

export const createPost = db.prepare(`
INSERT INTO posts (title, content, linksTo, status, pic, votes, createdTime, userId, subredditId ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
`)

export const createLogin = db.prepare(`
INSERT INTO logins (status, dateCreated, time, userId) VALUES (?, ?, ?, ?);
`)

export const createSubreddit = db.prepare(`
INSERT INTO subreddits (name, followers, online, dateCreated ) VALUES (?, ? ,?, ?);
`)
// #endregion

// #region 'For of loops to insert from mockdata to db with running the sql query'
for (const user of users) {
  createUser.run(user.firstName, user.lastName, user.userName, user.gender, user.birthday, user.phoneNumber, user.email)
}

for (const login of logins) {
  createLogin.run(login.status, login.dateCreated, login.time, login.userId)
}

for (const subreddit of subreddits) {
  createSubreddit.run(subreddit.name, subreddit.followers, subreddit.online, subreddit.dateCreated)
}

for (const post of posts) {
  createPost.run(post.title, post.content, post.linksTo, post.status, post.pic, post.votes, post.createdTime, post.userId, post.subredditId)
}

for (const userSubreddit of userSubreddits) {
  createUserSubreddit.run(userSubreddit.userId, userSubreddit.subredditId)
}

for (const comment of comments) {
  createComment.run(comment.content, comment.upVotes, comment.downVotes, comment.dateCreated, comment.userId, comment.postId)
}
// #endregion