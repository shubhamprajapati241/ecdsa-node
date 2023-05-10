const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
console.log("privateKey : " + toHex(privateKey));

let public = secp.getPublicKey(
  "c68961eafc09b28c826d4e55739f66a683be4933d0ce1adba9ddb6daa5237a45"
);

console.log("public_key: " + toHex(keccak256(public).slice(-20)));
