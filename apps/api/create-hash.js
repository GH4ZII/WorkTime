// create-hash.js
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'Password1!'; // <-- Bytt ut dette

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    if (err) {
        console.error("Klarte ikke hashe passord:", err);
        return;
    }
    console.log("Ditt hashede passord er:");
    console.log(hash);
});
