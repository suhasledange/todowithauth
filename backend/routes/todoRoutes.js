import express from 'express'
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controllers/todoController.js'
import protectRoute from '../middlewares/protectRoute.js'

const todoRouter = express.Router()

todoRouter.post('/createTodo',protectRoute,createTodo)
todoRouter.get('/getTodos',protectRoute,getTodos)
todoRouter.put('/updateTodo/:id',protectRoute,updateTodo)
todoRouter.delete('/deleteTodo/:id',protectRoute,deleteTodo)


export default todoRouter