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
async function findTicketById(ticketId: number): Promise<Ticket> {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    }
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
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    }
  })
}

// Find Ticket With Type By Id
async function findTicketWithTicketTypeById(ticketId: number){
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    }
  })
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">

const ticketRepository = {
  createTicket,
  findTicketById,
  findTicketTypes,
  processTicketById,
  findTicketByEnrollmentId,
  findTicketWithTicketTypeById,
}

export default ticketRepository;