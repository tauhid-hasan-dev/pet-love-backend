import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { PetServices } from "./pet.services";

const createPet = catchAsync(async (req: Request, res: Response) => {
  const result = await PetServices.createPet(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Pet added successfully",
    data: result,
  });
});

export const PetController = {
  createPet,
};
