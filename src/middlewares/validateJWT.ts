import { NextFunction, Request, Response } from "express";
import { handleError } from "../config/handleReponses";
import { UserModel } from "../models/users.model";
import { validateToken } from "../config/jwt.adapter";

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return handleError({ code: 401, message: 'No token provided', res });
  if (!authorization.startsWith('Bearer ')) return handleError({ code: 401, message: 'Invalid Bearer token', res });

  const token = authorization.split(' ').at(1) || '';

  try {

    const payload = await validateToken(token);
    if (!payload) return handleError({ code: 401, message: 'Invalid token', res });

    const user = await UserModel.findById(payload.id);
    if (!user) return handleError({ code: 401, message: 'Invalid token - user', res });

    req.body.user = user;
    next();

  } catch (error) {
    return handleError({ code: 500, message: 'Something went wrong', res });
  }

}