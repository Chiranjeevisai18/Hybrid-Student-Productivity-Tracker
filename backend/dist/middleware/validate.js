"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (rules) => (req, res, next) => {
    const errors = rules(req);
    if (errors && errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};
exports.validate = validate;
