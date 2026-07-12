const jwt = require('jsonwebtoken');




const secret ='todos';
const payload={
    sub:1,
    role:'user',

}

function signToken(payload, secret){
    return jwt.sign(payload,secret);

}
const token = signToken(payload,secret);
console.log(token);

// este es el archivo de firma del token