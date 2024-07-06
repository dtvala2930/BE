"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const morgan = require("morgan");
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        morgan((tokens, req, res) => {
            const user = req?.user?.username || 'anonymous';
            return JSON.stringify({
                user: user,
                host: tokens['remote-addr'](req, res),
                method: tokens['method'](req, res),
                path: tokens['url'](req, res),
                duration: +tokens['response-time'](req, res),
                agent: tokens['user-agent'](req, res),
                referrer: tokens['referrer'](req, res),
                code: +tokens['status'](req, res),
            });
        }, {
            stream: {
                write: (message) => this.logMessage(message),
            },
        })(req, res, next);
    }
    logMessage(message) {
        console.log(JSON.parse(message));
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map