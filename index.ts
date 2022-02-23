// #region "importing and cofig stuff"
import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
import {createApplicant, createInterview, createInterviewer} from "./setup"

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database("./data.db", {
  verbose: console.log,
});
// #endregion

// #region "Sql queries"
// const getInterviewsFromApplicant = db.prepare(`
// SELECT interviews.*, interviewers.name as 'interviewerName', interviewers.email as 'interviewerEmail' FROM interviews
// JOIN interviewers ON interviews.interviewerId = interviewers.id
// WHERE interviews.applicantId = ?;
// `)

const getAllApplicants = db.prepare(`
SELECT applicants.* FROM applicants;
`);

const getApplicantById = db.prepare(`
SELECT * FROM applicants WHERE id = ?
`);

const getAllInterviewers = db.prepare(`
SELECT interviewers.* FROM interviewers;
`);

const getInterviewerById = db.prepare(`
SELECT * FROM interviewers WHERE id = ?
`);

const getAllinterviews = db.prepare(`
SELECT * FROM interviews;
`);

const getInterviewById = db.prepare(`
SELECT * FROM interviews WHERE id = ?
`);

const getApplicantByinterviewerId = db.prepare(`SELECT DISTINCT applicants.*, interviews.date, interviews.score FROM applicants
JOIN interviews ON applicants.id = interviews.applicantId
WHERE interviews.interviewerId = ?;`)

const getInterviewerByApplicantId = db.prepare(`SELECT DISTINCT interviewers.*, interviews.date, interviews.score FROM interviewers
JOIN interviews ON interviewers.id = interviews.interviewerId
WHERE interviews.applicantId = ?;`) // if i want to remove duplicates just remove .date and .score and that new date with same entry will be removed

const deleteApplicant = db.prepare(`
DELETE FROM applicants WHERE id = ?;
`)

const deleteInterviewer = db.prepare(`
DELETE FROM interviewers WHERE id = ?;
`)

const deleteInterview = db.prepare(`
DELETE FROM interviews WHERE id = ?;
`)

// const deleteApplicantInterviews = db.prepare(`
// DELETE FROM interviews WHERE applicantId = ?;
// `)

// const deleteInterviewerInterviews = db.prepare(`
// DELETE FROM interviews WHERE interviewerId = ?;
// `)

const updateApplicant = db.prepare(`
UPDATE applicants SET name = ?, email = ?;
`)

const updateInterviewer = db.prepare(`
UPDATE interviewers SET name = ?, email = ?;
`)

const updateInterview = db.prepare(`
UPDATE interviews SET applicantId = ?, interviewerId = ?, date = ?, score = ?;
`)

const deleteAllInterviewsForApplicant = db.prepare(`
DELETE FROM interviews WHERE applicantId = ?;
`)

const deleteAllInterviewsForInterviewer = db.prepare(`
DELETE FROM interviews WHERE interviewerId = ?;
`)
// #endregion

// #region 'End points API'

// #region 'APPLICANTS end points'
app.get("/applicants", (req, res) => {

  const applicants = getAllApplicants.all();

  for (const applicant of applicants) {

    const interviewer = getInterviewerByApplicantId.all(applicant.id)
    applicant.interviewers = interviewer;

  }

  res.send(applicants);

});

app.get("/applicants/:id", (req, res) => {

  const id = req.params.id;
  const applicant = getApplicantById.get(id);
  
  if (applicant) {

    const interviewer = getInterviewerByApplicantId.all(applicant.id)
    applicant.interviewer = interviewer;

    res.send(applicant);

  }

  else {
    res.send({"error": "undefined"})
  }

});

app.post('/applicants', (req, res) => {

  // creating an museum is still the same as last week
  const { name, email } = req.body
  const info = createApplicant.run(name, email)

  // const errors = []

  // if (typeof name !== 'string') errors.push()

  if (info.changes > 0) {
    const applicant = getApplicantById.get(info.lastInsertRowid)
    res.send(applicant)
  } 
  
  else {
    res.send({ error: 'Something went wrong.' })
  }

})

app.delete('/applicants/:id', (req, res) => {

  const id = req.params.id
  deleteAllInterviewsForApplicant.run(id)
  const info = deleteApplicant.run(id)

  if (info.changes === 0) {
    res.status(404).send({ error: 'applicant not found.' })
  } 
  
  else {
    res.send({ message: 'applicant deleted.' })
  }

})

