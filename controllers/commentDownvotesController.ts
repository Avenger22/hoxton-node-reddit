import {
getAllCommentDownvotes,
getCommentDownvoteById,
updateCommentDownvote,
deleteCommentDownvote
} from "../models/commentDownvotesModel"

import { createCommentDownvotes } from "../models/insertQuerysModel";

export const commentDownvotesController = {

  allCommentDownvotesGet: (req: any, res: any) => {

      const commentDownvotes = getAllCommentDownvotes.all();
      res.send(commentDownvotes);
    
  },
    
  individualCommentDownvotesGet: (req: any, res: any) => {
    
      const id = req.params.id;
      const commentDownvote = getCommentDownvoteById.get(id);
    
      if (commentDownvote) {
        res.send(commentDownvote);
      }
    
      else {
        res.send({"error": "undefined"})
      }
    
  },
    
  commentDownvotesPost: (req: any, res: any) => {
    
      const { userId, commentId } = req.body
      const info = createCommentDownvotes(req.body)
    
      // const errors = []
    
      // if (typeof name !== 'string') errors.push()
    
      if (info.changes > 0) {
        const commentDownvote = getCommentDownvoteById.get(info.lastInsertRowid)
        res.send(commentDownvote)
      } 
      
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  },
    
  individualCommentDownvotesDelete: (req: any, res: any) => {
    
      const id = req.params.id
      const info = deleteCommentDownvote.run(id)
    
      if (info.changes === 0) {
        res.status(404).send({ error: 'commentDownvote not found.' })
      } 
      
      else {
        res.send({ message: 'commentDownvote deleted.' })
      }
    
  },
    
  commentDownvotesPatch: (req: any, res: any) => {
    
      const id = req.params.id;
      const { userId, commentId } = req.body
    
      const info = updateCommentDownvote.run(userId, commentId)
      const updatedCommentDownvote = getCommentDownvoteById.get(Number(id))
    
      if (info.changes > 0) {
        res.send(updatedCommentDownvote)
      }
    
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  }

}