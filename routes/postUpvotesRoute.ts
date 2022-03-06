import {postUpvotesController} from "../controllers/postUpvotesController"
import { Router } from 'express';

const router = Router()

router.patch('/:id', postUpvotesController.postUpvotesPatch)
router.post('/', postUpvotesController.postUpvotesPost)
router.get('/', postUpvotesController.allPostUpvotesGet)
router.get('/:id', postUpvotesController.individualPostUpvotesGet)
router.delete('/:id', postUpvotesController.individualPostUpvotesDelete)

export default router