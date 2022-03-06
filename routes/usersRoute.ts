import {usersController} from "../controllers/usersController"
import { Router } from 'express';

const router = Router()

router.patch('/:id', usersController.userPatch)
router.post('/', usersController.userPost)
router.get('/', usersController.allUsersGet)
router.get('/:id', usersController.individualUserGet)
router.delete('/:id', usersController.individualUserDelete)

export default router