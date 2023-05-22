      
<template>
  <div class="Home ">
      <div class="Title" >CreditWise</div>
      <div class="select d-flex flex-row justify-space-between">
          <div>   
                <div class="userName">Sina</div>
                <div class="address">iaa0sd72093836jsis7w8ekxd83kw0ddrwd456
                    <button class="btn ml-9">Disconnect</button>
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
          <div class="left" >
              <div class="listItem d-flex  flex-column " v-for="(item,index) in NftList" :key="index">
                  <div class="d-flex flex-row  align-center  ">
                   <img class="img ml-5 " :src="item.src" alt="">
                  <div class="Nftname ml-4">Wake up, Astro Boy!Wake up, Astro Boy!Wake up, Astro Boy!Wake up, Astro Boy!Wake up, Astro Boy!Wake up, Astro Boy!</div>
                  </div>
     
                   <div class="line mt-4"></div>
              </div>
             
          </div>
          <div class="right">
            <div class="contant d-flex flex-column">
              <div class="baseInfo d-flex flex-row align-center">
                <img src="https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small" class="ava" alt="">
                <div class="nftname ml-4">Wake up, Astro Boy!</div>
              </div>
              <div class="crossItem mt-7 d-flex flex-row align-center">
                <div class="From ml-5">From</div>
                <img src="@/assets/icon_iris.png" class="Iris ml-6" alt="">
                <div class="chainName ml-4">IRISnet</div>
              </div>
              <div class="upimg mt-3 ">
                   <img src="@/assets/icon_jt.png" class="img" alt="">
              </div>
              <div class="crossItem mt-3 d-flex flex-row align-center">
                <div class="From ml-8">To</div>
                <img src="@/assets/icon_upticknetwork.png" class="Iris ml-9" alt="">
                <div class="chainName ml-4">UptickEVM</div>
              </div>
              <button class="submit mt-6">Submit</button>
              <div class="des mt-7">Currently you are doing cross-chain</div>
               <div class="des">operations, and you need to complete the following operations:</div>
              <div class="des">1. Cross-chain transfer the NFTs from the IRISnet chain to the Uptick-COSMOS chain.</div>
              <div class="des">2. Convert Uptick-COSMOS based NFTs to Uptick-EVM based.</div>
            </div>
          </div>
      </div>
         <!-- <button class="wallet">Connect Wallet</button> -->
  
  </div>
  
    
  </template>
  
  <script>
  import Select from "../components/Select/index";
  export default {
    name: 'crossChain',
    components:{Select},
    data(){
      return{
        NftList:[
            {
                src:'https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small'
            },
              {
                src:'https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small'
            },
              {
                src:'https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small'
            },
             {
                src:'https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small'
            },
              {
                src:'https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small'
            },
              {
                src:'https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small'
            },
             {
                src:'https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small'
            },
              {
                src:'https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small'
            },
              {
                src:'https://d3i65oqeoaoxhj.cloudfront.net/QmTpb65U1hw46ieCwVq1MquCrwYDpwsPZdwwpo9jB8TAK2/small'
            }
        ]
      }
  
    },
    filters: {
    
    },
    async  mounted(){
      
         
    },
    methods:{
    
      },
   
  }
  
  </script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang='scss' scoped>
  
    .Title{
      font-family: "MuseoModerno-Regular";
    font-size: 50px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 70px;
    letter-spacing: 0px;
    color: #54df62;
    }
    .select{
        .filter{
            display: flex;
            align-items: flex-end;
        }
      
      .userName{
          font-family: "MuseoModerno-Regular";
    font-size: 35px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 40px;
    letter-spacing: 0px;
    color: #ffffff;
      }
      .address{
          font-family: "AdobeHeitiStd-Regular";
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
      color: #ffffff;
      .btn{
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
    .Form{
      width: 100%;
    height: 75px;
    background-image: linear-gradient(90deg, 
      #54e161 0%, 
      #4e1dc7 100%);
      border-radius: 5px;
      font-family: "MuseoModerno-SemiBold";
        font-size: 17px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #ffffff;
   
    .name{
  width: 80%;
  padding-left: 10%;
    }
    .transfer{
        width: 20%;
    }
    
    }
    .nftlist{
        width: 100%;
        margin-bottom: 135px;
        .left{
            width: 74%;
            height: 598px;
            overflow-y: auto;
           
            .listItem{
               &:hover{
                 background: #1d0952;
               }
                       .line{
                width: 100%;
                height: 1px;
              border: solid 1px #611ecd;
            }
               
                .img{
                    width: 81px;
                      height: 81px;
                      object-fit: cover;
                      margin-top: 16px;
                }
                .Nftname{
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
        .right{
            width: 26%;
            height: 100px;
            height: 598px;
            background-color: #1a1a53;
            border-radius: 5px;
            border: solid 1px #611ecd;
            .contant{
              margin: 26px 29px 0 25px;
              .baseInfo{
                .ava{
                  width: 61px;
                  height: 61px;
                  border-radius: 5px;
                  object-fit: cover;
                }
                .nftname{
                  font-family: "MuseoModerno-Regular";
                  font-size: 12px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 20px;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
              }
              .upimg{
                width: 100%;
                display: flex;
                justify-content: center;
                .img{
                     width: 16px;
                  height: 14px;
                }
               
              }
              .submit{
                width: 255px;
                height: 41px;
                background-color: #54df62;
                border-radius: 20px;
                font-family:"MuseoModerno-SemiBold" !important;
              font-size: 15px !important;
              font-weight: normal;
              font-stretch: normal;
              line-height: 20px;
              letter-spacing: 0px;
              color: #4e1dc7;
              }
              .des{
                width: 252px;
              font-family:"MuseoModerno-Regular";
              font-size: 12px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 20px;
              letter-spacing: 0px;
              color: #ffffff;
              }
              .crossItem{
                  width: 256px;
                  height: 85px;
                  background-color: #3d179f;
                  border-radius: 5px;
                  .From{
  
                    font-family: "MuseoModerno-SemiBold";
                    font-size: 17px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 16px;
                    letter-spacing: 0px;
                    color: #54df62;
                  }
                  .Iris{
                      width: 35px;
                      height: 35px;
                  }
                  .chainName{
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
    .wallet{
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
  
      