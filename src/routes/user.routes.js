import express from 'express'
import {signUp,login,logout} from '../controllers/user.controller.js'

const router = express.Router()

router.post("/signup",signUp)
router.post("/signin",login)
router.post("/logout",logout)

export default  router;