import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import config from "../../config/config";

const registerUserDB = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload.password, 12);

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  const { password, ...userData } = result;
  return userData;
};

const loginUser = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new Error("user not found!");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new Error("Incorrect Password");
  }

  const secret = (config.jwt_access_secret || "dev-access-secret") as string;
  const expiresIn = (config.jwt_expires_in || "1d") as string;

  const accessToken = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    secret,
    {
      expiresIn,
    } as jwt.SignOptions,
  );
  const { password, ...userData } = user;
  return { user: userData, accessToken };
};

export const AuthService ={
    registerUserDB,
    loginUser,
}
