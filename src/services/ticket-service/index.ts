import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketStatus } from "@prisma/client";

// Create Ticket
export async function createTicket(ticketTypeId: number, userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if (!enrollment) {
        throw notFoundError();
    }
/*
    const ticket = await ticketRepository.createTicket({
        ticketTypeId,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED,
    });
*/

    const ticketData = {
        ticketTypeId,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED,
    };

    await ticketRepository.createTicket(ticketData);

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    
    return ticket;
}

// Get Ticket By User ID
export async function getTicketByUserId(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if (!enrollment) {
        throw notFoundError();
    }

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

    if (!ticket) {
        throw notFoundError();
    }

    return ticket;
}

// Get Ticket Types
export async function getTicketTypes() {
    const ticketTypes = await ticketRepository.findTicketTypes();

    if(!ticketTypes) {
        throw notFoundError();
    }

    return ticketTypes;
}

const ticketService = {
    createTicket,
    getTicketByUserId,
    getTicketTypes,
};

export default ticketService;