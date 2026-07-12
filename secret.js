const crypto = require('crypto');
const fs = require('fs');

// Generar secret seguro de 32 bytes y pasarlo a hexadecimal
const secret = crypto.randomBytes(32).toString('hex');

// Mostrarlo en consola
console.log('JWT_SECRET generado:', secret);

// Opcional: guardarlo directamente en un archivo .env
fs.writeFileSync('.env', `JWT_SECRET=${secret}\n`);
console.log('.env creado con JWT_SECRET');