import { Request, Response } from 'express';
import { UserModel } from '../models/users.model';
import { bcryptAdapter } from '../config/bcrypt.adapter';
import { handleError, handleSuccess } from '../config/handleReponses';

export const Register = async(req: Request, res: Response) => {
  try {
    const user = await UserModel.create(req.body);

    user.password = bcryptAdapter.hash( req.body.password );
    await user.save();

    return handleSuccess({code: 200, message: 'User created', res, data: user})
  } catch (error) {
    return handleError({ code: 500, message: 'Something went wrong', res });
  }
}