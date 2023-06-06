      
<template>
  <div class="Home">
     <img class="logo" src="@/assets/logo.png" alt="" />
    <div class="select d-flex flex-row justify-space-between">
      <div>
        <div class="userName">{{ userName }}</div>
        <div class="address">
          {{ $store.state.EvmAddress }}
          <button class="btn ml-9" @click="disconnect">Disconnect</button>
        </div>
      </div>
      <div class="filter">
        <Select />
      </div>
    </div>
    <div class="Form mt-5 d-flex align-center">
      <div class="name" style="padding-left: 10%">NFTs</div>
      <div class="name">Mortgage Amount</div>
      <div class="name">Mortgage Period</div>
      <div class="none"></div>
      <div class="transfer">Mortgage / Redeem</div>
    </div>
    <div class="nftlist d-flex flex-row mt-5">
      <div class="left">
        <div class="list" v-for="(item, index) in NftList" :key="index">
          <div class="listItem d-flex flex-column">
            <div class="d-flex flex-row align-center">
              <div
                class="d-flex flex-row align-center nfts"
                :class="{ opacitys: item.status == '4' }"
              >
                <img class="img ml-5 mb-4" :src="item.imgUrl" alt="" />
                <div class="Nftname ml-4">
                  {{ item.name }}
                </div>
              </div>
              <div
                class="Mortgage"
                v-if="item.status == 0 || item.status == null"
                :class="{ opacitys: item.status == '4' }"
              >
                Not Mortgaged
              </div>
              <div
                class="Mortgage"
                v-else-if="item.status == '1' || item.status == '2' ||item.status == '4'  "
                :class="{ opacitys: item.status == '4' }"
              >
                {{ item.realityPrice }} UPTICK
              </div>
              <div class="time" :class="{ opacitys: item.status == '3' }">
                {{ item.startTime }} ~ {{ item.endTime }} <br /><span
                  v-if="item.period"
                  >{{ item.period }} Days</span
                >
              </div>
              <button
                class="btn"
                v-if="item.status == null || item.status == 0"
                :class="{ opacitys: item.status == '4' }"
                @click="Mortgage(item)"
              >
                Mortgage
              </button>
              <button
                class="btn2"
                v-else-if="item.status == '1' ||item.status == '2' "
                :class="{ opacitys: item.status == '4' }"
                @click="Mortgage(item)"
              >
                Redeem
              </button>
              <img
                v-else-if="item.status == '4'"
                class="faild"
                src="@/assets/confiscated.png"
                alt=""
              />
            </div>

            <div class="line "></div>
          </div>
        </div>
      </div>
      <!-- 质押操作 -->
      <div class="right ml-2" v-if="(status == 0 || status == null) && NftList.length >0">
        <div class="contant d-flex flex-column">
          <div class="title">Mortgage</div>
          <div class="baseInfo d-flex flex-row align-center">
            <img :src="selectItem.imgUrl" class="ava" alt="" />
            <div class="nftname ml-4">{{ selectItem.name }}</div>
          </div>
          <div class="title-14 mt-5">Current Appraised Value :</div>
          <div class="price mt-2">{{ selectItem.price }} UPTICK</div>
          <div class="title-14 mt-5">Mortgage Period :</div>
          <div class="selectList mt-2" @click="showList">
            <div class="date">{{ dayList[time_id].text }}</div>
            <img src="@/assets/icon_u.png" class="icon" alt="" />
            <div v-for="(item, index) in dayList" :key="index">
              <div class="list" v-if="isShow">
                <div v-for="(item, index) in dayList" :key="index">
                  <div class="dayName" @click="clickItem(index)">
                    {{ item.text }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="Ransom mt-5">
            <img
              src="@/assets/icon_i.png"
              class="IconInfo"
              @mouseenter="moused()"
              @mouseleave="leave()"
              alt=""
            />
            <div class="explain" v-if="isShowExplain">
              <div class="title-12">Mortgage Description:</div>
              <div class="title-12">
                1. We have valued this NFT and have shown you the amount that
                can be mortgaged;<br />
                2. You can choose to mortgage 7 days or 30 days according to
                your needs, and pay the corresponding ransom;<br />
                3. You need to redeem the NFT on time, and could only extend it
                once with the same time period before the mortgage period
                ends;<br />
                4. If you fail to redeem or postpone it before the end of the
                mortgage period, your NFT will be confiscated.
              </div>
            </div>
            <div class="title mt-4">Mortgage Period</div>
            <div class="title-25 mt-2">{{ selectItem.realityPrice }} UPTICK</div>
            <div class="content">
              <div class="details">
                <div class="title">Ransom</div>
                <div class="Info d-flex flex-row align-center">
                  <div class="leftItem mt-2">
                    <div class="Principal">Principal</div>
                    <div class="prices">{{ selectItem.realityPrice }} UPTICK</div>
                  </div>

                  <div class="mt-2 ml-7 mr-7" style="color: #ffffff">+</div>
                  <div class="leftItem mt-2">
                    <div class="Principal">Interest</div>
                    <div class="prices">{{ selectItem.fee }} UPTICK</div>
                  </div>

                  <!-- <div class="Interest">Interest</div> -->
                </div>
                <div class="title-25 mt-4">{{ selectItem.total }} UPTICK</div>
              </div>
            </div>
          </div>
          <button class="submit mt-6" :class="{'sub-dis': isPay}" @click="mortgageClick(selectItem)">
            Submit
          </button>
        </div>
      </div>
      <!-- 赎回操作 -->
      <div class="redeem" v-else-if="status == 1 || status == 2">
        <div class="contant d-flex flex-column">
          <div class="title" v-if="handType == 'redemption'">Redeem</div>
           <div class="title" v-else>Postpone</div>
          <div class="baseInfo d-flex flex-row align-center">
            <img
              :src="selectItem.imgUrl"
              class="ava"
              alt=""
            />
            <div class="nftname ml-4">{{selectItem.name}}</div>
          </div>
          <div class="title-14 mt-5">Current Appraised Value :</div>
          <div class="price">{{ selectItem.price }} UPTICK</div>
          <div class="title-14 mt-5">Mortgage amount :</div>
          <div class="price">{{ selectItem.realityPrice }}UPTICK</div>
          <div class="title-14 mt-5">Mortgage Period :</div>
          <div class="title-13 mt-3">
            {{ selectItem.startTime }} ~ {{ selectItem.endTime }}
            {{ selectItem.period }} Days
          </div>
          <!-- 正常赎回 -->
          <div v-if="handType == 'redemption'">
            <div class="Ransom mt-5">
              <div class="content">
                <div class="details">
                  <div class="title">Ransom</div>
                  <div class="Info d-flex flex-row align-center">
                    <div class="leftItem mt-4">
                      <div class="Principal">Principal</div>
                      <div class="prices">{{ selectItem.realityPrice }} UPTICK</div>
                    </div>

                    <div class="mt-4 ml-7 mr-7" style="color: #ffffff">+</div>
                    <div class="leftItem mt-4">
                      <div class="Principal">Interest</div>
                      <div class="prices">{{ selectItem.fee }} UPTICK</div>
                    </div>
                    <!-- <div class="Interest">Interest</div> -->
                  </div>
                  <div class="title-25 mt-4">{{ selectItem.total }} UPTICK</div>
                </div>
              </div>
            </div>
            <div class="help mt-4" v-if="status == 1" @click="toPage">I want to postpone</div>
            <button class="submit mt-6"  :class="{'sub-dis': isPay}" @click="redeemClick(selectItem)">
              Submit
            </button>
          </div>
          <!-- 续费操作 -->
          <div v-else>
            <div class="renewal mt-5">
              <img
                src="@/assets/icon_i.png"
                class="IconInfo"
                @mouseenter="moused()"
                @mouseleave="leave()"
                alt=""
              />
              <div class="explain" v-if="isShowExplain">
                <div class="title-12">Mortgage Description:</div>
                <div class="title-12">
                  1. We have valued this NFT and have shown you the amount that
                  can be mortgaged;<br />
                  2. You can choose to mortgage 7 days or 30 days according to
                  your needs, and pay the corresponding ransom;<br />
                  3. You need to redeem the NFT on time, and could only extend
                  it once with the same time period before the mortgage period
                  ends;<br />
                  4. If you fail to redeem or postpone it before the end of the
                  mortgage period, your NFT will be confiscated.
                </div>
              </div>
              <div class="title1 pt-4">Mortgage Period</div>
              <div class="title-25 mt-2">{{selectItem.realityPrice}}UPTICK</div>
              <div class="content">
                <div class="details">
                  <div class="title1">Ransom</div>
                  <div class="Info d-flex flex-row align-center">
                    <div class="leftItem mt-2">
                      <div class="Principal">Principal</div>
                      <div class="prices">{{ selectItem.realityPrice }} UPTICK</div>
                    </div>

                    <div class="mt-2 ml-7 mr-7" style="color: #ffffff">+</div>
                    <div class="leftItem mt-2">
                      <div class="Principal">Interest</div>
                      <div class="prices">{{ selectItem.fee }} UPTICK</div>
                    </div>

                    <!-- <div class="Interest">Interest</div> -->
                  </div>
                  <div class="title-25 mt-4">{{ selectItem.total }} UPTICK</div>
                </div>
              </div>
              <button class="submit1 mt-6" :class="{'sub-dis': isPay}" @click="renewalClick(selectItem)">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <uComponents ref="ucom"></uComponents>
  </div>
</template>
  
  <script>
import Select from "../components/Select/index";
import { getIirsAccoutInfo } from "../keplr/iris/wallet";
import { getEvmAddress } from "../keplr/uptick/wallet";
import { getMyCardList, pledgeNFT, ransomNFT,renewalNFT } from "@/api/home";
import { addNetwork } from "../keplr/contract/handle/base";
import {
  getRate,
  mortgageNft,
  redeemNft,
  getPledgeInfo,
  postponeNft
} from "../keplr/contract/handle/Pawnshop";
import { getPrice } from "../keplr/contract/handle/Quotation";
import { toShowValue, fromShowValue } from "../utils/helper";
import { timestampToDate, timestampToDateTime } from "../utils/helper";
import { keplrKeystoreChange } from "../keplr/index";

export default {
  name: "pledge",
  components: { Select },
  data() {
    return {
      isPay:false,
      handType: "redemption",
      userName: "",
      status: 0,
      time_id: 0,
      isShow: false,
      isShowExplain: false,
      dayList: [
        { text: "7 Days", value: "604800" },
        { text: "30 Days", value: "2592000" },
      ],
      NftList: [],
      selectItem: {},
      InterestFee: "",
    };
  },
  filters: {},
   created() {
    localStorage.setItem("selectChain", "Uptick-EVM");
  },
  async mounted() {
     window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
    let accountInfo = await getIirsAccoutInfo();
    this.userName = accountInfo.name;
    await addNetwork();
    await this.getMyList();

    //  getRate();
  },
  methods: {
       keplrKeystoreChange() {
      keplrKeystoreChange();
    },
    
    async mortgageClick(selectItem) {

      try {
        this.isPay =true
         let startTime = Date.parse(new Date()) / 1000;
      console.log("sadwdew", selectItem);

      //质押NFT
      let result = await mortgageNft(
        selectItem.nftAddress,
        selectItem.nftId,
        this.dayList[this.time_id].value
      );
      console.log("mortgageNft",result);
      if (result.hash) {
        let params = {
          nftAddress: selectItem.nftAddress,
          nftId: selectItem.nftId,
          status: 1,
          hash: result.hash,
          price: selectItem.price,
          startTime: startTime,
          period: this.dayList[this.time_id].value,
        };
        let infoResult = await pledgeNFT(params);
        console.log("infoResult",infoResult);
        debugger
        
        if (infoResult.data.code == 0) {
          this.$toast("success", "Mortgage Success").then(() => {
            this.NftList = [];
            this.getMyList();
            this.isPay =false
          });
        } else{
          this.$toast("error", "Mortgage Error");
          this.isPay =false
        }
      }
        
      } catch (error) {

        this.$toast("error", "Mortgage Error");
         this.isPay =false
      }
      
    },
    async getMyList() {
      let params = {
        owner: getEvmAddress(this.$store.state.UptickAddress),
        chainType: "1170",
      };
      let listInfo = await getMyCardList(params);
      let list = listInfo.data.list;
      this.NftList = this.NftList.concat(list);
      // this.NftList.forEach((e) => {
      //   if (e.period) e.period = (Number(e.endTime)- Number(e.startTime))/ 86400;
      //   if (e.startTime) e.startTime = timestampToDate(e.startTime * 1000);
      //   if (e.endTime) e.endTime = timestampToDateTime(e.endTime * 1000);
      //    e.realityPrice = e.price
        
      // });
      
      if (this.NftList.length > 0) {
        this.selectItem = this.NftList[0];
         this.status =  this.NftList[0].status;
        let price = await getPrice(
          this.selectItem.nftAddress,
          this.selectItem.nftId
        );
        console.log('selectItem ====',price);
        debugger
        this.selectItem.price = toShowValue(price.toString());
        this.selectItem.realityPrice = this.NumberMul(Number( this.selectItem.price),Number(0.7))
        // 获取质押费率
        this.InterestFee = await getRate(this.dayList[this.time_id].value);
   
        this.selectItem.fee = this.NumberMul(
          Number(this.InterestFee),
          Number(this.selectItem.realityPrice)
        );
         if( this.selectItem.status == 2)
          this.selectItem.fee = this.NumberMul( this.selectItem.fee,2)
        //获取总价
        this.selectItem.total =this.amend(Number(this.selectItem.fee),Number(this.selectItem.realityPrice),"+")
        this.$forceUpdate();
      }
      this.NftList.forEach((e) => {
        if (e.period) e.period = (Number(e.endTime)- Number(e.startTime))/ 86400;
        if (e.startTime) e.startTime = timestampToDate(e.startTime * 1000);
        if (e.endTime) e.endTime = timestampToDateTime(e.endTime * 1000);
          e.realityPrice =  this.NumberMul(
         Number(0.7),
          Number(e.price)
        );
        
      });
    
    },
    NumberMul(arg1, arg2) {
      var m = 0;
      var s1 = arg1.toString();
      var s2 = arg2.toString();
      try {
        if (s1.indexOf(".") != -1) {
          m += s1.split(".")[1].length;
        }
      } catch (e) {
        console.log(e);
      }
      try {
        if (s2.indexOf(".") != -1) {
          m += s2.split(".")[1].length;
        }
      } catch (e) {
        console.log(e);
      }

      return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
      );
    },
   amend(num1,num2,symbol){
  var str1=num1.toString(),str2=num2.toString(),result,str1Length,str2Length
    //解决整数没有小数点方法
    try {str1Length= str1.split('.')[1].length} catch (error) {str1Length=0}
    try {str2Length= str2.split('.')[1].length} catch (error) {str2Length=0}
    var step=Math.pow(10,Math.max(str1Length,str2Length))
    // 
    console.log(step);
    switch (symbol) {
        case "+":
            result= (num1*step+num2*step)/step
            break;
        case "-":
            result= (num1*step-num2*step)/step
            break;
        case "*":
            result= ((num1*step)*(num2*step)) / step/step
            break;
        case "/":
            result= (num1*step)/(num2*step)
            break;
        default:
            break;
    }
    return result
    
},

    async clickItem(index) {
      this.time_id = index;
      // 获取质押费率
      this.InterestFee = await getRate(this.dayList[this.time_id].value);
    
      this.selectItem.realityPrice = this.NumberMul(Number(this.selectItem.price),Number(0.7))
      //获取总价
        this.selectItem.fee = this.NumberMul(
        Number(this.InterestFee),
        Number(this.selectItem.realityPrice)
      );
     this.selectItem.total =this.amend(Number(this.selectItem.fee),Number(this.selectItem.realityPrice),"+")
      this.$forceUpdate();
    },

    // 赎回
    async redeemClick(selectItem) {

      try {
        this.isPay = true
      let result = await redeemNft(
        selectItem.nftAddress,
        selectItem.nftId,
        fromShowValue(selectItem.total.toString())
      );
     
      if (result.hash) {
        let params = {
          nftAddress: selectItem.nftAddress,
          nftId: selectItem.nftId,
          owner: getEvmAddress(this.$store.state.UptickAddress),
          hash: result.hash,
        };
        let ransom = await ransomNFT(params);
        if (ransom.data.code == 0) {
          this.$toast("success", "Redeem Success").then(() => {
            this.NftList = [];
            this.getMyList();
             this.isPay =false
          });
        } else {
          this.$toast("error", "Ransom Error");
           this.isPay = false
        }
       
      } 
      } catch (error) {
        this.$toast("error", "Ransom Error");
        this.isPay = false
      }
    
    
    },
    // 点击切换
    async Mortgage(item) {
      console.log('item',item);
      this.selectItem = item;
      let price = await getPrice(
        this.selectItem.nftAddress,
        this.selectItem.nftId
      );
      this.selectItem.price = toShowValue(price.toString());
      // this.selectItem.price =14
      this.status = item.status;
      if (this.status == 1) {
        this.handType = "redemption";
        // 赎回获取Fee
        let result = await getPledgeInfo(item.nftAddress,item.nftId);
        console.log("result ", result);

        // 获取质押费率
      // this.InterestFee = parseInt(result._rate._hex,16)/1000;
      this.InterestFee = await getRate(this.dayList[this.time_id].value);
      // let price = parseInt(result._value._hex,16)/0.7

      let price  = this.amend(Number(parseInt(result._value._hex,16)),Number(0.7),"/")
      price = toShowValue(price.toString())
       this.selectItem.price = price
      console.log("InterestFee", this.InterestFee,price);
      this.selectItem.realityPrice = this.NumberMul(Number(this.selectItem.price),Number(0.7))
      this.selectItem.fee = this.NumberMul(
        Number(this.InterestFee),
       this.selectItem.realityPrice
      );
       if( this.selectItem.status == 2)
          this.selectItem.fee = this.NumberMul( this.selectItem.fee,2)
   
      // 获取总价
      this.selectItem.total =this.amend(Number(this.selectItem.fee),Number(this.selectItem.realityPrice),"+")
      this.$forceUpdate();
      }else{
          // 获取质押费率
      this.InterestFee = await getRate(this.dayList[this.time_id].value);
       this.selectItem.realityPrice = this.NumberMul(Number(this.selectItem.price),Number(0.7))
      this.selectItem.fee = this.NumberMul(
        Number(this.InterestFee),
        Number(this.selectItem.realityPrice)
      );
       if( this.selectItem.status == 2)
          this.selectItem.fee = this.NumberMul( this.selectItem.fee,2)
      // 获取总价
      this.selectItem.total =this.amend(Number(this.selectItem.fee),Number(this.selectItem.realityPrice),"+")
      this.$forceUpdate();
      }

    
    },
    // 延期
    async renewalClick(item){

      try {
        this.isPay = true
         let result = await postponeNft(item.nftAddress,item.nftId)
           console.log("result",result);
        //            nftAddress: string;
        //   nftId: string;
        //   owner: string;
        //  hash: string;
        //  period: number;
           if(result.hash){
             let params ={
               nftAddress:item.nftAddress,
               nftId:item.nftId,
               owner:getEvmAddress(this.$store.state.UptickAddress),
               hash:result.hash
             }
           let renewal =  await renewalNFT(params)
           console.log(renewal);
            if (renewal.data.code == 0) {
          this.$toast("success", "Renewal Success").then(() => {
              this.handType = "redemption";
            this.NftList = [];
            this.getMyList();
            this.isPay = false
          });
        } else {
          this.$toast("error", "Ransom Error");
          this.isPay = false
        }
           }
        
      } catch (error) {
        this.$toast("error", "Ransom Error");
         this.isPay = false
      }
    
    
    },
    toPage() {
      //  this.$router.push({name:"renewal"})
      this.handType = "renew";
      setTimeout(()=>{
          this.selectItem.fee = this.selectItem.fee *2
          this.selectItem.total =this.amend(Number(this.selectItem.fee),Number(this.selectItem.realityPrice),"+")
          this.$forceUpdate()
      },500)
    },
    showList() {
      this.isShow = !this.isShow;
    },
    moused() {
      this.isShowExplain = true;
    },
    leave() {
      this.isShowExplain = false;
    },
    disconnect() {
      localStorage.clear();
      this.$store.commit("SET_DID", "");
      this.$store.commit("SET_UPTICK_DID", "");
      this.$store.commit("SET_EVM_DID", "");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang='scss' scoped>
    .sub-dis {
    position: relative;
    pointer-events: none;
    background-image: linear-gradient(
      #766983, 
      #766983), 
     linear-gradient(
      #270645, 
      #270645) !important;
     background-blend-mode: normal, 
      normal;
     border-radius: 25px;
     opacity: 0.9;
}
.sub-dis::after {
    content: "";
    background-image: url(../assets/loading.gif);
    background-size: 100%;
    display: inline-block;
    position: absolute;
    width: 20px;
    height: 20px;
   margin-left: 10px;
   margin-top: 0px;
}
.logo{
  width: 255px;
	height: 38px;
}

.title1 {
  text-align: center;
  font-family: "MuseoModerno-SemiBold";
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #ffffff;
}
.select {
  .filter {
    display: flex;
    align-items: flex-end;
  }

  .userName {
    font-family: "MuseoModerno-Regular";
    font-size: 35px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 40px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .address {
    font-family: "AdobeHeitiStd-Regular";
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ffffff;
    .btn {
      width: 93px;
      height: 33px;
      background-color: #301f4b;
      border-radius: 16px;
      font-family: "MuseoModerno-Regular";
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 20px;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
}
.Form {
  width: 100%;
  height: 75px;
  background-image: linear-gradient(90deg, #54e161 0%, #4e1dc7 100%);
  border-radius: 5px;
  font-family: "MuseoModerno-SemiBold";
  font-size: 17px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #ffffff;

  .name {
    width: 25%;
  }
  .none {
    width: 10%;
  }
  .transfer {
    text-align: center;
    width: 30%;
  }
}
.nftlist {
  width: 100%;
  margin-bottom: 135px;
  .left {
    width: 74%;
    height: 598px;
    overflow-y: auto;
    .list {
      .opacitys {
        opacity: 0.3;
      }
      .listItem {
        width: 98.5%;
        .nfts {
          width: 30%;
          .img {
            width: 81px;
            height: 81px;
            object-fit: cover;
            margin-top: 16px;
          }
          .Nftname {
            width: 58%;
            font-family: "MuseoModerno-Regular";
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 20px;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
        .Mortgage {
          width: 20%;
          text-align: center;
          font-family: "MuseoModerno-SemiBold";
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 20px;
          letter-spacing: 0px;
          color: #ffffff;
        }
        .time {
          width: 35%;
          text-align: center;
          font-family: "MuseoModerno-Regular";
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 18px;
          letter-spacing: 0px;
          color: #ffffff;
        }
        .btn {
          margin-left: 1%;
          width: 112px;
          height: 33px;
          background-color: #54df62;
          border-radius: 16px;
          font-family: "MuseoModerno-SemiBold";
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 20px;
          letter-spacing: 0px;
          color: #611ecd;
        }
        .btn2 {
          margin-left: 1%;
          width: 112px;
          height: 33px;
          background-color: #4e1dc7;
          border-radius: 16px;
          font-family: "MuseoModerno-SemiBold";
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 20px;
          letter-spacing: 0px;
          color: #54df62;
        }
        .faild {
          margin-left: 3%;
          width: 80px;
          height: 80px;
        }

        &:hover {
          background: #1d0952;
        }
        .line {
          width: 100%;
          height: 1px;
          border: solid 0.5px #611ecd;
        }
      }
    }
  }
  .redeem {
    width: 26%;
    height: 100px;
    height: 598px;
    background-color: #1a1a53;
    border-radius: 5px;
    border: solid 1px #611ecd;
    .title-14 {
      font-family: "MuseoModerno-SemiBold";
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 16px;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .title-25 {
      width: 100%;
      text-align: center;
      font-family: "MuseoModerno-SemiBold";
      font-size: 25px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 30px;
      letter-spacing: 0px;
      color: #54df62;
    }
    .title-13 {
      font-family: "MuseoModerno-Regular";
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 13px;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .price {
      font-family: "MuseoModerno-SemiBold";
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 16px;
      letter-spacing: 0px;
      color: #54df62;
    }
    .contant {
      margin: 18px 28px 0 25px;
      .title {
        display: flex;
        justify-content: center;
        font-family: "MuseoModerno-SemiBold" !important;
        font-size: 20px !important;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #ffffff;
      }
      .baseInfo {
        .ava {
          width: 61px;
          height: 61px;
          border-radius: 5px;
          object-fit: cover;
        }
        .nftname {
          font-family: "MuseoModerno-Regular";
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 20px;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
      .submit {
        width: 100%;
        height: 41px;
        background-color: #4e1dc7;
        border-radius: 20px;
        font-family: "MuseoModerno-SemiBold" !important;
        font-size: 15px !important;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #54df62;
      }
      .help {
        cursor: pointer;
        width: 100%;
        display: flex;
        justify-content: center;
        font-family: "MuseoModerno-Regular";
        text-decoration: underline;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #ffffff;
      }
      .Ransom {
        height: 152px;
        background-color: #4e1dc7;
        border-radius: 5px;
        .content {
          padding: 16px 10px;
          height: 122px;

          border-radius: 5px;

          .details {
            padding: 15px 25px 0px;
            background-color: #36148e;

            .title {
              font-family: "MuseoModerno-SemiBold";
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 20px;
              letter-spacing: 0px;
              color: #ffffff;
            }
            .Info {
              .leftItem {
                text-align: center;
                .Principal {
                  height: 11px;
                  font-family: "MuseoModerno-Regular";
                  font-size: 10px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 6px;
                  letter-spacing: 0px;
                  color: #af8eff;
                }
                .prices {
                  width: 107%;
                  height: 9px;
                  font-family: "MuseoModerno-Regular";
                  font-size: 10px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 14px;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
              }
            }
          }
        }
      }
    }
  }
  .right {
    width: 26%;
    height: 100px;
    height: 598px;
    background-color: #1a1a53;
    border-radius: 5px;
    border: solid 1px #611ecd;
    .title-14 {
      font-family: "MuseoModerno-SemiBold";
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 16px;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .title-13 {
      font-family: "MuseoModerno-Regular";
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 13px;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .price {
      font-family: "MuseoModerno-SemiBold";
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 16px;
      letter-spacing: 0px;
      color: #54df62;
    }
    .selectList {
      position: relative;
      height: 41px;
      background-color: #351e82;
      border-radius: 5px;
      display: flex;
      align-items: center;
      .icon {
        position: absolute;
        right: 10px;
        width: 12px;
        height: 6px;
      }
      .date {
        font-family: "MuseoModerno-SemiBold";
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #ffffff;
        padding-left: 12px;
      }
    }
    .list {
      z-index: 100;
      padding: 16px 0 0 12px;
      position: absolute;
      top: 45px;
      right: 0;
      width: 100%;
      height: 81px;
      background-color: #351e82;
      border-radius: 5px;
      .dayName {
        cursor: pointer;
        font-family: "MuseoModerno-SemiBold";
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .contant {
      margin: 18px 28px 0 25px;
      .title {
        display: flex;
        justify-content: center;
        font-family: "MuseoModerno-SemiBold" !important;
        font-size: 20px !important;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #ffffff;
      }
      .baseInfo {
        .ava {
          width: 61px;
          height: 61px;
          border-radius: 5px;
          object-fit: cover;
        }
        .nftname {
          font-family: "MuseoModerno-Regular";
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 20px;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
      .submit {
        height: 41px;
        background-color: #54df62;
        border-radius: 20px;
        font-family: "MuseoModerno-SemiBold" !important;
        font-size: 15px !important;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #4e1dc7;
      }
      .help {
        width: 100%;
        display: flex;
        justify-content: center;
        font-family: "MuseoModerno-Regular";
        text-decoration: underline;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #ffffff;
      }
      .Ransom {
        height: 228px;
        background-color: #4e1dc7;
        border-radius: 5px;
        position: relative;
        .IconInfo {
          width: 15px;
          height: 15px;
          position: absolute;
          top: 5px;
          right: 5px;
        }
        .explain {
          padding: 15px;
          position: absolute;
          top: 20px;
          right: 5px;
          width: 295px;
          height: 270px;
          background-color: #000000;
          border-radius: 5px;
          .title-12 {
            font-family: "MuseoModerno-Regular";
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 20px;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
        .title-25 {
          width: 100%;
          text-align: center;
          font-family: "MuseoModerno-SemiBold";
          font-size: 25px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 30px;
          letter-spacing: 0px;
          color: #54df62;
        }
        .content {
          margin: 16px 10px;
          height: 122px;
          background-color: #36148e;
          border-radius: 5px;

          .details {
            padding: 10px 25px 5px;

            .title {
              font-family: "MuseoModerno-SemiBold" !important;
              font-size: 16px !important;
              font-weight: normal;
              font-stretch: normal;
              line-height: 20px;
              letter-spacing: 0px;
              color: #ffffff;
            }
            .Info {
              .leftItem {
                text-align: center;
                .Principal {
                  height: 11px;
                  font-family: "MuseoModerno-Regular";
                  font-size: 10px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 6px;
                  letter-spacing: 0px;
                  color: #af8eff;
                }
                .prices {
                  width: 107%;
                  height: 9px;
                  font-family: "MuseoModerno-Regular";
                  font-size: 10px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 14px;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
              }
            }
          }
        }
      }
    }
  }
}
.wallet {
  margin-left: 34%;
  margin-top: 180px;
  width: 376px;
  height: 61px;
  background-color: #4e1dc7;
  border-radius: 29px;
  font-family: "MuseoModerno-SemiBold";
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #54df62;
}
::-webkit-scrollbar {
  width: 4px; /* 设置滚动条宽度 */

}

::-webkit-scrollbar-thumb {
  background-color: #611ecd; /* 设置滚动条的颜色 */
  border-radius: 2px; /* 设置滚动条的圆角 */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #aaa; /* 设置滚动条的鼠标悬停颜色 */
}
.renewal {
  height: 228px;
  background-color: #4e1dc7;
  border-radius: 5px;
  position: relative;
  .submit1 {
    width: 100%;
    height: 41px;
    background-color: #54df62;
    border-radius: 20px;
    font-family: "MuseoModerno-SemiBold" !important;
    font-size: 15px !important;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #4e1dc7;
  }
  .IconInfo {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .explain {
    padding: 15px;
    position: absolute;
    top: 20px;
    right: 5px;
    width: 295px;
    height: 270px;
    background-color: #000000;
    border-radius: 5px;
    .title-12 {
      font-family: "MuseoModerno-Regular";
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 20px;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
  .title-25 {
    width: 100%;
    text-align: center;
    font-family: "MuseoModerno-SemiBold";
    font-size: 25px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #54df62;
  }
  .content {
    margin: 16px 10px;
    height: 122px;
    background-color: #36148e;
    border-radius: 5px;

    .details {
      padding: 10px 25px 5px;

      .title1 {
        font-family: "MuseoModerno-SemiBold" !important;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #ffffff;
      }
      .Info {
        .leftItem {
 
          text-align: center;
          .Principal {
            height: 11px;
            font-family: "MuseoModerno-Regular";
            font-size: 10px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 6px;
            letter-spacing: 0px;
            color: #af8eff;
          }
          .prices {
            width: 107%;
            height: 9px;
            font-family: "MuseoModerno-Regular";
            font-size: 10px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 14px;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
  
      