import { Book, BookModel } from "../models/books";
import { Reservation, ReservationModel } from "../models/reservations";

export const checkDueReservations = async () => {
  const currentDate = new Date();
  const currentUTCDate = Date.UTC(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate()
  );

  const reservationsWithBooks = await ReservationModel.aggregate([
    {
      $lookup: {
        from: "books",
        localField: "bookid",
        foreignField: "id",
        as: "book"
      }
    },
    {
      $match: {
        "book.reserved": "active"
      }
    },
    {
      $unwind: "$book"
    }
  ]);
  console.log(reservationsWithBooks)

  reservationsWithBooks.forEach(async (reservationWithBook: any) => {
    const book: Book = reservationWithBook.book;
    const reservation: Reservation = reservationWithBook;
    const dueDate = new Date(reservation.due);
    const dueUTCDate = Date.UTC(
      dueDate.getUTCFullYear(),
      dueDate.getUTCMonth(),
      dueDate.getUTCDate()
    );
    if (dueUTCDate <= currentUTCDate) {
      const diffInTime = currentUTCDate - dueUTCDate;
      const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

      const newPastDue = reservation.past_due + 1;
      await ReservationModel.findOneAndUpdate(
        { id: reservation.id },
        { past_due: newPastDue }
      );

      const userEmail = reservation.userid;
      const message = `The due date for your reservation of '${book.title}' has been reached.`;
      console.log(`Email sent to ${userEmail}: ${message}`);
    }
  });
};
