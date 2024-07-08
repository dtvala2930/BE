"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const paseto_1 = require("paseto");
const app_config_1 = require("../../configs/app.config");
const formatKeyPrivate = `
-----BEGIN PRIVATE KEY-----
PRIVATE_KEY
-----END PRIVATE KEY-----
`;
const formatKeyPublic = `
-----BEGIN PUBLIC KEY-----
PUBLIC_KEY
-----END PUBLIC KEY-----
`;
const signToken = async (payload, expiresIn) => {
    let privateKey;
    try {
        privateKey = formatKeyPrivate.replace('PRIVATE_KEY', app_config_1.PASETO_PRIVATE_KEY);
    }
    catch (error) {
        console.log('Paseto');
        console.log(JSON.stringify(error, null, 4));
        return null;
    }
    try {
        const token = await paseto_1.V4.sign(payload, privateKey, { expiresIn: expiresIn });
        return token;
    }
    catch (error) {
        console.log('Paseto');
        console.log(JSON.stringify(error, null, 4));
        return null;
    }
};
exports.signToken = signToken;
const verifyToken = async (token) => {
    let publicKey;
    try {
        publicKey = formatKeyPublic.replace('PUBLIC_KEY', app_config_1.PASETO_PUBLIC_KEY);
    }
    catch (error) {
        console.log('Paseto');
        console.log(JSON.stringify(error, null, 4));
        return null;
    }
    try {
        const payload = await paseto_1.V4.verify(token, publicKey);
        return payload;
    }
    catch (error) {
        console.log('Paseto');
        console.log(JSON.stringify(error, null, 4));
        return null;
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=paseto.js.map