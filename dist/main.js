"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const bodyParser = require("body-parser");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                connectSrc: [
                    `'self'`,
                    `'unsafe-inline'`,
                    `https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com`,
                ],
                scriptSrc: [
                    `'self'`,
                    `'unsafe-inline'`,
                    `https://*.googletagmanager.com https://tagmanager.google.com`,
                ],
                styleSrc: [
                    `'self'`,
                    `'unsafe-inline'`,
                    `https://tagmanager.google.com https://www.googletagmanager.com https://fonts.googleapis.com https://*.googletagmanager.com`,
                ],
                imgSrc: [
                    `'self'`,
                    `data:`,
                    `https://*.googletagmanager.com https://ssl.gstatic.com https://www.gstatic.com https://*.google-analytics.com`,
                ],
                fontSrc: [`'self'`, `data:`, `https://fonts.gstatic.com`],
            },
        },
    }));
    app.use(bodyParser.json({ limit: '2048mb' }));
    app.use(bodyParser.urlencoded({ limit: '2048mb', extended: true }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map