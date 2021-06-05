import Web3 from "web3";
//Damos por hecho que el usuario tenga metamask
//let web3Instance = new Web3(window.web3.currentProvider);
let web3;
// Modern DApp Browsers
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  try {
    window.ethereum.enable().then(function () {
      // User has allowed account access to DApp...
      console.log("allowed");
    });
  } catch (e) {
    // User has denied account access to DApp...
    console.log("denied");
  }
}
// Legacy DApp Browsers
else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
}
// Non-DApp Browsers
else {
  alert("You have to install MetaMask !");
}

export default web3;
