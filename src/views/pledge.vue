      
<template>
  <div class="Home">
    <div class="Title">CreditWise</div>
    <div class="select d-flex flex-row justify-space-between">
      <div>
        <div class="userName">Sina</div>
        <div class="address">
          iaa0sd72093836jsis7w8ekxd83kw0ddrwd456
          <button class="btn ml-9">Disconnect</button>
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
          <div class="list"  v-for="(item, index) in NftList" :key="index">
              <div
          class="listItem d-flex flex-column"
           
        >
          <div class="d-flex flex-row align-center">
            <div class="d-flex flex-row align-center nfts"  :class="{opacitys:item.state == '3'}">
              <img class="img ml-5" :src="item.src" alt="" />
              <div class="Nftname ml-4">
                Wake up, Astro Boy!Wake up, Astro Boy!
              </div>
            </div>
            <div class="Mortgage"  :class="{opacitys:item.state == '3'}">Not Mortgaged</div>
            <div class="time"  :class="{opacitys:item.state == '3'}">2023.5.15 ~ 2023.6.14 18:00:00 30 Days</div>
            <button class="btn" v-if="item.state == '1'"  :class="{opacitys:item.state == '3'}">Mortgage</button>
            <button class="btn2" v-else-if="item.state == '2'"  :class="{opacitys:item.state == '3'}">Redeem</button>
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
      <div class="right">
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
          <div class="price">100 UPTICK</div>
          <div class="title-14 mt-5">Mortgage Period :</div>
          <div class="selectList" @click="showList">
              <div class="date">7 Days</div>
              <img src="@/assets/icon_u.png" class="icon" alt="">
               <div class="list" v-if="isShow">
                <div class="dayName">7 Days</div>
                <div class="dayName">14 Days</div>
          </div>
          </div>
         
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
              </div>
            </div>
          </div>
          <div class="help mt-4">I want to postpone</div>
          <button class="submit mt-6">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Select from "../components/Select/index";
export default {
  name: "pledge",
  components: { Select },
  data() {
    return {
        isShow:false,
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
  async mounted() {},
  methods: {
      showList(){
          this.isShow = !this.isShow
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
.list{
    .opacitys{
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
        line-height: 13px;
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
    .selectList{
        position: relative;
        height: 41px;
	background-color: #351e82;
    border-radius: 5px;
    display: flex;
    align-items: center;
    .icon{
        position: absolute;
        right: 10px;
        width: 12px;
	height: 6px;
        }
    .date{
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
    .list{
        padding:16px 0 0 12px;
        position: absolute;
        top: 45px;
        width: 100%;
        height: 81px;
        background-color: #351e82;
        border-radius: 5px;
    .dayName{
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
        font-family: " MuseoModerno-SemiBold";
        font-size: 20px;
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
          margin: 16px 10px;
          height: 122px;
          background-color: #36148e;
          border-radius: 5px;

          .details {
            padding: 15px 25px 0px;

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
</style>
  
      