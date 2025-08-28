import express from 'express';
import  upload  from '../middlewares/multer.js';
import { login, register } from '../controllers/user.controller.js';
const router=express.Router();
router.post('/register',upload.single("image"),register);
router.post('/login',login);

export default router;

