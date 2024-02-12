import express from "express"
import bodyParser from "body-parser"
import routes from "./src/routes/routes"

const app = express()

app.use(bodyParser.json())

app.use(routes)

app.listen(8000, ()=>{
    console.log("Server is running on port 8000")
})