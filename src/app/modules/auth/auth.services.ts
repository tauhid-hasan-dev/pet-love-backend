import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

import {
    ILoginUser,
} from './auth.interface';
import prisma from '../../../shared/prisma';
import { AuthUtils } from './auth.utils';
import { hashedPassword } from '../../../helpers/hashPasswordHelper';
import { sendEmail } from './sendResetMail';


const loginUser = async (payload: ILoginUser)=> {
      console.log(payload);
};


export const AuthService = {
    loginUser,
};