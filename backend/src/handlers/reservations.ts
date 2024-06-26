import { Request, Response } from "express";
import { Reservation, ReservationModel } from "../models/reservations";

export const createReservation = async(req: Request, res: Response) => {
    const { userid, bookid } = req.body;
    const reservation: Reservation = {
        id: Math.random().toString(36).substring(2, 2 + 10),
        userid: userid,
        bookid: bookid,
        reserved_at: new Date().toISOString(),
        // due: new Date(Date.now() + 20000).toISOString(),
        due: new Date(Date.now() + 12096e5).toISOString(),
        past_due: 0
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
