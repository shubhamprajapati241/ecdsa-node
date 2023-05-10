import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address.trim());
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>

      <div>
        <hr />
        <label>
          <b>Default Addresses</b>
        </label>
        <p> 3435350bdf3fe165983004eec68b69f93260ed00 : 50</p>
        <p> 1677a5a17c4d7318d0d5d116956f7e93c889b9e8 : 100</p>
        <p> 717b3c7342c8a8ab0876d4d71fad36b9a97fa587 : 175</p>
      </div>
    </div>
  );
}

export default Wallet;
