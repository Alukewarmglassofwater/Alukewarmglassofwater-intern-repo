// Helpers (all the crap I randomly initialize throughout the function is now initialized here)
static bool receivePacket(uint8_t* buf, uint8_t& len);
static bool tooLong(uint8_t len);
static void toCString(const uint8_t* buf, uint8_t len, char* out);     // len is already validated
static bool parseFields(const char* s,
                        int& SEQ, int& TYPE, int& TAGID, int& RELAY,
                        int& S_NODE, int& RSSI, int& DEST_NODE, int& STOP,
                        char* encryptedHex, size_t encryptedHexSz);
static void onUnauthorized();
static void onFromNode1Debug(int SEQ, int S_NODE, int DEST_NODE, int STOP, const char* hex);
static bool decryptPacket(const char* encryptedHex, char* outPlain, int& outPlainLen);
static void handleForThisNode(const char* plaintext);
static void handleRelay(const char* plaintext, int encryptedLength);
static void maybeShowAndClearIfStop(int STOP);

void listenForMessages() {
    while (true) {  // keep listening
        uint8_t buf[MESSAGELENGTH] = {0};
        uint8_t len = sizeof(buf);

        if (!rf95.available()) {
            delay(100);
            continue;
        }

        if (!receivePacket(buf, len)) {
            Serial.println(F("Failed to receive message."));
            delay(100);
            continue;
        }

        if (tooLong(len)) {
            Serial.println(F("Received message too long!"));
            digitalWrite(LED_PIN, LOW);
            delay(100);
            continue;
        }

        char receivedStr[MESSAGELENGTH + 1];
        toCString(buf, len, receivedStr);

        int SEQ, TYPE, TAGID, RELAY, S_NODE, RSSI, DEST_NODE, STOP;
        char encryptedHex[128];

        if (!parseFields(receivedStr, SEQ, TYPE, TAGID, RELAY, S_NODE, RSSI, DEST_NODE, STOP,
                         encryptedHex, sizeof(encryptedHex))) {
            Serial.println(F("Received message format incorrect."));
            digitalWrite(LED_PIN, LOW);
            delay(100);
            continue;
        }

        if (S_NODE != 1) {
            onUnauthorized();
            delay(100);
            continue;
        }

        onFromNode1Debug(SEQ, S_NODE, DEST_NODE, STOP, encryptedHex);

        // Decrypt)
        int plainLen = 0;
        if (!decryptPacket(encryptedHex, decryptedMessage, plainLen)) {
            Serial.println(F("CORRUPTED MESSAGE"));
            digitalWrite(LED_PIN, LOW);
            delay(100);
            continue;
        }

        // Persist last chunk
        saveDecryptedMessageToEEPROM(decryptedMessage, plainLen);

        if (DEST_NODE == NODE_NUM) {
            handleForThisNode(decryptedMessage);
        } else {
            Serial.println(F("MESSAGE NOT INTENDED FOR NODE - ACTING AS RELAY"));
            Serial.println(F("##Message display for assignment purposes only##"));
            Serial.print(F("Decrypted Message: "));
            Serial.println(decryptedMessage);
            handleRelay(decryptedMessage, plainLen + 16); // your original encryptedLength included tag
        }

        maybeShowAndClearIfStop(STOP);

        digitalWrite(LED_PIN, LOW);
        delay(1000);
    }
}

// Helpers

static bool receivePacket(uint8_t* buf, uint8_t& len) {
    if (rf95.recv(buf, &len)) {
        digitalWrite(LED_PIN, HIGH);
        return true;
    }
    return false;
}

static bool tooLong(uint8_t len) {
    return len >= MESSAGELENGTH;
}

static void toCString(const uint8_t* buf, uint8_t len, char* out) {
    // caller guarantees len < MESSAGELENGTH and out has MESSAGELENGTH+1
    strncpy(out, (const char*)buf, len);
    out[len] = '\0';
}

