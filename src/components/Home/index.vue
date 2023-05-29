<template>
  <div class="Home ">
     <img class="logo" src="@/assets/logo.png" alt="" />
    <!-- <div class="select">
      <Select  v-if="$store.state.IrisAddress"/>
    </div> -->
    <div class="NftList mt-5 d-flex align-center">
      <div class="name">NFTs</div>
    </div>
    <button class="wallet"  @click="connectWallet">Connect Wallet</button>

  </div>
</template>

<script>
import Select from "../Select/index";
import {
  getkeplrIrisAddress,
  getkeplrUptickAddress,
  initWallet,
} from "../../keplr/index";
import { getEvmAddress } from "../../keplr/uptick/wallet";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: { Select },
  data() {
    return {
      
    }

  },
  filters: {

  },
  async mounted() {
    console.log("$store.state.did",this.$store.state.IrisAddress);
   await initWallet();


  },
  methods: {
        async connectWallet() {
          
      // Iris Address
      let account = await getkeplrIrisAddress();
      this.$store.commit("SET_DID", account.toLowerCase());
      // uptick Address
      let uptickAccount = await getkeplrUptickAddress();
      this.$store.commit("SET_UPTICK_DID", uptickAccount.toLowerCase());
      //EVM address
      let evmAddress = getEvmAddress(uptickAccount)
      this.$store.commit("SET_EVM_DID", evmAddress.toLowerCase());
      if (account && uptickAccount) {
        this.$router.push({ name: "crossChain" });
      }
    },

  },

}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.logo{
  width: 255px;
	height: 38px;
}

.select {
  display: flex;
  justify-content: right;
}

.NftList {
  width: 100%;
  height: 75px;
  background-image: linear-gradient(90deg,
      #54e161 0%,
      #4e1dc7 100%);
  border-radius: 5px;

  .name {
    font-family: "MuseoModerno-SemiBold";
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ffffff;
    margin-left: 9%;
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
</style>
