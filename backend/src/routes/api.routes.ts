import express from 'express';
import cors from 'cors';
import {
  helloController,
  registrationController,
  loginController,
} from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.post('/registration', registrationController.post);
router.post('/login', loginController.post);

export default router;
