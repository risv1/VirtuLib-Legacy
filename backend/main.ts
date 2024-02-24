import express from "express";
import bodyParser from "body-parser";
import bookRoutes from "./src/routes/book.routes";
import adminRoutes from "./src/routes/admin.routes";
import userRoutes from "./src/routes/user.routes";
import { connection } from "./src/database/conn";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./src/middlewares/cors";
import { checkDueReservations } from "./src/scripts/check-reservations";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

corsMiddleware(app)

// ejs views
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// check reservations
//const CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000;
const CHECK_INTERVAL_MS = 2000;
setInterval(checkDueReservations, CHECK_INTERVAL_MS);

connection
  .then(() => {
    app.get("/", (req, res) => {
      res.render("index.ejs", { title: "Library" });
    });
    app.use(bookRoutes);
    app.use(adminRoutes);
    app.use(userRoutes);

    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
