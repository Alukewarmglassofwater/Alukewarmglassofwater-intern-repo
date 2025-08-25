// src/crudmodule/DB/dbencryption.ts
import { EncryptionTransformer } from 'typeorm-encrypted';

// 64 hex chars = 32 bytes. (Demo key; replace later.)
const KEY_HEX =
  '4e8f9c8f0b89c7a3f62b75a63a5fcbab78dfc4219ac221ed99e8a6a6d59a2e2b';
const keyBytes = Buffer.from(KEY_HEX, 'hex'); // ← exactly 32 bytes

console.log('[crypto] keyBytes length =', keyBytes.length); // must print 32

export const encryptionTransformer = new EncryptionTransformer({
  key: keyBytes as unknown as string, // pass bytes directly
  algorithm: 'aes-256-cbc',
  ivLength: 16, // AES block size
});
