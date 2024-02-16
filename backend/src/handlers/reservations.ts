import { Request, Response } from "express";
import { Reservation, ReservationModel } from "../models/reservations";

const reservations: Reservation[] = [
    {id: "1", userId: "1", bookId: "1", status: "reserved", reservedAt: "2021-01-01"},
    {id: "2", userId: "2", bookId: "2", status: "active", reservedAt: "2021-01-02"},
    {id: "3", userId: "3", bookId: "3", status: "returned", reservedAt: "2021-01-03"},
    {id: "4", userId: "4", bookId: "4", status: "reserved", reservedAt: "2021-01-04"},
    {id: "5", userId: "5", bookId: "5", status: "active", reservedAt: "2021-01-05"},
]

export const createReservation = async(req: Request, res: Response) => {
    const { userId, bookId } = req.body;
    const reservation: Reservation = {
        id: Math.random().toString(36).substring(2, 2 + 10),
        userId: userId,
        bookId: bookId,
        status: 'reserved',
        reservedAt: new Date().toISOString().split('T')[0]
    };
    if(!reservation){
        throw new Error("Reservation failed");
    }
    const newReservation = new ReservationModel(reservation)
    await newReservation.save().then((reservation) => {
        console.log("Reservation created:", reservation);
    }).catch((err) => {
        console.log(err)
    });

    return res.json({message: "Created reservation"});
}

export const getAllReservations = async(req: Request, res: Response) => {
    const data = await ReservationModel.find();
    if(!data){
        throw new Error("No reservations found");
    }

    return res.status(200).json(data);
}

export const getReservationById = async(req: Request, res: Response) => {
    const id = req.params.id;
    const reservation = await ReservationModel.findOne({ id: id })

    if (!reservation) {
        return res.status(404).json({ error: "Reservation not found" });
    }

    return res.status(200).json(reservation);
};

export const getUserReservedBooks = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const userReservations = await ReservationModel.find({ userId: userId });
        return res.status(200).json(userReservations);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}