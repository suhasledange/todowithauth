import express from 'express'
import { createTodo } from '../controllers/todoController.js'
import protectRoute from '../middlewares/protectRoute.js'

const todoRouter = express.Router()

todoRouter.get('/createTodo',protectRoute,createTodo)


export default todoRouter