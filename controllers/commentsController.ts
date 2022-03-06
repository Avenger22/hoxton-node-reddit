import {
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment
} from "../models/commentsModel"

import {
getUsersDownvotesByCommentId,
getUsersUpvotesByCommentId,
} from "../models/relationshipModel"

import {createComment} from "../models/insertQuerysModel"
import {getUserById} from "../models/usersModel"
import {getPostById} from "../models/postsModel"

export const commentsController = {

  allCommentsGet: (req: any, res: any) => {

      const comments = getAllComments.all();
    
      for (const comment of comments) {
    
        const user = getUserById.get(comment.userId);
        comment.user = user;
    
        const posts = getPostById.get(comment.postId);
        comment.post = posts;
    
        const usersUpvotes = getUsersUpvotesByCommentId.all(user.id)
        user.usersUpvotes = usersUpvotes;
    
        const usersDownvotes = getUsersDownvotesByCommentId.all(user.id)
        user.usersDownvotes = usersDownvotes;
    
      }
    
      res.send(comments);
    
  },
    
  individualCommentGet: (req: any, res: any) => {
    
        const id = req.params.id;
        const comment = getCommentById.get(id)
    
        if (comment) {
    
          const user = getUserById.get(comment.userId);
          comment.user = user;
    
          const posts = getPostById.get(comment.postId);
          comment.post = posts;
    
          res.send(comment);
    
        }
    
        else {
          res.send({"error": "undefined"})
        }
    
  },
    
  individualCommentDelete: (req: any, res: any) => {
    
      // creating an museum is still the same as last week
      const { content, dateCreated, userId, postId } = req.body
      const info = createComment(req.body)
    
      // const errors = []
    
      // if (typeof name !== 'string') errors.push()
    
      if (info.changes > 0) {
        const comment = getCommentById.get(info.lastInsertRowid)
        res.send(comment)
      } 
      
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  },
    
  commentPost: (req: any, res: any) => {
    
      const id = req.params.id
      const info = deleteComment.run(id)
    
      if (info.changes === 0) {
        res.status(404).send({ error: 'comment not found.' })
      } 
      
      else {
        res.send({ message: 'comment deleted.' })
      }
    
  },
    
  commentPatch: (req: any, res: any) => {
    
      const id = req.params.id;
      const { content, upVotes, downVotes, dateCreated, userId, postId } = req.body
    
      const info = updateComment.run(content, upVotes, downVotes, dateCreated, userId, postId)
      const updatedComment = getCommentById.get(Number(id))
    
      if (info.changes > 0) {
        res.send(updatedComment)
      }
    
      else {
        res.send({ error: 'Something went wrong.' })
      }
    
  }

}