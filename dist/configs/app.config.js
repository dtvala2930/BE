"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASETO_PUBLIC_KEY = exports.PASETO_PRIVATE_KEY = exports.JWT_EXPIRED_TIME_TOKEN = exports.JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN = exports.JWT_SECRET_KEY = exports.CIPHER_IV = exports.CIPHER_KEY = exports.CIPHER_MODE = void 0;
require("dotenv/config");
exports.CIPHER_MODE = process.env.CIPHER_MODE;
exports.CIPHER_KEY = process.env.CIPHER_KEY;
exports.CIPHER_IV = process.env.CIPHER_IV;
exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
exports.JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN = process.env.JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN;
exports.JWT_EXPIRED_TIME_TOKEN = process.env.JWT_EXPIRED_TIME_TOKEN;
exports.PASETO_PRIVATE_KEY = process.env.PASETO_PRIVATE_KEY;
exports.PASETO_PUBLIC_KEY = process.env.PASETO_PUBLIC_KEY;
//# sourceMappingURL=app.config.js.map