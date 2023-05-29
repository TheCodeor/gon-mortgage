
import { ethers } from "ethers";
// let Web3 = require('web3')
// const web3Obj = new Web3("https://json-rpc.uptick.network");




export async function addNetwork() {
    try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: '0x492',
                chainName: 'Uptick Origin',
                nativeCurrency: {
                    name: 'UptickToken',
                    symbol: 'UOC', // 2-6 characters long
                    decimals: 18,
                  
                },
                rpcUrls: ['https://json-rpc.origin.uptick.network'],
                blockExplorerUrls: ['https://evm-explorer.origin.uptick.network/'],
               
                
            }],
        });
    }
    catch (error) {
        console.error(error);
    }
}
export async function getAccounts(){
     
 let web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    await web3Provider.send('eth_requestAccounts', []);
    let signer = await web3Provider.getSigner();
   return signer;
}

export async function getRevertReason(txHash){
    var Web3 = require('web3');

    var web3Obj = new Web3(new Web3.providers.HttpProvider("https://json-rpc.uptick.network"));
    const tx = await web3Obj.eth.getTransactionReceipt('0xf302b565eaf793c2a091d803247a6e7abc7a9413f8502fffd7813b903276a34b')
    //web3.eth.getTransaction('0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b')
    console.log('tx',txHash,tx);
    var result = await web3Obj.eth.call(tx, tx.blockNumber)
  
    result = result.startsWith('0x') ? result : `0x${result}`
  
    if (result && result.substr(138)) {
  
      const reason = web3Obj.utils.toAscii(result.substr(138))
      console.log('Revert reason:', reason)
      return reason
  
    } else {
  
      console.log('Cannot get reason - No return value')
  
    }
  
  }
  
export async function connect(address, abi) {
    let web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    await web3Provider.send('eth_requestAccounts', []);
    let signer = await web3Provider.getSigner();
	let contract = new ethers.Contract(address, abi, signer);
	return contract;

}
export async function getGasPriceAndGasLimit(){

    let gasPrice = 10000000000;
    //xxl TODO setting from .evn
    let gasLimit = "0x7a1200";


    return {gasPrice,gasLimit};

}
   