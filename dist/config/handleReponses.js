"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSuccess = exports.handleError = void 0;
const handleError = ({ code, message, res, data, error }) => {
    console.log(error);
    return res.status(code).json({
        success: false,
        message
    });
};
exports.handleError = handleError;
const handleSuccess = ({ code, message = '', res, data }) => {
    return res.status(code).json({
        success: true,
        data,
        message
    });
};
exports.handleSuccess = handleSuccess;
