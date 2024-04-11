import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/users.model";
import { handleError, handleSuccess } from "../config/handleReponses";

export const validateUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    
    if(user) return handleError({ code: 401, message: 'This username already exist', res })

    next();
  } catch (error) {
    return handleError({ code: 500, message: 'Something went wrong', res });
  }
}