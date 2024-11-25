import crypto from 'crypto';

function generateJWTSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

const jwtSecret = generateJWTSecret();
console.log('Your JWT Secret:');
console.log(jwtSecret);

// For demonstration purposes, showing different lengths
console.log('\nShorter secret (32 bytes):');
console.log(generateJWTSecret(32));

console.log('\nLonger secret (128 bytes):');
console.log(generateJWTSecret(128));