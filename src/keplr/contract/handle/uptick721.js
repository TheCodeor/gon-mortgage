import {
   connect,
   getAccounts

} from "./base";

import {
    abi
} from "../artifact/Uptick721.json";

const base = require('./base');

//xxl todo get from .evn
let contractAddress = "0xf4164ece75bc4eebcce23f25c18132d54e405aa7";

export async function isApprovedForAll(tokenAddress){
    const account = await getAccounts();
    const fromAddress = await account.getAddress();

    let contract = await connect(tokenAddress, abi);
    
    let result = await contract.isApprovedForAll(
        fromAddress, contractAddress
    );
    console.log("isApprovedForAll", result);
    return result;
}


export async function setApprovalForAll(tokenAddress) {
    const account = await base.getAccounts();
    const fromAddress = await account.getAddress();

    let contract = await connect(tokenAddress, abi);
    let result = await contract.setApprovalForAll(
        contractAddress, true
		);
	console.log("setApprovalForAll", result);
	return result;
	
}
