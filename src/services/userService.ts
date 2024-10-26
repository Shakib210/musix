import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const isUserExitService = async (payload: any) => {
  const searchQuery = {
    OR: [{ userAccount: payload.userAccount }, { email: payload.email }],
  };

  const user = await prisma.user.findMany({
    where: { ...searchQuery, deletedAt: null },
  });

  return user;
};

export const createUserService = async (payload: any) => {
  const result = await prisma.user.create({
    data: payload,
  });
  return result;
};

export const getUsersService = async () => {
  const products = await prisma.user.findMany({
    where: { deletedAt: null }, // Avoid soft deleted entries
  });

  return products;
};
