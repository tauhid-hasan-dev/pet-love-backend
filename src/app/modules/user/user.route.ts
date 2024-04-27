import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { UserValidation } from './user.validations';
import multer from 'multer';
import { fileUploader } from '../../../helpers/fileUploader';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/register',
 /*  validateRequest(UserValidation.createUser), */
  UserController.createUser
);


export const userRoutes = router;
