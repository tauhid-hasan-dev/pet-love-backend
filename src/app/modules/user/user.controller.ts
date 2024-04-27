import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { UserServices } from './user.services';


const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUser(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully!',
    data: result,
  });
});

export const UserController = {
  createUser,
};
