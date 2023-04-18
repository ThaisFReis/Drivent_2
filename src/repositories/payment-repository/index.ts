import { prisma } from "@/config"
import { Payment } from "@prisma/client"

// Create Payment
async function createPayment(payment: CreatePaymentParams, ticketId: number): Promise<Payment> {
  return prisma.payment.create({
    data: {
      ticketId,
        ...payment,
    }
  })
}

// Find Payment by ID
async function findPaymentById(ticketId: number){
  return prisma.payment.findFirst({
    where: {
      ticketId,
    }
  })
}

export type CreatePaymentParams = Omit<Payment, "id" | "createdAt" | "updatedAt">

const paymentRepository = {
    createPayment,
    findPaymentById,
}

export default paymentRepository