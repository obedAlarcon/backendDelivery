const bcrypt = require('bcrypt');

//aqui verificamos el password y se valida 
async function verifyPassword(){
    const myPassword ='admin 123';
    const hash ='$2b$10$pj8v/EwmZBn8vFpzvGP7Y.JoXpCEdQbK1x8HD34MtpxRpBKdSEgJy';
    const isMatch = await bcrypt.compare(myPassword, hash);
    console.log(isMatch);
}

verifyPassword()