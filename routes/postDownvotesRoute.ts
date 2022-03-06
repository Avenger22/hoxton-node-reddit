import {postDownvotesController} from "../controllers/postDownvotesController"
import { Router } from 'express';

const router = Router()

router.patch('/:id', postDownvotesController.postDownvotesPatch)
router.post('/', postDownvotesController.postDownvotesPost)
router.get('/', postDownvotesController.allPostDownvotesGet)
router.get('/:id', postDownvotesController.individualPostDownvotesGet)
router.delete('/:id', postDownvotesController.individualPostDownvotesDelete)

export default router