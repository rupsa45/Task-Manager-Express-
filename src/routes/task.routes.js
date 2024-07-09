import express from  'express'
import { createTask,updateTask,deleteTask,getAllTask,getTask,completedTask,incompletedTask } from '../controllers/task.controllers.js'
import authentication from '../middlewares/auth.middleware.js'

const router = express.Router()


router
.route("/")
.get(authentication,getAllTask)
.post(authentication,createTask)



router
.route("/:id")
.get(authentication,getTask)
.put(authentication,updateTask)
.delete(authentication,deleteTask)

router.get("/completed",authentication,completedTask);
router.get("/incomplete",authentication,incompletedTask);

export default router;