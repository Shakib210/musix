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
  const users = await prisma.user.findMany({
    where: { deletedAt: null }, // Avoid soft deleted entries
    select: {
      firstName: true,
      lastName: true,
      dateOfBirth: true,
      email: true,
      gender: true,
      phoneNumber: true,
      userAccount: true,
    },
  });

  return users;
};

export const getUsersByEmailService = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { OR: [{ userAccount: email }, { email: email }], deletedAt: null },
  });

  return user;
};

export async function getUserPermissions(userId: number): Promise<string[]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      userRoles: {
        include: {
          role: {
            include: {
              rolePermissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const permissions = new Set<string>();

  user.userRoles.forEach((userRole) => {
    userRole.role.rolePermissions.forEach((rolePermission) => {
      permissions.add(rolePermission.permission.name);
    });
  });

  return Array.from(permissions);
}
