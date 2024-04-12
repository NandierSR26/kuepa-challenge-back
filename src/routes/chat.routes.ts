import { Response, Router, Request } from "express";
import { getGroupChat, getIndividualChat } from "../controllers/chat.controller";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.get('/from/:id', [validateJWT], getIndividualChat);
router.get('/group', [validateJWT], getGroupChat)


export default router;