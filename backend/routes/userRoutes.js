import express from 'express'
import { checkAuth, login, signup } from '../controllers/userController.js';
import protectRoute from '../middlewares/protectRoute.js';

const authRouter = express.Router();

authRouter.post('/signup',signup)
authRouter.post('/login',login)
authRouter.get("/checkAuth",protectRoute,checkAuth)


export default authRouter;