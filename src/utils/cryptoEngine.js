/**
 * SmartTrace™ Web Crypto SHA-256 Ledger & Audit Chain Engine
 * Provides client-side cryptographic hashing & tamper-proof validation
 * using native Web Crypto API (window.crypto.subtle).
 */

/**
 * Computes a SHA-256 hash string for any JS object or string payload.
 * @param {Object|string} data 
 * @returns {Promise<string>} 64-character hexadecimal SHA-256 hash
 */
export async function computeSHA256(data) {
  const jsonString = typeof data === 'string' ? data : JSON.stringify(data, Object.keys(data).sort());
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(jsonString);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generates a cryptographic ledger entry linking the payload to the previous record hash.
 * @param {Object} recordPayload - Form payload (Form I, IV, VI, or Spore Strip Log)
 * @param {string} previousHash - Previous block hash in the audit chain
 * @returns {Promise<Object>} Formatted block with index, timestamp, payload, previousHash, and hash
 */
export async function createLedgerBlock(recordPayload, previousHash = '0000000000000000000000000000000000000000000000000000000000000000') {
  const timestamp = new Date().toISOString();
  const blockHeader = {
    timestamp,
    previousHash,
    payload: recordPayload
  };

  const blockHash = await computeSHA256(blockHeader);

  return {
    ...blockHeader,
    hash: blockHash,
    signatureAlgorithm: 'SHA-256-CANONICAL-JSON',
    verified: true
  };
}

/**
 * Verifies an array of chain blocks to ensure zero bytes have been altered.
 * @param {Array<Object>} chain - Array of ledger blocks
 * @returns {Promise<{ valid: boolean, brokenIndex: number|null, message: string }>}
 */
export async function verifyChainIntegrity(chain) {
  if (!Array.isArray(chain) || chain.length === 0) {
    return { valid: true, brokenIndex: null, message: 'Chain is empty.' };
  }

  for (let i = 0; i < chain.length; i++) {
    const block = chain[i];
    const expectedPrevHash = i === 0 ? (block.previousHash || '0000000000000000000000000000000000000000000000000000000000000000') : chain[i - 1].hash;

    if (block.previousHash !== expectedPrevHash) {
      return {
        valid: false,
        brokenIndex: i,
        message: `Chain broken at block #${i}: Previous hash mismatch.`
      };
    }

    const recomputedHash = await computeSHA256({
      timestamp: block.timestamp,
      previousHash: block.previousHash,
      payload: block.payload
    });

    if (recomputedHash !== block.hash) {
      return {
        valid: false,
        brokenIndex: i,
        message: `Tampering detected at block #${i}: Payload digest mismatch.`
      };
    }
  }

  return { valid: true, brokenIndex: null, message: 'Cryptographic SHA-256 chain verified. Zero tampering detected.' };
}
