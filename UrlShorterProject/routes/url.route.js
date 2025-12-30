import express from 'express';
import { authenticationMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/shortUrl', authenticationMiddleware, async (req,res)=>{

})


export default router;