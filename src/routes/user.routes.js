import express from 'express'
import {signUp,login,logout,getProfile} from '../controllers/user.controller.js'

const router = express.Router()

router.get("/",getProfile)
router.post("/signup",signUp)
router.post("/signin",login)
router.post("/logout",logout)

export default  router;