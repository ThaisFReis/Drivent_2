import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError, unauthorizedError } from "@/errors";

// Verify Ticket
export async function verifyTicket(ticketId: number) {
    const ticket = await ticketRepository.findTicketById(ticketId);

    if(!ticket) {
        throw notFoundError();
    }

    return true;
}

// Verify Enrollment
export async function verifyEnrollment(userId: number, enrollmentId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if(!enrollment) {
        throw unauthorizedError();
    }

    if(enrollment.userId !== userId) {
        throw unauthorizedError();
    }

    return true;
}

// Verify Payment
export async function verifyPayment(userId: number, ticketId: number) {
    await verifyTicket(ticketId);
    await verifyEnrollment(userId, ticketId);

    return true;
}

// Create Payment
export async function createPayment(userId: number, ticketId: number, paymentParams: CreatePaymentParams) {
    
    await verifyPayment(userId, ticketId);

    const ticket = await ticketRepository.findTicketWithTicketTypeById(ticketId);

    const data = {
        ticketId,
        value: ticket.TicketType.price,
        cardIssuer: paymentParams.issuer,
        cardLastDigits: paymentParams.number.toString().slice(-4), // To string has to be first then slice
    }

    const payment = await paymentRepository.createPayment(data, ticketId);

    return payment;
}

// Find Payment by Ticket ID
export async function findPaymentByTicketId(userId: number, ticketId: number) {
    await verifyPayment(userId, ticketId);

    const payment = await paymentRepository.findPaymentById(ticketId);

    if(!payment) {
        throw notFoundError();
    }

    return payment;
}

export type CreatePaymentParams = {
    number: number,
    issuer: string,
}

const paymentService = {
    createPayment,
    findPaymentByTicketId,
}

export default paymentService;