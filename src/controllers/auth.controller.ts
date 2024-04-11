import { Request, Response } from 'express';
import { UserModel } from '../models/users.model';

export const Register = async(req: Request, res: Response) => {
  try {
    const user = await UserModel.create(req.body);

    return res.json({
      user
    })
  } catch (error) {
    console.log(error)
  }
}