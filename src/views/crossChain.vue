      
<template>
  <div class="Home">
    <img class="logo" src="@/assets/logo.png" alt="" />
    <div class="select d-flex flex-row justify-space-between">
      <div>
        <div class="userName">{{ userName }}</div>
        <div class="address">
          {{ $store.state.IrisAddress }}
          <button class="btn ml-9" @click="disconnect">Disconnect</button>
        </div>
      </div>
      <div class="filter ">
       
        <Select @chainChange="ChainChange" />
          <img src="@/assets/refresh.png" class="ml-2 mb-1"  :class="[rotate ? 'go' : '']"  style="width: 30px; height: 30px;" alt="" @click="Reload" />
         
      </div>
    </div>
    <div class="Form mt-5 d-flex align-center">
      <div class="name">NFTs</div>
      <div class="transfer">Cross-chain Transfer</div>
    </div>
    <div class="nftlist d-flex flex-row mt-5" v-if="NftList.length > 0">
      <div class="left">
        <div class="listItem d-flex flex-column" :class="selectId == index ? 'selectItem':''" v-for="(item, index) in NftList" :key="index" @click="itemClick(item,index)">
          <div class="d-flex flex-row align-center">
            <img class="img ml-5" :src="item.imgUrl" alt="" />
            <div class="Nftname ml-4">
              {{ item.name }}
            </div>
          </div>

          <div class="line mt-4"></div>
        </div>
      </div>
      <div class="right ml-2">
        <div class="contant d-flex flex-column">
          <div class="baseInfo d-flex flex-row align-center">
            <img :src="crossSrc" class="ava" alt="" />
            <div class="nftname ml-4">{{ crossName }}</div>
          </div>
          <div class="crossItem mt-7 d-flex flex-row align-center">
            <div class="From ml-5">From</div>
            <img src="@/assets/icon_iris.png" class="Iris ml-6" alt="" />
            <div class="chainName ml-4">IRISnet</div>
          </div>
          <div class="upimg mt-3">
            <img src="@/assets/icon_jt.png" class="img" alt="" />
          </div>
          <div class="crossItem mt-3 d-flex flex-row align-center">
            <div class="From ml-8">To</div>
            <img src="@/assets/icon_upticknetwork.png" class="Iris ml-9" alt="" />
            <div class="chainName ml-4">UptickEVM</div>
          </div>
          <button class="submit mt-6" :class="{'sub-dis': isPay}" @click="submit()">Submit</button>
          <div class="des mt-7">Currently you are doing cross-chain</div>
          <div class="des">
            operations, and you need to complete the following operations:
          </div>
          <div class="des">
            1. Cross-chain transfer the NFTs from the IRISnet chain to the
            Uptick-COSMOS chain.
          </div>
          <div class="des">
            2. Convert Uptick-COSMOS based NFTs to Uptick-EVM based.
          </div>
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
import { getMyCardList,updateUser } from "@/api/home";
import { iris2Uptick } from "/src/keplr/uptick/wallet"
import { getNftImg } from "/src/api/image";
import { keplrKeystoreChange } from "../keplr/index";
export default {
  name: "crossChain",
  components: { Select },
  data() {
    return {
       rotate:false,
      isPay:false,
      userName: "",
      NftList: [

      ],
      crossName: '',
      crossSrc: '',
      selectItem: {},
    
      selectId:0
    };
  },
  filters: {},
   created() {
    localStorage.setItem("selectChain", "IRISnet");
  },
  async mounted() {
     window.addEventListener("keplr_keystorechange", keplrKeystoreChange);
    let accountInfo = await getIirsAccoutInfo();
    this.userName = accountInfo.name;
    this.getMyList();
  },
  methods: {
    keplrKeystoreChange() {
      keplrKeystoreChange();
    },
    async getMyList() {
      let params = {
        owner: this.$store.state.IrisAddress,
        chainType: 'gon-irishub-1',
      }
      let listInfo = await getMyCardList(params);
      let list = listInfo.data.list;
      this.NftList = this.NftList.concat(list);
      if(this.NftList.length > 0){
         this.crossSrc = this.NftList[0].imgUrl
      this.crossName = this.NftList[0].name
      this.selectItem = this.NftList[0]
      }
     
    },
   
    async Reload(){
     this.rotate=true;
     setTimeout(() => { this.rotate=false }, 10000);
       let params = {
        //this.$store.state.uptickAddress,this.$store.state.IrisAddress
         owner: this.$store.state.IrisAddress,
      };
      let result = await updateUser(params)
      console.log(result)
       this.NftList =[]
      await this.getMyList();
    
     
    },
    ChainChange(chainId) {
      console.log("ChainChange", chainId);


    },
    disconnect() {
      localStorage.clear();
      this.$store.commit("SET_DID", "");
      this.$store.commit("SET_UPTICK_DID", "");
        this.$store.commit("SET_EVM_DID", "");
      this.$router.push({ name: "Home" });
    },
    async submit() {

      console.log("item", this.selectItem);
      try {
        this.isPay = true
        //执行跨链操作
        let result = await iris2Uptick(this.selectItem.nftAddress, this.selectItem.nftId)
        console.log(result)
        this.$router.push({ name: "withdrawConvert" });

      } catch (error) {
        this.$toast("error", error.message)
         this.isPay = false
      }
 

    },
    itemClick(item,index) {
      console.log("item", item);
      this.crossName = item.name
      this.crossSrc = item.imgUrl
      this.selectItem = item
      this.selectId = index
    }
  },
};
</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.go {
      transform: rotate(360deg);
      transition: all 10s;
      pointer-events: none;
      user-select: none;
    }


.logo{
  width: 255px;
	height: 38px;
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
// .left:hover {
//     // overflow-y: auto;
//     // scrollbar-width: thin;
//     overflow-y: scroll;
//     scrollbar-color: transparent transparent;
//     scrollbar-track-color: transparent;
//     -ms-scrollbar-track-color: transparent;
//   }
  .left {
    width: 74%;
    height: 598px;
    overflow-y: auto;
  .selectItem{
    background: #1d0952;
  }
    .listItem {
      width: 99%;
      &:hover {
        background: #1d0952;
      }

      .line {
        width: 100%;
        height: 0.5px;
        border: solid 1px #611ecd;
      }

      .img {
        width: 81px;
        height: 81px;
        object-fit: cover;
        margin-top: 16px;
      }

      .Nftname {
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

  .right {
    width: 26%;
    height: 100px;
    height: 598px;
    background-color: #1a1a53;
    border-radius: 5px;
    border: solid 1px #611ecd;

    .contant {
      margin: 26px 29px 0 25px;

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

      .upimg {
        width: 100%;
        display: flex;
        justify-content: center;

        .img {
          width: 16px;
          height: 14px;
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

      .des {
        font-family: "MuseoModerno-Regular";
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #ffffff;
      }

      .crossItem {
        height: 85px;
        background-color: #3d179f;
        border-radius: 5px;

        .From {
          font-family: "MuseoModerno-SemiBold";
          font-size: 17px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 16px;
          letter-spacing: 0px;
          color: #54df62;
        }

        .Iris {
          width: 35px;
          height: 35px;
        }

        .chainName {
          font-family: "MuseoModerno-SemiBold";
          font-size: 17px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 16px;
          letter-spacing: 0px;
          color: #ffffff;
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
  width: 4px;
  scroll-margin-left:10px;
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
}</style>
  
      