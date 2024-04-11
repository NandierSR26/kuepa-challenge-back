import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/users.model";

export const validateUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    console.log({user})

    if(user) {
      return res.json({
        user,
        message: 'El usuario existe'
      })
    }

    next();
  } catch (error) {
    console.log(error)
  }
}