<template>
  <div class="Select">
    <button class="filter" @click="isShow">
      {{ selectChainName }}
      <img class="icon" src="@/assets/icon_u.png" v-if="!isshow" alt="" />
      <img class="icon" src="@/assets/icon_d.png" v-else alt="" />
    </button>
    <div class="list" v-if="isshow">
      <div class="listItem" v-for="(item, index) in list" :key="index">
        <div class="name" @click="clickItem(item.chainNmme, item.chainId)">
          {{ item.chainNmme }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Select",
  components: {},
  data() {
    return {
      selectChainName: "IRISnet",
      list: [
        {
          chainNmme: "IRISnet",
          chainId: "gon-irishub-1",
        },
        {
          chainNmme: "Uptick-COSMOS",
          chainId: "origin_1170-1",
        },
        {
          chainNmme: "Uptick-EVM",
          chainId: "origin_1170-2",
        },
      ],
      isshow: false,
    };
  },
  filters: {},
  async mounted() {
    let chainObj = localStorage.getItem("selectChain");
    if (!chainObj) {
      localStorage.setItem("selectChain", "IRISnet");
    } else {
      this.selectChainName = chainObj;
      this.$emit("chainChange", chainObj);
    }
  },
  methods: {
    isShow() {
      this.isshow = !this.isshow;
    },
    showPage2chainID(){

    },
    clickItem(chainName, chainId) {
      this.$store.commit("SET_CHAIN", chainId);
      this.isshow = false;
      this.selectChainName = chainName;
      this.$emit("chainChange", chainId);
      localStorage.setItem("selectChain", chainName);
      if (chainId == "origin_1170-1") {
        this.$router.push({ name: "withdrawConvert" });
      } else if (chainId == "origin_1170-2") {
        this.$router.push({ name: "pledge" });
      } else {
        this.$router.push({ name: "crossChain" });
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.Select {
  position: relative;
  .filter {
    width: 145px;
    height: 41px;
    background-color: #4e1dc7;
    border-radius: 20px;
    font-family: "MuseoModerno-SemiBold";
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #54df62;
    .icon {
      width: 12px;
      height: 9px;
    }
  }
  .list {
    position: absolute;
    right: 0;
    top: 46px;
    width: 150px;
    background-color: #351e82;
    border-radius: 5px;
    .listItem {
      margin: 15px;
      .name {
        cursor: pointer;
        font-family: "MuseoModerno-SemiBold";
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 21px;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
}
</style>
