import { NextFunction, Request, Response } from "express";
import prisma from "../../../shared/prisma";

const createPet = async (req: Request) => {
  console.log(req.body)
  const result = await prisma.pet.create({
    data: req.body,
  });
  console.log(result);
  return result;
};

export const PetServices = {
  createPet,
};
