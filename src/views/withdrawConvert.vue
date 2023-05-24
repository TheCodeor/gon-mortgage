      
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
        <Select />
      </div>
    </div>
    <div class="Form mt-5 d-flex align-center">
      <div class="name">NFTs</div>
      <div class="transfer">Cross-chain Transfer</div>
    </div>
    <div class="nftlist d-flex flex-row mt-5">
      <div class="left">
        <div
          class="listItem d-flex flex-column"
          v-for="(item, index) in NftList"
          :key="index"
        >
          <div class="d-flex flex-row align-center">
            <img class="img ml-5" :src="item.src" alt="" />
            <div class="Nftname ml-4">
              Wake up, Astro Boy!Wake up, Astro Boy!Wake up, Astro Boy!Wake up,
              Astro Boy!Wake up, Astro Boy!Wake up, Astro Boy!
            </div>
            <div class="withdraw" @click="withdrowButtonClick">
              <div>Withdraw to IRISnet</div>
            </div>
            <div class="convert" @click="convertButtonClick">
              <div>Convert to Uptick-EVM</div>
            </div>
          </div>

          <div class="line mt-4"></div>
        </div>
      </div>
    </div>
    <!-- <button class="wallet">Connect Wallet</button> -->
  </div>
</template>
  
<script>
import Select from "../components/Select/index";
import { getIirsAccoutInfo } from "../keplr/iris/wallet";
export default {
  name: "crossChain",
  components: { Select },
  data() {
    return {
      userName: "",
      NftList: [
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
        },
      ],
    };
  },
  filters: {},
  async mounted() {
    let accountInfo = await getIirsAccoutInfo();
    this.userName = accountInfo.name;
  },
  methods: {
    withdrowButtonClick() {
      console.log("withdraw");
    },
    convertButtonClick() {
      console.log("convert");
      // this.router.push({name:'redemption'})
      this.$router.push({ name: "pledge" });
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
        width: 218px;
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

      .convert {
        width: 218px;
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
  
      