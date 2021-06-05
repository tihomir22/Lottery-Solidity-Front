import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import React, { useEffect, useState } from "react";
import { deployedContract } from "./lottery";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState(0);
  useEffect(() => {
    getMetamaskInfo();
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    let accounts = await web3.eth.getAccounts();
    const res = await deployedContract.methods.enter().send({ from: accounts[0], value: web3.utils.toWei(value + "", "ether") });
    const players = await deployedContract.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(deployedContract.options.address);
    setPlayers(players);
    setBalance(balance);
  }

  async function pickWinner(event) {
    event.preventDefault();
    let accounts = await web3.eth.getAccounts();
    await deployedContract.methods.pickWinner().send({
      from: accounts[0],
    });
    console.log("A winner was picked!")
  }

  async function getMetamaskInfo() {
    const manager = await deployedContract.methods.manager().call();
    const players = await deployedContract.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(deployedContract.options.address);
    setManager(manager);
    setPlayers(players);
    setBalance(balance);
  }
  return (
    <div className="App">
      <h2>Lottery contract</h2>
      <p>This contract is managed by {manager}</p>
      <p>
        There are currently {players.length} people competing to win {web3.utils.fromWei(balance, "ether")} Ethers
      </p>
      <hr />
      <form onSubmit={(event) => onSubmit(event)}>
        <h4>Lets go beibe?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input type="number" value={value || 0} onChange={(event) => setValue(event.target.value)}></input>
        </div>
        <button>Enter</button>
        <h4>Pick a winner?</h4>
        <button onClick={(event) => pickWinner(event)}>Lets do it!</button>
      </form>
    </div>
  );
}

export default App;
