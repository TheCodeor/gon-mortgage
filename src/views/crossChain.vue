      
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
        <Select @chainChange="ChainChange" />
      </div>
    </div>
    <div class="Form mt-5 d-flex align-center">
      <div class="name">NFTs</div>
      <div class="transfer">Cross-chain Transfer</div>
    </div>
    <div class="nftlist d-flex flex-row mt-5" v-if="NftList.length > 0">
      <div class="left">
        <div class="listItem d-flex flex-column" v-for="(item, index) in NftList" :key="index" @click="itemClick(item)">
          <div class="d-flex flex-row align-center">
            <img class="img ml-5" :src="item.imgUrl" alt="" />
            <div class="Nftname ml-4">
              {{ item.name }}
            </div>
          </div>

          <div class="line mt-4"></div>
        </div>
      </div>
      <div class="right">
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
          <button class="submit mt-6" @click="submit()">Submit</button>
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
import { getMyCardList } from "@/api/home";
import { iris2Uptick } from "/src/keplr/uptick/wallet"
import { getNftImg } from "/src/api/image";
export default {
  name: "crossChain",
  components: { Select },
  data() {
    return {
      userName: "",
      NftList: [

      ],
      crossName: '',
      crossSrc: '',
      selectItem: {}
    };
  },
  filters: {},
   created() {
    localStorage.setItem("selectChain", "IRISnet");
  },
  async mounted() {
    let accountInfo = await getIirsAccoutInfo();
    this.userName = accountInfo.name;
    this.getMyList();
  },
  methods: {
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
    ChainChange(chainId) {
      console.log("ChainChange", chainId);


    },
    disconnect() {
      localStorage.clear();
      this.$store.commit("SET_DID", "");
      this.$store.commit("SET_UPTICK_DID", "");
      this.$router.push({ name: "Home" });
    },
    async submit() {
      console.log("item", this.selectItem);
      try {
        //执行跨链操作
        let result = await iris2Uptick(this.selectItem.nftAddress, this.selectItem.nftId)
        console.log(result)
        this.$router.push({ name: "withdrawConvert" });

      } catch (error) {
        this.$toast("error", error.message)
      }
 

    },
    itemClick(item) {
      console.log("item", item);
      this.crossName = item.name
      this.crossSrc = item.imgUrl
      this.selectItem = item
    }
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
    width: 74%;
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
  
      