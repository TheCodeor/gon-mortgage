<template>
  <div class="Home ">
    <div class="Title">CreditWise</div>
    <div class="select">
      <Select />
    </div>
    <div class="NftList mt-5 d-flex align-center">
      <div class="name">NFTs</div>
    </div>
    <button class="wallet">Connect Wallet</button>

  </div>
</template>

<script>
import Select from "../Select/index";
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


  },
  methods: {

  },

}

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
