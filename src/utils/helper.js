var Web3 = require('web3');
const web3Obj = new Web3();
const arr = [
	{
		symbol: "11",
		unit: '22',
		formImage: 'icon_pool'
	},
	{
		symbol: "44",
		unit: '55',
		formImage: 'icon_link'
	},
	{
		symbol: "44",
		unit: '55',
		formImage: 'icon_yes'
	},
];
export const getRanHex = size => {
	let result = [];
	let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

	for (let n = 0; n < size; n++) {
		result.push(hexRef[Math.floor(Math.random() * 16)]);
	}
	return result.join('');
}


export const timestampToDate = (time) => {
	let date = new Date(time);
	let Y = date.getFullYear() + ".";
	let M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + ".";
	let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
	// let h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
	// let m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
	// let s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
	let strDate = Y + M + D;
	return strDate;
}

export const timestampToDateTime = (time) => {
	let date = new Date(time)
	let Y = date.getFullYear() + '.';
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
	let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	let strDate = Y + M + D + h + m + s;
	return strDate;
}
export const timestampToTimeHour = (time) => {
	let date = new Date(time)
	// let Y = date.getFullYear() + '-';
	// let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	// let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
	let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
	//let m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
	//let s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
	let strDate = h;
	return strDate;
}

export const timestampToTimeMinute = (time) => {
	let date = new Date(time)
	// let Y = date.getFullYear() + '-';
	// let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	// let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
	//let h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
	let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
	//let s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
	let strDate = m;
	return strDate;
}
export const timestampToTimeSecond = (time) => {
	let date = new Date(time)
	// let Y = date.getFullYear() + '-';
	// let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	// let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
	//let h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
	//let m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
	let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	let strDate = s;
	return strDate;
}

export const addDate = (date, days) => {
	let timestamp = date + days * 86400;
	// let timestamp;
	// if(days == 1){
	// 	timestamp = date +  900;
	// }else if(days == 2){
	// 	timestamp = date + 1500;
	// }else if (days == 3){
	// 	timestamp = date + 2100;
	// }


	return timestamp;
}

export const fromSymbolToUnit = (symbol) => {

	for (let i = 0; i < arr.length; i++) {
		if (symbol == arr[i].symbol) {
			return arr[i].formImage
		}

	}

}

export const toShowValue = (OrgValue)=>{	
	
	let retValue = web3Obj.utils.fromWei(OrgValue);
	
	return retValue.toString();
}

export const fromShowValue = (OrgValue)=>{	
	
	let retValue = web3Obj.utils.toWei(OrgValue);
	
	return retValue.toString();
}
