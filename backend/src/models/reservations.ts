import mongoose from "mongoose";

export type Reservation = {
    id: string;
    bookid: string;
    userid: string;
    reserved_at: string;
    due: string;
    past_due: number;
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
    reserved_at: {
        type: String,
        required: true,
    },
    due: {
        type: String,
        required: true,
    },
    past_due: {
        type: Number,
        required: true,
    }
})

export const ReservationModel = mongoose.model<Reservation>("Reservation", ReservationSchema);