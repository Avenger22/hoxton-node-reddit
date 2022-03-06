import {
getAllPostUpvotes,
getPostUpvoteById,
updatePostUpvote,
deletePostUpvote
} from "../models/postUpvotesModel"

import {createPostUpvotes} from "../models/insertQuerysModel"

export const postUpvotesController = {

  allPostUpvotesGet: (req: any, res: any) => {

      const postUpvotes = getAllPostUpvotes.all();
      res.send(postUpvotes);
    
  },
    
  individualPostUpvotesGet: (req: any, res: any) => {
    
      const id = req.params.id;
      const postUpvote = getPostUpvoteById.get(id);
    
      if (postUpvote) {
        res.send(postUpvote);
      }
    
      else {
        res.send({"error": "undefined"})
      }
    
  },
    
  postUpvotesPost: (req: any, res: any) => {
    
      const { userId, postId } = req.body
      const info = createPostUpvotes(req.body)
    
      // const errors = []
    
      // if (typeof name !== 'string') errors.push()
    
      if (info.changes > 0) {
        const postUpvote = getPostUpvoteById.get(info.lastInsertRowid)
        res.send( postUpvote)
      } 
      
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  },
    
  individualPostUpvotesDelete: (req: any, res: any) => {
    
      const id = req.params.id
      const info = deletePostUpvote.run(id)
    
      if (info.changes === 0) {
        res.status(404).send({ error: 'postUpvote not found.' })
      } 
      
      else {
        res.send({ message: 'postUpvote deleted.' })
      }
    
  },
    
  postUpvotesPatch: (req: any, res: any) => {
    
      const id = req.params.id;
      const { userId, postId } = req.body
    
      const info = updatePostUpvote.run(userId, postId)
      const updatedPostUpvote = getPostUpvoteById.get(Number(id))
    
      if (info.changes > 0) {
        res.send(updatedPostUpvote)
      }
    
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  }

}