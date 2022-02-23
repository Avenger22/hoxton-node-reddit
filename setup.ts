import Database from 'better-sqlite3'

const db = new Database('./data.db', {
  verbose: console.log
})

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
    name: 'Gozzo',
    lastName: 'Sundberg',
    userName: 'Sundberg28',
    gender: 'M',
    birthday: '22/11/1997',
    phoneNumber: '0631335511',
    email: "Sundberg@email.com" 
  },
  { 
    name: 'Iason',
    lastName: 'Petőfi',
    userName: 'Petőfi25',
    gender: 'M',
    birthday: '12/12/1997',
    phoneNumber: '0671234511',
    email: "Petőfi@email.com"  
  },
  { 
    name: 'Ekin',
    lastName: 'Machado',
    userName: 'Machado99',
    gender: 'M',
    birthday: '2/12/1994',
    phoneNumber: '0631234533',
    email: "Machado@email.com"  
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
  }
]

const subReddits = [
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

const comments = []

db.exec(`
DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS applicants;
DROP TABLE IF EXISTS interviewers;

CREATE TABLE IF NOT EXISTS applicants (
  id INTEGER,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS interviewers (
  id INTEGER,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS interviews (
  id INTEGER,
  applicantId INTEGER,
  interviewerId INTEGER,
  date TEXT NOT NULL,
  score INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (applicantId) REFERENCES applicants(id),
  FOREIGN KEY (interviewerId) REFERENCES interviewers(id)
);
`)

export const createApplicant = db.prepare(`
INSERT INTO applicants (name, email) VALUES (?, ?);
`)

export const createInterviewer = db.prepare(`
INSERT INTO interviewers (name, email) VALUES (?, ?);
`)

export const createInterview = db.prepare(`
INSERT INTO interviews (applicantId, interviewerId, date, score)
VALUES (?, ? ,?, ?);
`)

for (const applicant of applicants) {
  createApplicant.run(applicant.name, applicant.email)
}

for (const interviewer of interviewers) {
  createInterviewer.run(interviewer.name, interviewer.email)
}

for (const interview of interviews) {
  createInterview.run(interview.applicantId, interview.interviewerId, interview.date, interview.score)
}