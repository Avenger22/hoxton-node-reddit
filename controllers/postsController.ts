import {
getAllPosts,
getPostById,
updatePost,
deletePost
} from "../models/postsModel"

import {createPost} from "../models/insertQuerysModel"

import {getUserById} from "../models/usersModel"
import {getSubredditById} from "../models/subredditsModel"
import {getCommentsForPost, getUsersUpvotesByPostId, getUsersDownvotesByPostId} from "../models/relationshipModel"

export const postsController = {

  allPostsGet: (req: any, res: any) => {

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
    
  },
    
  individualPostGet: (req: any, res: any) => {
    
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
    
  },
    
  postPost: (req: any, res: any) => {
    
      // creating an museum is still the same as last week
      const { title, content, linksTo, status, pic, createdTime, userId, subredditId } = req.body
      const info = createPost(req.body)
    
      // const errors = []
    
      // if (typeof name !== 'string') errors.push()
    
      if (info.changes > 0) {
        const post = getPostById.get(info.lastInsertRowid)
        res.send(post)
      } 
      
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  },
    
  individualPostDelete: (req: any, res: any) => {
    
      const id = req.params.id
      const info = deletePost.run(id)
    
      if (info.changes === 0) {
        res.status(404).send({ error: 'post not found.' })
      } 
      
      else {
        res.send({ message: 'post deleted.' })
      }
    
  },
    
  postPatch: (req: any, res: any) => {
    
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
    
  }

}