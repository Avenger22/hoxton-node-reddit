// #region "importing and cofig stuff"
import express from "express";
import cors from "cors";
import {db} from "./dbConfig"

import commentDownvotesRoute from "./routes/commentDownvotesRoute"
import commentUpvotesRoute from "./routes/commentUpvotesRoute"
import postDownvotesRoute from "./routes/postDownvotesRoute"
import postUpvotesRoute from "./routes/postUpvotesRoute"
import commentsRoute from "./routes/commentsRoute"
import postsRoute from "./routes/postsRoute"
import loginsRoute from "./routes/loginsRoute"
import usersRoute from "./routes/usersRoute"
import subredditsRoute from "./routes/subredditsRoute"
import userSubredditsRoute from "./routes/userSubredditsRoute"
// #endregion

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', usersRoute);
app.use('/logins', loginsRoute);
app.use('/subreddits', subredditsRoute);
app.use('/userSubreddits', userSubredditsRoute);
app.use('/comments', commentsRoute);
app.use('/posts', postsRoute);
app.use('/postUpvotes', postUpvotesRoute);
app.use('/postDownvotes', postDownvotesRoute);
app.use('/commentUpvotes', commentUpvotesRoute);
app.use('/commentDownvotes', commentDownvotesRoute);

app.listen(4000, () => console.log(`Listening on: http://localhost:4000`));