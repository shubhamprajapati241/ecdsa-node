const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require("ethereum-cryptography/secp256k1");
const { hexToBytes, toHex } = require("ethereum-cryptography/utils");

const hashMessage = (message) => keccak256(Uint8Array.from(message));

const signatureToPubicKey = (message, signature) => {
  const hash = hashMessage(message);
  const fullSignature = hexToBytes(signature);
  const recovery = fullSignature[0];
  const signatureBytes = fullSignature.slice(1);
  console.log(signatureBytes);
  return secp.recoverPublicKey(hash, signatureBytes, recovery);
};

const pubKeyToAccount = (key) => {
  const address = toHex(keccak256(key)).slice(-40);
  return address.toString();
};

app.use(cors());
app.use(express.json());

const balances = {
  "3435350bdf3fe165983004eec68b69f93260ed00": 50, // deepak
  "1677a5a17c4d7318d0d5d116956f7e93c889b9e8": 100, // shubh
  "717b3c7342c8a8ab0876d4d71fad36b9a97fa587": 175, // nitish
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO : get a signature from the client-side application
  // recover the public key from the signature

  const { message, signature } = req.body;
  const { recipient, amount } = message;

  const key = signatureToPubicKey(message, signature);
  const sender = pubKeyToAccount(key);

  // console.log("sender :" + sender);
  // console.log("recipient :" + recipient);
  // console.log("message :" + JSON.stringify(message));
  // console.log("signature :" + signature);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
