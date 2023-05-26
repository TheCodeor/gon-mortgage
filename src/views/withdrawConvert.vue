      
<template>
  <div class="Home">
    <div class="Title">CreditWise</div>
    <div class="select d-flex flex-row justify-space-between">
      <div>
        <div class="userName">{{ userName }}</div>
        <div class="address">
          {{ $store.state.IrisAddress }}
          <button class="btn ml-9" @click="disconnect">Disconnect</button>
        </div>
      </div>
      <div class="filter">
        <img src="@/assets/refresh.png" class="mr-2 mt-4" v-if="canClick" style="width: 30px; height: 30px;" alt="" @click="Reload" />
         <div class="second mr-2 mt-4" v-if="!canClick">{{ second }}</div>
        <Select />
      </div>
    </div>
    <div class="Form mt-5 d-flex align-center">
      <div class="name">NFTs</div>
      <div class="transfer">Cross-chain Transfer</div>
    </div>
    <div class="nftlist d-flex flex-row mt-5">
      <div class="left">
        <div class="listItem d-flex flex-column" v-for="(item, index) in NftList" :key="index">
          <div class="d-flex flex-row align-center">
            <img class="img ml-5" :src="item.imgUrl" alt="" />
            <div class="Nftname ml-4">
              {{ item.name }}
            </div>
            <div class="withdraw"  @click="withdrowButtonClick(item,index)">
              <div  :class="index === selectItem ?'sub-dis' : ''">Withdraw to IRISnet</div>
            </div>
            <div class="convert"  @click="convertButtonClick(item,index)">
              <div :class="index === convertItem ?'sub-dis' : ''">Convert to Uptick-EVM</div>
            </div>
          </div>

          <div class="line mt-4"></div>
        </div>
      </div>
    </div>
    <!-- <button class="wallet">Connect Wallet</button> -->
    <uComponents ref="ucom"></uComponents>
  </div>
</template>
  
<script>
import Select from "../components/Select/index";
import { getIirsAccoutInfo } from "../keplr/iris/wallet";
import { getMyCardList,conventNFT,updateUser } from "@/api/home";
import { uptick2Iris, convertCosmosNFT2ERC } from "/src/keplr/uptick/wallet"

export default {
  name: "crossChain",
  components: { Select },
  data() {
    return {
       isPay:false,
       selectItem:'',
       convertItem:'',
      userName: "",
      NftList: [

      ],
          canClick: true,
      second: 10,
      timer: null,
    };
  },
  filters: {},
  created() {
    localStorage.setItem("selectChain", "Uptick-COSMOS");
  },
  async mounted() {
    let accountInfo = await getIirsAccoutInfo();
    this.userName = accountInfo.name;
    this.getMyList();
  },
  methods: {
     async Reload() {
      if (!this.canClick) {
        return;
      }
      this.canClick = false;
      this.timer = setInterval(() => {
        this.second--;
        if (this.second === 0) {
          clearInterval(this.timer);
          this.canClick = true;
          this.second = 10;
        }
      }, 1000);

      let params = {
        //this.$store.state.uptickAddress,this.$store.state.IrisAddress
         owner: this.$store.state.UptickAddress,
      };
      let result = await updateUser(params)
      console.log(result)
       this.NftList =[]
      await this.getMyList();

    },
    async getMyList() {
      let params = {
        owner: this.$store.state.UptickAddress,
        chainType: 'origin_1170-1',
      }
      let listInfo = await getMyCardList(params);
      let list = listInfo.data.list;
      this.NftList = this.NftList.concat(list);

    },
    async withdrowButtonClick(item,index) {
      this.selectItem = index
      console.log("withdraw");
      console.log(item)
      //跨回去iris
      try {
        this.isPay = true
        let result = await uptick2Iris(item.nftAddress, item.nftId)
        console.log(result)
        this.$router.push({ name: "crossChain" });
      } catch (error) {
        this.$toast("error", error.message)
         this.isPay = false
         this.selectItem = ''
      }

    },
    async convertButtonClick(item,index) {
       this.convertItem = index
      console.log("convert");
      console.log(item)
      try {
           this.isPay = true
        let result = await convertCosmosNFT2ERC(item.nftAddress, item.nftId)
        let evmAddress = result.evmAddress
         let uptickAddress = result.uptickAddress
         const logInfo = JSON.parse(result.rawLog)
         let nftAddress = logInfo[0].events[0].attributes[4].value
         let nftId = logInfo[0].events[0].attributes[5].value
        console.log("result",evmAddress,uptickAddress,nftAddress,nftId)
        let conventParms = {
          evmOwner:result.evmAddress,
          evmNftAddress:nftAddress,
          evmNftId:nftId,
        }
        let bodyParams = {
          nftAddress:item.nftAddress,
          nftId:item.nftId,
          owner:result.uptickAddress,
          chainType:'1170'
        }
       let conventResult = await conventNFT(conventParms,bodyParams)
       console.log("conventResult",conventResult);
        this.$router.push({ name: "pledge" });
      } catch (error) {
           this.isPay = false
           this.convertItem = ''
        this.$toast("error", error.message)
      }
    },
    disconnect() {
      localStorage.clear();
      this.$store.commit("SET_DID", "");
      this.$store.commit("SET_UPTICK_DID", "");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.Title {
  font-family: "MuseoModerno-Regular";
  font-size: 50px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 70px;
  letter-spacing: 0px;
  color: #54df62;
}

.select {
  .filter {
    display: flex;
    align-items: flex-end;
       .second {
  padding-top: 5px;
  background-color: #611ecd;
  color: #fb599b;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  text-align: center;
  font-family: "AmpleSoft" !important;
   font-size: 15px !important;

}
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
    width: 80%;
    padding-left: 10%;
  }

  .transfer {
    width: 20%;
  }
}

.nftlist {
  width: 100%;
  margin-bottom: 135px;

  .left {
    width: 100%;
    height: 598px;
    overflow-y: auto;

    .listItem {
      &:hover {
        background: #1d0952;
      }

      .line {
        width: 100%;
        height: 1px;
        border: solid 1px #611ecd;
      }

      .img {
        width: 81px;
        height: 81px;
        object-fit: cover;
        margin-top: 16px;
        border-radius: 5px;
      }

      .Nftname {
        width: 55%;
        font-family: "MuseoModerno-Regular";
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #ffffff;
        padding-right: 30px;
      }

      .withdraw {
        cursor: pointer;
        width: 240px;
        height: 33px;
        background-color: #4e1dc7;
        border-radius: 16px;
        font-family: "MuseoModerno-SemiBold";
        font-size: 15px;
        text-align: center;
        font-weight: normal;
        font-stretch: normal;
        line-height: 35px;
        letter-spacing: 0px;
        color: #54df62;
        margin-right: 20px;
      }
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
    width: 15px;
    height: 15px;
   margin-left: 5px;
   margin-top: 10px;
}

      .convert {
         cursor: pointer;
        width: 240px;
        height: 33px;
        background-color: #54df62;
        border-radius: 16px;
        font-family: "MuseoModerno-SemiBold";
        font-size: 15px;
        text-align: center;
        font-weight: normal;
        font-stretch: normal;
        line-height: 35px;
        letter-spacing: 0px;
        color: #611ecd;
        margin-right: 20px;
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
  width: 4px;
  /* 设置滚动条宽度 */
}

::-webkit-scrollbar-thumb {
  background-color: #611ecd;
  /* 设置滚动条的颜色 */
  border-radius: 2px;
  /* 设置滚动条的圆角 */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #aaa;
  /* 设置滚动条的鼠标悬停颜色 */
}
</style>
  
      