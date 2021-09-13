import express from 'express';
import cors from 'cors';
import { helloController, registrationController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.post('/registration', registrationController.post);

export default router;
