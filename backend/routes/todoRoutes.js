import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { createTodo } from '../controllers/todoController.js'

const todoRouter = express.Router()

todoRouter.get('/createTodo',authMiddleware,createTodo)


export default todoRouter