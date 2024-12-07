import express from 'express'

import {signin, signup} from '../controllers/user.js'

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'User route is working' });
  });
  

router.post('/signin', signin );
router.post('/signup',signup);

export default router;