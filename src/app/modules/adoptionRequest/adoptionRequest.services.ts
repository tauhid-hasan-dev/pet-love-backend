import { Request } from "express";
import prisma from "../../../shared/prisma";

import { Prisma } from "@prisma/client";
import { petSearchableFields } from "./adoptionRequest.constant";

const getAllFromDB = async () => {
  const result = await prisma.adoptionRequest.findMany();
  return {
    result,
  };
};

const createAdoptionRequest = async (req: Request) => {
  let requestData: Prisma.AdoptionRequestCreateInput | undefined;
  if (req.user !== null) {
    requestData = {
      userId: req.user.id,
      ...req.body,
    };
  }
  if (requestData) {
    const result = await prisma.adoptionRequest.create({
      data: requestData,
    });
    console.log({ result });
    return result;
  } else {
    throw new Error("User information is missing.");
  }
};

export const AdoptionRequestServices = {
  createAdoptionRequest,
  getAllFromDB,
};
