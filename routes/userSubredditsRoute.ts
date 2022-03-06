import {userSubredditsController} from "../controllers/userSubredditsController"
import { Router } from 'express';

const router = Router()

router.patch('/:id', userSubredditsController.userSubredditPatch)
router.post('/', userSubredditsController.userSubredditPost)
router.get('/', userSubredditsController.allUserSubredditsGet)
router.get('/:id', userSubredditsController.individualUserSubredditGet)
router.delete('/:id', userSubredditsController.individualUserSubredditDelete)

export default router