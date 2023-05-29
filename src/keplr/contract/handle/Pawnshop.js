import { connect,getGasPriceAndGasLimit,getRevertReason } from "./base";
import {
    abi
} from "../artifact/Pawnshop.json";
import { isApprovedForAll,setApprovalForAll } from "./uptick721";

let contractAddress = '0x43be1f90567a0c55560a40912926b32050b490e4'


//设置合约地址
export function setContractAddress(platformAddress) {
    if(platformAddress) {
        contractAddress = platformAddress;
    }
}

//根据质押周期获取费率
export async function getRate(period) {
    try {
        let contract  = await connect(contractAddress,abi)

        let gasSetting = await getGasPriceAndGasLimit();
		let result = await contract.getRate(
            period
        );
        
        let fee = parseInt(result._hex,16)/1000;

		return fee;
    } catch (error) {
            console.log("error",error);
    }      
}
//质押NFT
export async function mortgageNft(tokenAddress,tokenId,period) {
    
    try {
          // 判断是否授权
    let isApproved = await isApprovedForAll(tokenAddress);
    let setApproval,result
    if (!isApproved){
         setApproval= await setApprovalForAll(tokenAddress);
        console.log('setApproval',setApproval);
    }
    await sleep(8000).then(async () => {

        let contract  = await connect(contractAddress,abi)
        result = await contract.pledge(
           tokenAddress,tokenId,period
       );
       return result
    })
     
      
    } catch (error) {
        console.log(error); 
    }
   
}
 function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
// 赎回NFT
export async function redeemNft(tokenAddress,tokenId,amount) {

    console.log('redeemNft',tokenAddress,tokenId,amount,contractAddress);
    debugger
    let contract  = await connect(contractAddress,abi)
    let gasSetting = await getGasPriceAndGasLimit();
    let result = await contract.redeem(
        tokenAddress,tokenId,
        { value:amount,gasPrice: gasSetting.gasPrice, gasLimit: gasSetting.gasLimit }
    );
    return result  
}

//延期
export async function postponeNft(tokenAddress,tokenId) {
    let contract  = await connect(contractAddress,abi)
    let gasSetting = await getGasPriceAndGasLimit();
    let result = await contract.renewal(
        tokenAddress,tokenId
    );
    return result  
}
//获取质押信息
export async function getPledgeInfo(tokenAddress,tokenId) {

    console.log("getPledgeInfo",tokenAddress,tokenId);
    debugger

    try {
        let contract  = await connect(contractAddress,abi)
        let gasSetting = await getGasPriceAndGasLimit();
        let result = await contract.getPledgeInfo(
            tokenAddress,tokenId
        );
       
        return result    
    } catch (error) {
            console.log(error);
    }


}