app.patch('/applicants/:id', (req, res) => {

  const id = req.params.id;
  const { name, email } = req.body

  const info = updateApplicant.run(name, email)
  const updatedApplicant = getApplicantById.get(Number(id))

  if (info.changes > 0) {
    res.send(updatedApplicant)
  }

  else {
    res.send({ error: 'Something went wrong.' })
  }

})
// #endregion

// #region 'INTERVIEWERS end points'
app.get("/interviewers", (req, res) => {

  const interviewers = getAllInterviewers.all();

  for (const interviewer of interviewers) {

    const applicants = getApplicantByinterviewerId.all(interviewer.id)
    interviewer.applicants = applicants;

  }

  res.send(interviewers);

});

app.get("/interviewers/:id", (req, res) => {

  const id = req.params.id;
  const interviewer = getInterviewerById.get(id);

  if (interviewer) {

    const applicants = getApplicantByinterviewerId.all(interviewer.id)
    interviewer.applicants = applicants;

    res.send(interviewer);

  }

  else {
    res.send({"error": "undefined"})
  }

});

app.post('/interviewers', (req, res) => {

  const { name, email } = req.body
  const info = createInterviewer.run(name, email)

  // const errors = []

  // if (typeof name !== 'string') errors.push()

  if (info.changes > 0) {
    const interviewer = getInterviewerById.get(info.lastInsertRowid)
    res.send(interviewer)
  } 
  
  else {
    res.send({ error: 'Something went wrong.' })
  }

})

app.delete('/interviewers/:id', (req, res) => {

  const id = req.params.id
  deleteAllInterviewsForInterviewer.run(id)
  const interviews = getAllinterviews.all()

  for (const interview of interviews) {

    if (interview.interviewerId === id) {
      console.log("interview deleting id :", interview)
      deleteInterview.run(interview.id)
    }

  }

  const info = deleteInterviewer.run(id)

  if (info.changes === 0) {
    res.status(404).send({ error: 'interviewer not found.' })
  } 
  
  else {
    res.send({ message: 'interviewer deleted.' })
  }

})

app.patch('/interviewers/:id', (req, res) => {

  const id = req.params.id;
  const { name, email } = req.body

  const info = updateInterview.run(name, email)
  const updatedInterviewer = getInterviewerById.get(Number(id))

  if (info.changes > 0) {
    res.send(updatedInterviewer)
  }

  else {
    res.send({ error: 'Something went wrong.' })
  }

})
// #endregion

// #region 'INTERVIEWS end points'
app.get("/interviews", (req, res) => {

  const interviews = getAllinterviews.all();
  res.send(interviews);

});

app.get("/interviews/:id", (req, res) => {

    const id = req.params.id;
    const interview = getInterviewById.get(id);

    if (interview) {
      res.send(interview);
    }

    else {
      res.send({"error": "undefined"})
    }

});

app.post('/interviews', (req, res) => {

  // creating an museum is still the same as last week
  const { applicantId, interviewerId, date, score } = req.body
  const info = createInterview.run(applicantId, interviewerId, date, score)

  // const errors = []

  // if (typeof name !== 'string') errors.push()

  if (info.changes > 0) {
    const interview = getInterviewById.get(info.lastInsertRowid)
    res.send(interview)
  } 
  
  else {
    res.send({ error: 'Something went wrong.' })
  }

})

app.delete('/interviews/:id', (req, res) => {

  const id = req.params.id
  const info = deleteInterview.run(id)

  if (info.changes === 0) {
    res.status(404).send({ error: 'interview not found.' })
  } 
  
  else {
    res.send({ message: 'interview deleted.' })
  }

})

app.patch('/interviews/:id', (req, res) => {

  const id = req.params.id;
  const { applicantId, interviewerId, date, score } = req.body

  const info = updateInterview.run(applicantId, interviewerId, date, score)
  const updatedInterview = getInterviewById.get(Number(id))

  if (info.changes > 0) {
    res.send(updatedInterview)
  }

  else {
    res.send({ error: 'Something went wrong.' })
  }

})
// #endregion

// #endregion

app.listen(4000, () => console.log(`Listening on: http://localhost:4000`));