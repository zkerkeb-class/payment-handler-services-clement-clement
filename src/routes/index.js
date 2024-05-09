import express from 'express';
import {processPayment} from '../controllers/payementController.js';

const router = express.Router();

router.post('/pay', processPayment);

export default router;
