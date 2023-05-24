import { connect,getGasPriceAndGasLimit } from "./base";
import {
    abi
} from "../artifact/Pawnshop.json";

let contractAddress = '0x43be1f90567a0c55560a40912926b32050b490e4'


//设置合约地址
export function setContractAddress(platformAddress) {
    if(platformAddress) {
        contractAddress = platformAddress;
    }
}

//根据质押周期获取费率
export async function getRate() {
    try {
        let contract  = await connect(contractAddress,abi)
        console.log('contract',contract);
        let gasSetting = await getGasPriceAndGasLimit();
		console.log("gasSetting", gasSetting);
		let result = await contract.getRate(
            '604800'
        );
        let fee = parseInt(result._hex,16)/1000;

		return fee;
    } catch (error) {
            console.log("error",error);
    }
       
}

