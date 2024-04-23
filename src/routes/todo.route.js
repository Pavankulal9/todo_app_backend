import { Router } from "express";
import { addUserTodos, getSingleUserTodo, getUserTodos, removeUserTodo, updateUserTodo } from "../controller/todo.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
const router = Router();

router.route('/add').post(verifyJWT,addUserTodos);
router.route('/getTodos').get(verifyJWT,getUserTodos);
router.route('/:todoId').get(verifyJWT,getSingleUserTodo);
router.route('/update').patch(verifyJWT,updateUserTodo);
router.route('/:todoId').delete(verifyJWT,removeUserTodo);

export default router;