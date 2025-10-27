import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  static async getAllUsers() {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          orders: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          orders: {
            select: {
              id: true,
              tour: {
                select: {
                  title: true,
                },
              },
              status: true,
              totalPrice: true,
              createdAt: true,
            },
          },
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async updateUserRole(userId: string, role: "USER" | "ADMIN") {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { role },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
