import {subredditsController} from "../controllers/subredditsController"
import { Router } from 'express';

const router = Router()

router.patch('/:id', subredditsController.subredditPatch)
router.post('/', subredditsController.subredditPost)
router.get('/', subredditsController.allSubredditsGet)
router.get('/:id', subredditsController.individualSubredditGet)
router.delete('/:id', subredditsController.individualSubredditDelete)

export default router