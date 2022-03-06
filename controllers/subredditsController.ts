import {
getAllSubreddits,
getSubredditById,
updateSubreddit,
deleteSubreddit
} from "../models/subredditsModel"

import {createSubreddit} from "../models/insertQuerysModel"
import {getUsersBySubredditId, getPostsForSubreddit} from "../models/relationshipModel"

export const subredditsController = {

  allSubredditsGet: (req: any, res: any) => {

      const subreddits = getAllSubreddits.all();
    
      for (const subreddit of subreddits) {
    
        const users = getUsersBySubredditId.all(subreddit.id)
        subreddit.users = users;
    
        const posts = getPostsForSubreddit.all(subreddit.id)
        subreddit.posts = posts;
    
      }
    
      res.send(subreddits);
    
  },
    
  individualSubredditGet: (req: any, res: any) => {
    
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
    
  },
    
  subredditPost: (req: any, res: any) => {
    
      // creating an museum is still the same as last week
      const { name, dateCreated } = req.body
      const info = createSubreddit(req.body)
    
      // const errors = []
    
      // if (typeof name !== 'string') errors.push()
    
      // @ts-ignore
      if (info.changes > 0) {
        //@ts-ignore
        const subreddits = getSubredditById.get(info.lastInsertRowid)
        res.send(subreddits)
      } 
      
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  },
    
  individualSubredditDelete: (req: any, res: any) => {
    
      const id = req.params.id
      const info = deleteSubreddit.run(id)
    
      if (info.changes === 0) {
        res.status(404).send({ error: 'Subreddit not found.' })
      } 
      
      else {
        res.send({ message: 'Subreddit deleted.' })
      }
    
  },
    
  subredditPatch: (req: any, res: any) => {
    
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
    
  }

}