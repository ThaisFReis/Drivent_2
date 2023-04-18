import { prisma } from "@/config"
import { Payment, TicketStatus } from "@prisma/client"

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

// Update Ticket
async function updateTicket(ticketId: number, payment: Payment){
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    }
  })
}



export type CreatePaymentParams = Omit<Payment, "id" | "createdAt" | "updatedAt">

const paymentRepository = {
    createPayment,
    findPaymentById,
    updateTicket,
}

export default paymentRepository