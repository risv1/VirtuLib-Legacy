import express from "express"
import { HelloWorld } from "../handlers/hello";

const router = express.Router()

router.get("/", HelloWorld)

export default router;