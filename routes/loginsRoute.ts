import {loginsController} from "../controllers/loginsController"
import { Router } from 'express';

const router = Router()

router.patch('/:id', loginsController.loginPatch)
router.post('/', loginsController.loginPost)
router.get('/', loginsController.allLoginsGet)
router.get('/:id', loginsController.individualLoginGet)
router.delete('/:id', loginsController.individualLoginDelete)

export default router