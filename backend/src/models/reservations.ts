import mongoose from "mongoose";

export type Reservation = {
    id: string;
    bookid: string;
    userid: string;
    status: "reserved" | "active" | "returned";
    reserved_at: string;
}

const ReservationSchema = new mongoose.Schema<Reservation>({
    id: {
        type: String,
        required: true,
    },
    bookid: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    reserved_at: {
        type: String,
        required: true,
    },
})

export const ReservationModel = mongoose.model<Reservation>("Reservation", ReservationSchema);