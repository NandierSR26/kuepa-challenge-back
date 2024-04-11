import { Request, Response } from 'express';
import { UserModel } from '../models/users.model';
import { bcryptAdapter } from '../config/bcrypt.adapter';

export const Register = async(req: Request, res: Response) => {
  try {
    const user = await UserModel.create(req.body);

    user.password = bcryptAdapter.hash( req.body.password );
    await user.save();

    return res.json({
      user
    })
  } catch (error) {
    console.log(error)
  }
}