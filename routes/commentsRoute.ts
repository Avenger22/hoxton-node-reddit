import {commentsController} from "../controllers/commentsController"
import { Router } from 'express';

const router = Router()

router.patch('/:id', commentsController.commentPatch)
router.post('/', commentsController.commentPost)
router.get('/', commentsController.allCommentsGet)
router.get('/:id', commentsController.individualCommentGet)
router.delete('/:id', commentsController.individualCommentDelete)

export default router