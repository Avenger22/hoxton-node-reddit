// #region "Importing stuff"
import { createComment, createLogin, createPost, createSubreddit, createUserSubreddit, createUser, createPostUpvotes, createPostDownvotes, createCommentUpvotes, createCommentDownvotes } from "./models/insertQuerysModel";
import {db} from "./dbConfig"
// #endregion


// #region 'Mock data array of objects for db'
const users = [
  { 
    firstName: 'Jurgen',
    lastName: 'Hasmeta',
    userName: 'Avenger22',
    gender: 'M',
    birthday: '22/12/1997',
    phoneNumber: '0631234511',
    email: "jurgen@email.com",
    isOnline: 1
  },
  { 
    firstName: 'Gozzo',
    lastName: 'Sundberg',
    userName: 'Sundberg28',
    gender: 'M',
    birthday: '22/11/1997',
    phoneNumber: '0631335511',
    email: "Sundberg@email.com",
    isOnline: 1  
  },
  { 
    firstName: 'Iason',
    lastName: 'Petőfi',
    userName: 'Petőfi25',
    gender: 'M',
    birthday: '12/12/1997',
    phoneNumber: '0671234511',
    email: "Petőfi@email.com",
    isOnline: 0
  },
  { 
    firstName: 'Ekin',
    lastName: 'Machado',
    userName: 'Machado99',
    gender: 'M',
    birthday: '2/12/1994',
    phoneNumber: '0631234533',
    email: "Machado@email.com",
    isOnline: 0
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
    createdTime: "1/10/2021",
    userId: 2,
    subredditId: 4
  }
]

const subreddits = [
  {
    name: "formula1",
    dateCreated: "05/01/2008"
  },
  {
    name: "ufc",
    dateCreated: "05/07/2009"
  },
  {
    name: "memes",
    dateCreated: "05/08/2009"
  },
  {
    name: "random",
    dateCreated: "07/08/2013"
  }
]

const comments = [
  {
    content: "hey yoo",
    dateCreated: "21/05/2020",
    userId: 1,
    postId: 4
  },
  {
    content: "hey yoo 2",
    dateCreated: "21/05/2029",
    userId: 1,
    postId: 4
  },
  {
    content: "hey yooooooooo",
    dateCreated: "21/05/2022",
    userId: 2,
    postId: 3
  },
  {
    content: "coment a",
    dateCreated: "11/09/2020",
    userId: 1,
    postId: 2
  },
  {
    content: "hey yoooeoehjeohe",
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

const postUpvotes = [
  {
    userId: 2,
    postId: 1
  },
  {
    userId: 1,
    postId: 1
  },
  {
    userId: 3,
    postId: 2
  },
  {
    userId: 1,
    postId: 3
  }
]

const postDownvotes = [
  {
    userId: 3,
    postId: 2
  },
  {
    userId: 3,
    postId: 1
  },
  {
    userId: 1,
    postId: 2
  },
  {
    userId: 4,
    postId: 3
  }
]

const commentUpvotes = [
  {
    userId: 2,
    commentId: 1
  },
  {
    userId: 1,
    commentId: 1
  },
  {
    userId: 3,
    commentId: 2
  },
  {
    userId: 1,
    commentId: 3
  }
]

const commentDownvotes = [
  {
    userId: 2,
    commentId: 3
  },
  {
    userId: 1,
    commentId: 2
  },
  {
    userId: 3,
    commentId: 3
  },
  {
    userId: 1,
    commentId: 4
  }
]
// #endregion


// #region 'Creating tables after droping etc sql'
db.exec(`
DROP TABLE IF EXISTS logins;
DROP TABLE IF EXISTS commentUpvotes;
DROP TABLE IF EXISTS commentDownvotes;
DROP TABLE IF EXISTS postUpvotes;
DROP TABLE IF EXISTS postDownvotes;
DROP TABLE IF EXISTS userSubreddits;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS subreddits;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  "id" INTEGER PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" INTEGER NOT NULL,
  "userName" TEXT NOT NULL,
  "gender" TEXT NOT NULL,
  "birthday" TEXT NOT NULL,
  "phoneNumber" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "isOnline" INTEGER DEFAULT 0 CHECK(isOnline IN(0,1))
);

CREATE TABLE IF NOT EXISTS subreddits (
  "id" INTEGER PRIMARY KEY,
  "name" TEXT NOT NULL,
  "dateCreated" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  "id" INTEGER PRIMARY KEY,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "linksTo" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "pic" TEXT NOT NULL,
  "createdTime" TEXT NOT NULL,
  "userId" INTEGER NOT NULL,
  "subredditId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("subredditId") REFERENCES "subreddits" ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
  "id" INTEGER PRIMARY KEY,
  "content" TEXT NOT NULL,
  "dateCreated" TEXT NOT NULL,
  "userId" INTEGER NOT NULL,
  "postId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("postId") REFERENCES "posts" ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS userSubreddits (
  "id" INTEGER PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "subredditId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("subredditId") REFERENCES "subreddits" ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS logins (
  "id" INTEGER PRIMARY KEY,
  "status" TEXT NOT NULL,
  "dateCreated" TEXT NOT NULL,
  "time" TEXT NOT NULL,
  "userId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS postUpvotes (
  "id" INTEGER PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "postId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("postId") REFERENCES "posts" ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS postDownvotes (
  "id" INTEGER PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "postId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("postId") REFERENCES "posts" ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS commentUpvotes (
  "id" INTEGER PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "commentId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("commentId") REFERENCES "comments" ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS commentDownvotes (
  "id" INTEGER PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "commentId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("commentId") REFERENCES "comments" ("id") ON DELETE CASCADE
);
`)
// #endregion


// #region 'For of loops to insert from mockdata to db with running the sql query'
for (const user of users) {
  createUser(user)
}

for (const login of logins) {
  createLogin(login)
}

for (const subreddit of subreddits) {
  createSubreddit(subreddit)
}

for (const post of posts) {
  createPost(post)
}

for (const userSubreddit of userSubreddits) {
  createUserSubreddit(userSubreddit)
}

for (const comment of comments) {
  createComment(comment)
}

for (const postUpvote of postUpvotes) {
  createPostUpvotes(postUpvote)
}

for (const postDownvote of postDownvotes) {
  createPostDownvotes(postDownvote)
}

for (const commentUpvote of commentUpvotes) {
  createCommentUpvotes(commentUpvote)
}

for (const commentDownvote of commentDownvotes) {
  createCommentDownvotes(commentDownvote)
}
// #endregion