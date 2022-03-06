import {
getAllPostDownvotes,
getPostDownvoteById,
updatePostDownvote,
deletePostDownvote
} from "../models/postDownvotesModel"

import {createPostDownvotes} from "../models/insertQuerysModel"

export const postDownvotesController = {

  allPostDownvotesGet: (req: any, res: any) => {

      const postDownvotes = getAllPostDownvotes.all();
      res.send(postDownvotes);
    
  },
    
  individualPostDownvotesGet: (req: any, res: any) => {
    
      const id = req.params.id;
      const postDownvote = getPostDownvoteById.get(id);
    
      if (postDownvote) {
        res.send(postDownvote);
      }
    
      else {
        res.send({"error": "undefined"})
      }
    
  },
    
  postDownvotesPost: (req: any, res: any) => {
    
      const { userId, postId } = req.body
      const info = createPostDownvotes(req.body)
    
      // const errors = []
    
      // if (typeof name !== 'string') errors.push()
    
      if (info.changes > 0) {
        const postDownvote = getPostDownvoteById.get(info.lastInsertRowid)
        res.send(postDownvote)
      } 
      
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  },
    
  individualPostDownvotesDelete: (req: any, res: any) => {
    
      const id = req.params.id
      const info = deletePostDownvote.run(id)
    
      if (info.changes === 0) {
        res.status(404).send({ error: 'postDownvote not found.' })
      } 
      
      else {
        res.send({ message: 'postDownvote deleted.' })
      }
    
  },
    
  postDownvotesPatch: (req: any, res: any) => {
    
      const id = req.params.id;
      const { userId, postId } = req.body
    
      const info = updatePostDownvote.run(userId, postId)
      const updatedPostDownvote = getPostDownvoteById.get(Number(id))
    
      if (info.changes > 0) {
        res.send(updatedPostDownvote)
      }
    
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  }

}