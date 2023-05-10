import { utf8Array } from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import * as secp from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils";

const ACCOUNTSPAIR = [
  {
    publickey: "3435350bdf3fe165983004eec68b69f93260ed00",
    privatekey:
      "9fbfe1879d5f42724c021f3293b3aa7c727b99358f84879b0974af1c6ed423ab",
  },
  {
    publickey: "1677a5a17c4d7318d0d5d116956f7e93c889b9e8",
    privatekey:
      "8076500d0e3194ca0aa7567ea096796ed62932476316606f72d138752112aa0a",
  },
  {
    publickey: "717b3c7342c8a8ab0876d4d71fad36b9a97fa587",
    privatekey:
      "c68961eafc09b28c826d4e55739f66a683be4933d0ce1adba9ddb6daa5237a45",
  },
];

const getPrivateKey = (publickey) => {
  if (!publickey) return null;
  const privatekey = ACCOUNTSPAIR.find((ac) => ac.publickey == publickey);
  return privatekey ? privatekey.privatekey : null;
};

const getPublicKey = (privateKey) => {
  if (!privateKey) return null;
  const pair = ACCOUNTSPAIR.find((ac) => ac.privatekey == privateKey);
  return pair ? pair.publickey : null;
};

const hashMessage = (message) => keccak256(Uint8Array.from(message));

const signTransaction = async (message, address) => {
  const hash = hashMessage(message);
  const PRIVATE_KEY = getPrivateKey(address);
  console.log("PRIVATE_KEY : " + PRIVATE_KEY);
  const [signature, recoveryBit] = await secp.sign(hash, PRIVATE_KEY, {
    recovered: true,
  });
  const fullSignature = new Uint8Array([recoveryBit, ...signature]);
  return toHex(fullSignature);
};

const UserWallet = {
  signTransaction,
};

export default UserWallet;
