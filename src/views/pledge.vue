      
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
                :class="{ opacitys: item.state == '3' }"
              >
                <img class="img ml-5" :src="item.src" alt="" />
                <div class="Nftname ml-4">
                  Wake up, Astro Boy!Wake up, Astro Boy!
                </div>
              </div>
              <div class="Mortgage" :class="{ opacitys: item.state == '3' }">
                Not Mortgaged
              </div>
              <div class="time" :class="{ opacitys: item.state == '3' }">
                2023.5.15 ~ 2023.6.14 18:00:00 <br /><span>30 Days</span>
              </div>
              <button
                class="btn"
                v-if="item.state == '1'"
                :class="{ opacitys: item.state == '3' }"
                @click="Mortgage(item)"
              >
                Mortgage
              </button>
              <button
                class="btn2"
                v-else-if="item.state == '2'"
                :class="{ opacitys: item.state == '3' }"
                @click="Mortgage(item)"
              >
                Redeem
              </button>
              <img
                v-else-if="item.state == '3'"
                class="faild"
                src="@/assets/confiscated.png"
                alt=""
              />
            </div>

            <div class="line mt-4"></div>
          </div>
        </div>
      </div>
      <!-- 质押操作 -->
      <div class="right" v-if="status == 1">
        <div class="contant d-flex flex-column">
          <div class="title">Mortgage</div>
          <div class="baseInfo d-flex flex-row align-center">
            <img
              src="https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small"
              class="ava"
              alt=""
            />
            <div class="nftname ml-4">Wake up, Astro Boy!</div>
          </div>
          <div class="title-14 mt-5">Current Appraised Value :</div>
          <div class="price mt-2">100 UPTICK</div>
          <div class="title-14 mt-5">Mortgage Period :</div>
          <div class="selectList mt-2" @click="showList">
            <div class="date">7 Days</div>
            <img src="@/assets/icon_u.png" class="icon" alt="" />
            <div  v-for="(item,index) in dayList" :key="index">
               <div class="list" v-if="isShow">
                 <div v-for="(item,index) in dayList" :key="index">
                       <div class="dayName" @click="clickItem(index)">{{item.text}}</div>     
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
            <div class="title-25 mt-2">70 UPTICK</div>
            <div class="content">
              <div class="details">
                <div class="title">Ransom</div>
                <div class="Info d-flex flex-row align-center">
                  <div class="leftItem mt-2">
                    <div class="Principal">Principal</div>
                    <div class="prices">70 UPTICK</div>
                  </div>

                  <div class="mt-2 ml-7 mr-7" style="color: #ffffff">+</div>
                  <div class="leftItem mt-2">
                    <div class="Principal">Interest</div>
                    <div class="prices">0.7 UPTICK</div>
                  </div>

                  <!-- <div class="Interest">Interest</div> -->
                </div>
                <div class="title-25 mt-4">70.7 UPTICK</div>
              </div>
            </div>
          </div>
          <button class="submit mt-6">Submit</button>
        </div>
      </div>
      <!-- 赎回操作 -->
      <div class="redeem" v-else>
        <div class="contant d-flex flex-column">
          <div class="title">Redeem</div>
          <div class="baseInfo d-flex flex-row align-center">
            <img
              src="https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small"
              class="ava"
              alt=""
            />
            <div class="nftname ml-4">Wake up, Astro Boy!</div>
          </div>
          <div class="title-14 mt-5">Current Appraised Value :</div>
          <div class="price">100 UPTICK</div>
          <div class="title-14 mt-5">Mortgage amount :</div>
          <div class="price">100 UPTICK</div>
          <div class="title-14 mt-5">Mortgage Period :</div>
          <div class="title-13 mt-3">
            2023.5.15 ~ 2023.6.14 18:00:00 30 Days
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
                      <div class="prices">70 UPTICK</div>
                    </div>

                    <div class="mt-4 ml-7 mr-7" style="color: #ffffff">+</div>
                    <div class="leftItem mt-4">
                      <div class="Principal">Interest</div>
                      <div class="prices">0.7 UPTICK</div>
                    </div>
                    <!-- <div class="Interest">Interest</div> -->
                  </div>
                  <div class="title-25 mt-4">70.7 UPTICK</div>
                </div>
              </div>
            </div>
            <div class="help mt-4" @click="toPage">I want to postpone</div>
            <button class="submit mt-6">Submit</button>
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
              <div class="title-25 mt-2">70 UPTICK</div>
              <div class="content">
                <div class="details">
                  <div class="title1">Ransom</div>
                  <div class="Info d-flex flex-row align-center">
                    <div class="leftItem mt-2">
                      <div class="Principal">Principal</div>
                      <div class="prices">70 UPTICK</div>
                    </div>

                    <div class="mt-2 ml-7 mr-7" style="color: #ffffff">+</div>
                    <div class="leftItem mt-2">
                      <div class="Principal">Interest</div>
                      <div class="prices">0.7 UPTICK</div>
                    </div>

                    <!-- <div class="Interest">Interest</div> -->
                  </div>
                  <div class="title-25 mt-4">70.7 UPTICK</div>
                </div>
              </div>
              <button class="submit1 mt-6">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Select from "../components/Select/index";
import { getIirsAccoutInfo } from "../keplr/iris/wallet";
export default {
  name: "pledge",
  components: { Select },
  data() {
    return {
      handType: "redemption",
      userName: "",
      status: "1",
      isShow: false,
      isShowExplain: false,
      dayList:[
        {text:"7 Days"},
        {text:"30 Days"}
      ],
      NftList: [
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
          state: 1,
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
          state: 2,
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
          state: 3,
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
          state: 1,
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
          state: 1,
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
          state: 1,
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
          state: 2,
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
        },
        {
          src:
            "https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small",
          state: 3,
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
    clickItem(index){
      this.cli
    },
    Mortgage(item) {
      console.log(item);
      this.status = item.state;
      if (this.status == 2) {
        this.handType = "redemption";
      }
    },
    toPage() {
      //  this.$router.push({name:"renewal"})
      this.handType = "renew";
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
        width: 100%;
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
          border: solid 1px #611ecd;
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
        line-height: 21px;
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
  
      