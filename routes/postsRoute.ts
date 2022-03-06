import {postsController} from "../controllers/postsController"
import { Router } from 'express';

const router = Router()

router.patch('/:id', postsController.postPatch)
router.post('/', postsController.postPost)
router.get('/', postsController.allPostsGet)
router.get('/:id', postsController.individualPostGet)
router.delete('/:id', postsController.individualPostDelete)

export default router