const jwt = require('jsonwebtoken');




const secret ='todos';
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzczODkyMjUxfQ.VqUr18EjylyOdWKJhjngfLp_TYtV7lPsJqjJZmPuezY';

function verifyToken(token, secret){
    return jwt.verify(token,secret);

}
const payload = verifyToken(token,secret);
console.log(payload);

// este es el archivo verifica que la firna del token es bien