import {
getAllusers,
getUserById,
updateUser,
deleteUser
} from "../models/usersModel"

import {createUser} from "../models/insertQuerysModel"

import {
  getSubredditsByUserId, 
  getPostsForUser, 
  getCommentsForUser,
  getLoginsForUser,
  getCommentsDownvotesByUserId,
  getCommentsUpvotesByUserId,
  getPostsDownvotesByUserId,
  getPostsUpvotesByUserId
} from "../models/relationshipModel"

export const usersController = {

  allUsersGet: (req: any, res: any) => {

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
    
  },
    
  individualUserGet: (req: any, res: any) => {
    
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
    
  },
    
  userPost: (req: any, res: any) => {
    
      const { 
        firstName, lastName, userName, gender, birthday, phoneNumber, email, isOnline
      } = req.body
    
      const info = createUser(req.body)
    
      // const errors = []
    
      // if (typeof name !== 'string') errors.push()
    
      if (info.changes > 0) {
        const user = getUserById.get(info.lastInsertRowid)
        res.send(user)
      } 
      
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  },
    
  individualUserDelete: (req: any, res: any) => {
    
      const id = req.params.id
      const info = deleteUser.run(id)
    
      if (info.changes === 0) {
        res.status(404).send({ error: 'user not found.' })
      } 
      
      else {
        res.send({ message: 'user deleted.' })
      }
    
  },
    
  userPatch: (req: any, res: any) => {
    
      const id = req.params.id;
      const { firstName, lastName, userName, gender, birthday, phoneNumber, email, isOnline } = req.body
    
      const info = updateUser.run(firstName, lastName, userName, gender, birthday, phoneNumber, email, isOnline)
      const updatedUser = getUserById.get(Number(id))
    
      if (info.changes > 0) {
        res.send(updatedUser)
      }
    
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  }

}