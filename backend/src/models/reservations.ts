import mongoose from "mongoose";

export type Reservation = {
    id: string;
    bookId: string;
    userId: string;
    status: "reserved" | "active" | "returned";
    reservedAt: string;
}

const ReservationSchema = new mongoose.Schema<Reservation>({
    id: {
        type: String,
        required: true,
    },
    bookId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    reservedAt: {
        type: String,
        required: true,
    },
})

export const ReservationModel = mongoose.model<Reservation>("Reservation", ReservationSchema);