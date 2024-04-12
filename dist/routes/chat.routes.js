"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../controllers/chat.controller");
const validateJWT_1 = require("../middlewares/validateJWT");
const router = (0, express_1.Router)();
router.get('/from/:id', [validateJWT_1.validateJWT], chat_controller_1.getIndividualChat);
router.get('/group', [validateJWT_1.validateJWT], chat_controller_1.getGroupChat);
exports.default = router;
