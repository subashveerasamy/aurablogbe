import express from 'express';
import { getUserByToken, userLogin, userRegister } from '../Controllers/User.controller.js';

const router= express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/getuser", getUserByToken);
export default router;