import axios from "axios";
const service = axios.create({
    timeout: 300000,
  });


export function getChainListInfo(params) {
    return service.post('/gonapi/nft/getCrossChainListByTxid', 
        transObjToParamStr(params)
    )
}
export function getInfoByAddress(params) {
    return service.post('/gonapi/nft/getCrossChainListByAddress', 
        transObjToParamStr(params)
    )
}

export function uploadJsonData(params) {
    return service.post('/upJson', 
        transObjToParamStr(params)
    )
}

export function requestCreateNFT(params) {
    return service.post('/gonapi/nft', 
        transObjToParamStr(params)
    )
}
export function getMyCardList(params) {
   
    return service.post('/gonapi/nft/searchPage', transObjToParamStr(params))
}
// 修改个人信息
export function editUserInfo(params) {
   
    return service.post('/gonapi//user/edit', transObjToParamStr(params))
}
// 获取个人信息
export function getUserInfo(params) {
   
    return service.get('/gonapi/user/info?'+transObjToParamStr(params))
}
// 创建用户
export function createInfo(params) {
   
    return service.post('/gonapi/user',transObjToParamStr(params))
}
///nft/nftInfo
export function cardDetail(params) {
   
    return service.post('/gonapi/nft/nftInfo',transObjToParamStr(params))
}
// 转化NFT cosmos -> evm 
export function conventNFT(params,bodyParams) {
    return service.post('/gonapi/nft/cosmosConvertEVM?evmOwner='+params.evmOwner + '&evmNftAddress=' +params.evmNftAddress+ '&evmNftId=' +params.evmNftId, 
        transObjToParamStr(bodyParams)
    )
}

// 质押Nft
export function pledgeNFT(params) {
   
    return service.post('/gonapi/nft/pledge',transObjToParamStr(params))
}
// 赎回NFT
export function ransomNFT(params) {
   
    return service.post('/gonapi/nft/redeem',transObjToParamStr(params))
}
// 延期NFT 
export function renewalNFT(params) {
   
    return service.post('/gonapi/nft/renewal',transObjToParamStr(params))
}
export function updateUser(params) {
    return service.get('/gonapi/nft/updateUser?'+transObjToParamStr(params))
}




function transObjToParamStr(object) {
   
let arr=[]
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            arr.push(`${key}=${element}`);
        }
    }
    return arr.join('&');
}