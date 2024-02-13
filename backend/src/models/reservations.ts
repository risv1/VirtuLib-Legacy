export type Reservation = {
    id: string;
    bookId: string;
    userId: string;
    status: "reserved" | "active" | "returned";
    reservedAt: string;
}