<template>
<div class="Select ">
   <button class="filter" @click="isShow">IRISnet 
     <img class="icon" src="@/assets/icon_d.png" v-if="!isshow" alt="">
      <img class="icon" src="@/assets/icon_u.png" v-else alt="">
   </button>
   <div class="list" v-if="isshow">
       <div class="listItem" v-for="(item,index) in list" :key="index">
           <div class="name">{{item.chainNmme}}</div>
       </div>
   </div>
</div>

  
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Select',
  components:{},
  data(){
    return{
      list:[
          {
             chainNmme:"IRISnet" 
          },
          {
             chainNmme:"Uptick-COSMOS" 
          },
          {
             chainNmme:"Uptick-EVM" 
          },
      ],
      isshow:false
    }

  },
  filters: {
  
  },
  async  mounted(){
    
       
  },
  methods:{
      isShow(){
          this.isshow = !this.isshow
      }
    },
 

  
 
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.Select{
    position: relative;
    .filter{
        width: 126px;
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
    .icon{
         width: 12px;
         height: 9px;
    }
    }
    .list{
        position: absolute;
        right: 0;
        top: 46px;
        width: 150px;
        background-color: #351e82;
        border-radius: 5px;
        .listItem{
            margin: 15px;
            .name{
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
