
import { Request } from 'express';


const createUser = async (req: Request) => {
  console.log(req.body);
  console.log("user service")
};

export const UserServices = {
    createUser,
};
