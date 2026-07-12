const bcrypt = require('bcrypt');




async function hashPasword(){
const myPassword ='admin 123';

const hash =await  bcrypt.hash(myPassword, 10);
console.log(hash);
}
 hashPasword();


 // aqui generamos el password 