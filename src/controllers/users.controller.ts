import { UserModel } from "../models/users.model";

export const connectUser = async (uid: string) => {
  const user = await UserModel.findById(uid);
  user!.online = true;
  await user!.save();

  return user
}

export const disconnectUser = async (uid: string) => {
  const user = await UserModel.findById(uid);
  user!.online = false;
  await user!.save();

  return user
}

export const getOnlineUsers = async () => {
  const users = await UserModel
    .find()
    .sort('-online')

  return users;
}