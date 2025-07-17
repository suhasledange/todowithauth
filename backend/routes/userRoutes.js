import express from 'express'
import { checkAuth, login, logout, signup } from '../controllers/userController.js';
import protectRoute from '../middlewares/protectRoute.js';

const authRouter = express.Router();

authRouter.post('/signup',signup)
authRouter.post('/login',login)
authRouter.get('/logout',logout)
authRouter.get("/checkAuth",protectRoute,checkAuth)


export default authRouter;