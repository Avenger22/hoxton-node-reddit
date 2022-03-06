import {commentUpvotesController} from "../controllers/commentUpvotesController"
import { Router } from 'express';

const router = Router()

router.patch('/:id', commentUpvotesController.commentUpvotesPatch)
router.post('/', commentUpvotesController.commentUpvotesPost)
router.get('/', commentUpvotesController.allCommentUpvotesGet)
router.get('/:id', commentUpvotesController.individualCommentUpvotesGet)
router.delete('/:id', commentUpvotesController.individualCommentUpvotesDelete)

export default router