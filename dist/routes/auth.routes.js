"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const verifyUser_1 = require("../middlewares/verifyUser");
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.login);
router.post('/register', [
    verifyUser_1.validateUsername
], auth_controller_1.Register);
router.get('/validate/:token', auth_controller_1.validateAuth);
exports.default = router;
