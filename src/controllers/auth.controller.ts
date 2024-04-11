import { Request, Response } from 'express';
import { UserModel } from '../models/users.model';
import { bcryptAdapter } from '../config/bcrypt.adapter';
import { handleError, handleSuccess } from '../config/handleReponses';
import { generateToken, validateToken } from '../config/jwt.adapter';

export const Register = async(req: Request, res: Response) => {
  try {
    const user = await UserModel.create(req.body);

    user.password = bcryptAdapter.hash( req.body.password );
    await user.save();

    return handleSuccess({code: 200, message: 'User created', res, data: user});
  } catch (error) {
    return handleError({ code: 500, message: 'Something went wrong', res });
  }
}

export const login = async( req: Request, res: Response ) => {
  const { username, password } = req.body;

  try {

    const user = await UserModel.findOne({ username });
    if ( !user ) return handleError({ code: 404, message: 'This username not exist', res });

    const isMatch = bcryptAdapter.compare(password, user!.password);
    if( !isMatch ) return handleError({ code: 401, message: 'Wrong Credentials', res });

    const token = await generateToken({ id: user!.id });
    if ( !token ) return handleError({ code: 500, message: 'Error while creating JWT', res });

    return handleSuccess({ code: 200, message: 'Authenticated successfully', res, data: {user, token} });
    
  } catch (error) {
    return handleError({ code: 500, message: 'Something went wrong', res });
  }
}

export const validateAuth = async(req: Request, res: Response) => {
  const token = req.params.token
  
  const payload = await validateToken(token);
  if(!payload) return handleError({ code: 401, message: 'User is not authenticated', res });

  const user = await UserModel.findById(payload.id);

  if(user) return handleSuccess({ code: 200, message: 'Is authenticated', res, data: {user, token} })

  return handleError({ code: 401, message: 'User is not authenticated', res });
}