"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptionTransformer = void 0;
const typeorm_encrypted_1 = require("typeorm-encrypted");
const KEY_HEX = '4e8f9c8f0b89c7a3f62b75a63a5fcbab78dfc4219ac221ed99e8a6a6d59a2e2b';
const keyBytes = Buffer.from(KEY_HEX, 'hex');
console.log('[crypto] keyBytes length =', keyBytes.length);
exports.encryptionTransformer = new typeorm_encrypted_1.EncryptionTransformer({
    key: keyBytes,
    algorithm: 'aes-256-cbc',
    ivLength: 16,
});
//# sourceMappingURL=dbencryption.js.map