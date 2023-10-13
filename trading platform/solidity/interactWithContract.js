import Web3 from 'web3';
import * as Tx from 'ethereumjs-tx'

//Defines the senders address and private key
const CONTRACT_ADDRESS = '0x8FB631A9d2496186D1cA0285A3170a4213af841a';
const SENDER_ADDRESS = '0x154B0A2e458Cb37e93622798d04Bb3B38088BAD7';
const PRIVATE_KEY = '0x0ce62120e6588ceb45d4b3ee9b551a991d7bde69718b726746bb6b35b0c6db83';
const RECIEVER_ADDRESS = '0x88126883a7c3dd9685e50EE8E02c776BB79a0a4F'
// Connect to Ganache 
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
web3.eth.Contract.handleRevert = true;

// Load the contract data 
import abi from './TradeHistory.json' assert { type: "json"}
const MyContract = new web3.eth.Contract(abi, CONTRACT_ADDRESS, {
  from: SENDER_ADDRESS,
  gas: 200000,
  gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
});


//get nonce
const nonce = await web3.eth.getTransactionCount(SENDER_ADDRESS);
console.log(nonce);

//get chain Id
let chainId = await web3.eth.getChainId();
console.log(chainId)

//get gas estimate
// let gas = await MyContract.methods.store(67).estimateGas({ from: SENDER_ADDRESS })
// console.log('gas', gas)



//test the getter
let res = await MyContract.methods.getTrades().call();
console.log('should be no trades', res)


//Call the store function of the simple contract
let storeTransaction = await MyContract.methods.addTrade('Rojet', SENDER_ADDRESS, RECIEVER_ADDRESS, '0.234', new Date().toLocaleString(), '/img1.png', '0xe663d070c15c949daeabf5cc7baf303c58bccde40c7119a8323682d32c7c38eb').send({
  chainId: chainId,
  nonce: nonce,
  to: CONTRACT_ADDRESS,
  from: SENDER_ADDRESS,
  gas: 6721975,
})


//test the getter
let newRes = await MyContract.methods.getTrades().call();
console.log('should contain Rojet trade', newRes)

console.log(storeTransaction)


/*

async function addTradeToBlockchain(nftName, from, to, ethValue, timeStamp, image, transactionHash) {


  try {
    // const receipt = await MyContract.methods.addTrade(nftName, from, to, ethValue, timeStamp, image, transactionHash).send({
    //   from: from,
    //   gas: 16721975,
    //   gasPrice: 20000000000,
    // });
    // console.log(receipt)

    return receipt;
  } catch (error) {
    console.error(error);
  }
}

async function getTradesFromBlockchain() {
  try {
    // const transactionHistory = await MyContract.methods.getTrades().call();
    // const transactionHistory = await MyContract.methods;
    return transactionHistory;
  } catch (error) {
    console.error(error);
  }
}
addTradeToBlockchain('', '0x154B0A2e458Cb37e93622798d04Bb3B38088BAD7', '0x154B0A2e458Cb37e93622798d04Bb3B38088BAD7', 0.11, new Date().toLocaleString(), '/img2', 'sdfafafsdfsafaffsdfsf').then(res => console.log('res', res))
export { addTradeToBlockchain, getTradesFromBlockchain }



*/

