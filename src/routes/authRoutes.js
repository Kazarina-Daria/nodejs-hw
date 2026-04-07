import {Router, celebrate} from 'express';
import { registerUserSchema, loginUserSchema } from '../validations/authValiodation';
import { registerUser, loginUser, logoutUser, refreshUserSession } from '../controllers/authController';

export const router = Router ();

router.post ('auth/register', celebrate(registerUserSchema), registerUser);
router.post ('auth/login', celebrate(loginUserSchema), loginUser);
router.post ('auth/logout', logoutUser);
router.post ('auth/refresh', refreshUserSession);
