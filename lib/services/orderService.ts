import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateOrderInput {
  userId: string;
  tourId: string;
  fullName: string;
  phone: string;
  guestSize: number;
  bookAt: Date;
}

export class OrderService {
  static async createOrder(data: CreateOrderInput) {
    try {
      // Get tour details to calculate total price
      const tour = await prisma.tour.findUnique({
        where: { id: data.tourId },
      });

      if (!tour) {
        throw new Error("Tour not found");
      }

      const totalPrice = tour.price * data.guestSize;

      // Create order
      const order = await prisma.order.create({
        data: {
          userId: data.userId,
          tourId: data.tourId,
          fullName: data.fullName,
          phone: data.phone,
          guestSize: data.guestSize,
          bookAt: data.bookAt,
          totalPrice: totalPrice,
          status: "PENDING",
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          tour: {
            select: {
              id: true,
              title: true,
              price: true,
              photo: true,
            },
          },
        },
      });

      return order;
    } catch (error) {
      throw error;
    }
  }

  static async getUserOrders(userId: string) {
    try {
      const orders = await prisma.order.findMany({
        where: { userId },
        include: {
          tour: {
            select: {
              id: true,
              title: true,
              price: true,
              photo: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return orders;
    } catch (error) {
      throw error;
    }
  }

  static async getAllOrders() {
    try {
      const orders = await prisma.order.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          tour: {
            select: {
              id: true,
              title: true,
              price: true,
              photo: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return orders;
    } catch (error) {
      throw error;
    }
  }

  static async getOrderById(orderId: string) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          tour: {
            select: {
              id: true,
              title: true,
              price: true,
              photo: true,
              description: true,
            },
          },
        },
      });

      return order;
    } catch (error) {
      throw error;
    }
  }

  static async updateOrderStatus(
    orderId: string,
    status: "PENDING" | "CONFIRMED" | "CANCELLED"
  ) {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          tour: {
            select: {
              id: true,
              title: true,
              price: true,
              photo: true,
            },
          },
        },
      });

      return order;
    } catch (error) {
      throw error;
    }
  }
}
