import express from 'express'
import { loginCont, regCont ,testCont } from '../Controller/authController.js';
import {logInMiddle , isAdmin} from '../Middleware/authMiddle.js'
const router = express.Router();

router.post('/register',regCont)
router.post('/login',loginCont)


//test middleware
router.get('/test',logInMiddle,isAdmin ,testCont)


export default router;