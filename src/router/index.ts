import Router from 'express';
import { profileController } from '../controllers';

const router = Router();

router.get('/profile', profileController.calculateProfile());

export { router };
