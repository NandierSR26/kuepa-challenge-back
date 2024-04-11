import { Request, Response } from "express"
import { ChatModel } from "../models/chat.model";
import { handleError, handleSuccess } from "../config/handleReponses";
import { Document } from "mongoose";

export const getChat = async (req: Request, res: Response) => {

  const meID = req.user?.id;
  const from = req.params.id;

  try {
    const messages = await ChatModel.find({
      $or: [
        { from: meID, to: from },
        { from: from, to: meID }
      ]
    }).sort({createdAt: 'asc'});
  
    return handleSuccess({ code: 200, message: 'Chat loaded', res, data: messages })
  } catch (error) {
    return handleError({ code: 500, message: 'Something went wrong', res });
  }
}

export const recordMessage = async( payload: Document ) => {
  try {
      const mensaje = new ChatModel(payload);
      await mensaje.save();

      return mensaje
  } catch (error) {
      console.log(error);
      return false
  }
}