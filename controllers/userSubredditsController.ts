import {
getAllUserSubreddits,
getUserSubredditById,
updateUserSubreddit,
deleteUserSubreddit
} from "../models/userSubredditsModel"

import {createUserSubreddit} from "../models/insertQuerysModel"

export const userSubredditsController = {

  allUserSubredditsGet: (req: any, res: any) => {

      const userSubreddits = getAllUserSubreddits.all();
      res.send(userSubreddits);
    
  },
    
  individualUserSubredditGet: (req: any, res: any) => {
    
      const id = req.params.id;
      const userSubreddit = getUserSubredditById.get(id);
    
      if (userSubreddit) {
        res.send(userSubreddit);
      }
    
      else {
        res.send({"error": "undefined"})
      }
    
  },
    
  userSubredditPost: (req: any, res: any) => {
    
      const { userId, subbreditId } = req.body
      const info = createUserSubreddit(req.body)
    
      // const errors = []
    
      // if (typeof name !== 'string') errors.push()
    
      if (info.changes > 0) {
        const userSubreddit = getUserSubredditById.get(info.lastInsertRowid)
        res.send(userSubreddit)
      } 
      
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  },
    
  individualUserSubredditDelete: (req: any, res: any) => {
    
      const id = req.params.id
      const info = deleteUserSubreddit.run(id)
    
      if (info.changes === 0) {
        res.status(404).send({ error: 'userSubreddit not found.' })
      } 
      
      else {
        res.send({ message: 'userSubreddit deleted.' })
      }
    
  },
    
  userSubredditPatch: (req: any, res: any) => {
    
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
    
  }

}