import {commentDownvotesController} from "../controllers/commentDownvotesController"
import { Router } from 'express';

const router = Router()

router.patch('/:id', commentDownvotesController.commentDownvotesPatch)
router.post('/', commentDownvotesController.commentDownvotesPost)
router.get('/', commentDownvotesController.allCommentDownvotesGet)
router.get('/:id', commentDownvotesController.individualCommentDownvotesGet)
router.delete('/:id', commentDownvotesController.individualCommentDownvotesDelete)

export default router