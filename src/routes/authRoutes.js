import {Router} from 'express';
import {celebrate} from "celebrate";
import { registerUserSchema, loginUserSchema } from '../validations/authValidation.js';
import { registerUser, loginUser, logoutUser, refreshUserSession } from '../controllers/authController.js';

export const authRoutes = Router ();

authRoutes.post ('/auth/register', celebrate(registerUserSchema), registerUser);
authRoutes.post ('/auth/login', celebrate(loginUserSchema), loginUser);
authRoutes.post ('/auth/logout', logoutUser);
authRoutes.post ('/auth/refresh', refreshUserSession);
