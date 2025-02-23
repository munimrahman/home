import Provider from "../../../models/provider";
import { IUser } from "../../../models/user.model";

const db = Provider.getInstance();

const createUser = async ({
  name,
  email,
  phone,
  password,
}: {
  [key: string]: string;
}) => {
  const user = await db.User.create({ name, email, phone, password });
  return user;
};

// TODO: should add return type
// : Promise<{users: IUser[], usersCount: number;}>
const getAllUsers = async () => {
  const users = await db.User.find({});
  const usersCount = await db.User.countDocuments();
  return { users, usersCount };
};

const getUserById = async (id: string): Promise<IUser | null> => {
  const user = await db.User.findById(id);
  return user;
};

const updateUserById = async (id: string, updatedInfo: any) => {
  const data = await db.User.findByIdAndUpdate(id, updatedInfo, { new: true });
  return data;
};

const deleteUserById = async (id: string) => {
  const data = await db.User.deleteOne({ id });
  return data;
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
