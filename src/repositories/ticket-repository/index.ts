import { prisma } from "@/config"
import { Ticket, TicketStatus } from "@prisma/client"

// Create Ticket
async function createTicket(ticket: CreateTicketParams): Promise<Ticket> {
  return prisma.ticket.create({
    data: {
        ...ticket,
    }
  })
}

// Find Ticket by ID
async function findTicketById(id: number): Promise<Ticket> {
  return prisma.ticket.findUnique({
    where: {
      id,
    },
  })
}

// Find Ticket Types
async function findTicketTypes(){
  return prisma.ticketType.findMany()
}

// Process Ticket by ID
async function processTicketById(id: number): Promise<Ticket> {
  return prisma.ticket.update({
    where: {
      id,
    },
    data: {
      status: TicketStatus.PAID,
    }
  });
}

// Find Ticket By Enrollment ID
async function findTicketByEnrollmentId(enrollmentId: number){
  return prisma.ticket.findMany({
    where: {
      enrollmentId,
    },
  })
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">

const ticketRepository = {
  createTicket,
  findTicketById,
  findTicketTypes,
  processTicketById,
  findTicketByEnrollmentId,
}

export default ticketRepository;