static bool parseFields(const char* s,
                        int& SEQ, int& TYPE, int& TAGID, int& RELAY,
                        int& S_NODE, int& RSSI, int& DEST_NODE, int& STOP,
                        char* encryptedHex, size_t encryptedHexSz) {
    // bounded %s to avoid overflow of encryptedHex
    int parsed = sscanf(s, "%d %d %d %d %d %d %d %d %127s",
                        &SEQ, &TYPE, &TAGID, &RELAY, &S_NODE, &RSSI, &DEST_NODE, &STOP,
                        encryptedHex);
    return parsed >= 9;
}

static void onUnauthorized() {
    Serial.println(F("!MESSAGE SENT FROM UNAUTHORIZED SOURCE!"));
}

static void onFromNode1Debug(int SEQ, int S_NODE, int DEST_NODE, int STOP, const char* hex) {
    Serial.println(F("Message received from NODE 1"));
    Serial.print(F("S_NODE: ")); Serial.println(S_NODE);
    Serial.print(F("Received - Seq: ")); Serial.println(SEQ);
    Serial.print(F("DEST_NODE: ")); Serial.println(DEST_NODE);
    Serial.print(F("STOP: ")); Serial.println(STOP);
    Serial.print(F("Received Encrypted Message (Hex): ")); Serial.println(hex);
}

static bool decryptPacket(const char* encryptedHex, char* outPlain, int& outPlainLen) {
    // Convert hex -> bytes
    int encryptedLength = strlen(encryptedHex) / 2;
    if (encryptedLength <= 16) return false;

    // Fixed-size buffer to avoid VLAs
    uint8_t encryptedBytes[128]; // 128 hex chars -> 64 bytes max; adjust if needed
    if (encryptedLength > (int)sizeof(encryptedBytes)) return false;

    hexStringToBytes(encryptedHex, encryptedBytes, encryptedLength);

    // Read key
    uint8_t key[32];
    readKeyFromEEPROM(key);

    // Init AEAD
    chachaPoly.setKey(key, sizeof(key));
    chachaPoly.setIV(nonce, sizeof(nonce)); // NOTE: same as your current code

    // Split tag
    uint8_t receivedTag[16];
    memcpy(receivedTag, encryptedBytes + encryptedLength - 16, 16);

    // Decrypt
    chachaPoly.decrypt((uint8_t*)outPlain, encryptedBytes, encryptedLength - 16);
    outPlain[encryptedLength - 16] = '\0';

    // Verify tag
    uint8_t computedTag[16];
    chachaPoly.computeTag(computedTag, sizeof(computedTag));

    bool ok = (memcmp(receivedTag, computedTag, sizeof(computedTag)) == 0);
    if (ok) outPlainLen = encryptedLength - 16;
    return ok;
}

static void handleForThisNode(const char* plaintext) {
    Serial.println(F("Message received for this node."));
    Serial.print(F("Decrypted Message: "));
    Serial.println(plaintext);
}

static void handleRelay(const char* plaintext, int encryptedLengthIncludingTag) {
    // Re-encrypt the entire decrypted message using existing pattern
    // NOTE: This mirrors your current logic
    uint8_t ciphertext[128]; // ensure large enough for your max
    if (encryptedLengthIncludingTag > (int)sizeof(ciphertext)) {
        Serial.println(F("Relay buffer too small."));
        return;
    }

    chachaPoly.encrypt(ciphertext, (uint8_t*)plaintext, encryptedLengthIncludingTag);

    // Clear decrypted message after use
    memset(decryptedMessage, 0, sizeof(decryptedMessage));

    // Convert to hex
    char hexCiphertext[256 + 1]; // 2x bytes + NUL
    for (int i = 0; i < encryptedLengthIncludingTag; ++i) {
        sprintf(&hexCiphertext[i * 2], "%02x", ciphertext[i]);
    }
    hexCiphertext[encryptedLengthIncludingTag * 2] = '\0';

    // Transmit
    transmitMessage(hexCiphertext);
    Serial.println(F("~Message forwarded~"));
}

static void maybeShowAndClearIfStop(int STOP) {
    if (STOP == 1) {
        Serial.println(F("Last message received. Displaying stored message:"));
        displayStoredMessage();
        clearStoredMessage();
    }
}
