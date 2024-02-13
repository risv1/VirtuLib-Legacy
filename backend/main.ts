import express from "express"
import bodyParser from "body-parser"
import bookRoutes from "./src/routes/book.routes"
import adminRoutes from "./src/routes/admin.routes"
import userRoutes from "./src/routes/user.routes"

const app = express()

app.use(bodyParser.json())

app.use(bookRoutes)
app.use(adminRoutes)
app.use(userRoutes)

app.listen(8000, ()=>{
    console.log("Server is running on port 8000")
})