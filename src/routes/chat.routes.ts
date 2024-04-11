import { Response, Router, Request } from "express";
import { getChat } from "../controllers/chat.controller";

const router = Router();

router.get('/from/:id', getChat);


export default router;