import {
getAllCommentUpvotes,
getCommentUpvoteById,
updateCommentUpvote,
deleteCommentUpvote
} from "../models/commentUpvotesModel"

import {createCommentUpvotes} from "../models/insertQuerysModel"

export const commentUpvotesController = {

  allCommentUpvotesGet: (req: any, res: any) => {

      const commentUpvotes = getAllCommentUpvotes.all();
      res.send(commentUpvotes);
    
  },
    
  individualCommentUpvotesGet: (req: any, res: any) => {
    
      const id = req.params.id;
      const commentUpvote = getCommentUpvoteById.get(id);
    
      if (commentUpvote) {
        res.send(commentUpvote);
      }
    
      else {
        res.send({"error": "undefined"})
      }
    
  },
    
  commentUpvotesPost: (req: any, res: any) => {
    
      const { userId, commentId } = req.body
      const info = createCommentUpvotes(req.body)
    
      // const errors = []
    
      // if (typeof name !== 'string') errors.push()
    
      if (info.changes > 0) {
        const commentUpvote = getCommentUpvoteById.get(info.lastInsertRowid)
        res.send(commentUpvote)
      } 
      
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  },
    
  individualCommentUpvotesDelete: (req: any, res: any) => {
    
      const id = req.params.id
      const info = deleteCommentUpvote.run(id)
    
      if (info.changes === 0) {
        res.status(404).send({ error: 'commentUpvote not found.' })
      } 
      
      else {
        res.send({ message: 'commentUpvote deleted.' })
      }
    
  },
    
  commentUpvotesPatch: (req: any, res: any) => {
    
      const id = req.params.id;
      const { userId, commentId } = req.body
    
      const info = updateCommentUpvote.run(userId, commentId)
      const updatedCommentUpvote = getCommentUpvoteById.get(Number(id))
    
      if (info.changes > 0) {
        res.send(updatedCommentUpvote)
      }
    
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  }

}