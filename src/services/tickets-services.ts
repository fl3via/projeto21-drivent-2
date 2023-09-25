import { enrollmentRepository } from '@/repositories';
import { Tickets } from '@/protocols';
import { ticketsRepository } from '@/repositories/tickets-repository';
import { TicketStatus } from '@prisma/client';
import { notFoundError } from '@/errors';

async function getTicketType() {
    const ticketTypes = await ticketsRepository.getTicketType();
    if (!ticketTypes) throw notFoundError();
    return ticketTypes;
}

async function getTicket(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();

    const result = await ticketsRepository.getTicket(enrollment.id);
    if (!result) throw notFoundError();

    return result;
}

async function postTicket(userId: number, ticketTypeId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();

    const data: Tickets = {
        ticketTypeId,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED,
    }

    await ticketsRepository.postTicket(data)

    return ticketsRepository.getTicket(enrollment.id);
}

export const ticketsServices = { getTicket, getTicketType, postTicket };
