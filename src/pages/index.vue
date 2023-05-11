<template>
    <div class="index">
      <div class="container">
            <div class="swiper-box">
            <div class="swiper-box">
              <swiper v-bind:options="swiperOption">
                <swiper-slide v-for="(item,index) in slideList" v-bind:key="index">
                  <a v-bind:href="'/#/Queen/'"><img v-bind:src="item.image" alt=""></a>
                  <!-- <a v-bind:href="'/#/Queen/'"><img src = "./../assets/image/swiper-1.jpg" alt=""></a> -->
                </swiper-slide>
                <!-- Optional controls -->
              <div class="swiper-pagination"  slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </div>
            <div class="ads-box">
            <a v-bind:href="'/#/Queen/'" >
              <img src = "./../assets/image/bear.jpg" alt="">
              <img src = "./../assets/image/bear.jpg" alt="">
              <img src = "./../assets/image/bear.jpg" alt="">
              <img src = "./../assets/image/bear.jpg" alt="">
            </a>
          </div>
            <div class="banner">
            <a href="/#/Queen">
              <img src = "./../assets/image/banner-1.png" alt="">
            </a>
          </div>
        </div>
      </div>
      <!-- <div class="product-box">
            <div class="container">
                  <h2>手机</h2>
                  <div class="wrapper">
                    <div class="banner-left">
                      <a href="/#/product/35"><img src="/imgs/mix-alpha.jpg" alt=""></a>
                    </div>
                    <div class="list-box">
                      <div class="list" v-for="(arr,i) in phoneList" v-bind:key="i">
                        <div class="item" v-for="(item,j) in arr" v-bind:key="j">
                          <span v-bind:class="{'new-pro':j%2==0}">新品</span>
                          <div class="item-img">
                            <img v-bind:src="item.mainImage" alt="">
                          </div>
                        <div class="item-info">
                            <h3>{{item.name}}</h3>
                            <p>{{item.subtitle}}</p>
                            <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                          </div>
                      </div>
                      </div>
                    </div>
                  </div>
            </div>
          </div> -->
      <service-bar></service-bar>
    </div>
</template>

<script>
  import ServiceBar from './../components/ServiceBar'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  export default{
    name:'index',
    components:{
      swiper,
      swiperSlide,
      ServiceBar,

    },
    data(){
      return{
        swiperOption:{
          autoplay:true,
          loop:true,
          effect:'cube',
          cubeEffect: {
            slideShadow:true,
            shadow:false,
            shadowOffset: 100,
            shadowScale: 0.6
          },
          pagination: {
            el: '.swiper-pagination',
            clickable:true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
        slideList:[
          {
            image: "https://xqimg.imedao.com/1880b333fdc3ec3fecb0b97f.jpg!800.jpg",
          },
          {
            image: "https://xqimg.imedao.com/1880b333f583f13fad0d47ea.jpg!800.jpg",
          },
        ],
        adsList:[
          {
            id:33,
            image: "/assets/image/swiper-1.jpg",
          },
          {
            id:48,
            image: require("@/assets/image/trousers.jpg"),
          },{
            id:45,
            image: require("@/assets/image/trousers.jpg"),
          },{
            id:47,
            image: require("@/assets/image/trousers.jpg"),
          }
        ],
      }
    },
    mounted(){
      this.init();
    },
  }
</script>

<style lang="scss">
@import './../assets/scss/mixin.scss';
@import './../assets/scss/config.scss';
@import './../assets/scss/base.scss';
.index{
  .swiper-box{
     .nav-menu{
        position:absolute;
        width:264px;
        height:451px;
        z-index:9;
        padding:26px 0;
        background-color:#55585a7a;
        box-sizing:border-box;
        .menu-wrap{
          .menu-item{
            height:50px;
            line-height:50px;
            a{
              position:relative;
              display:block;
              font-size:16px;
              color:#ffffff;
              padding-left:30px;
              &:after{
                position:absolute;
                right:30px;
                top:17.5px;
                content:' ';
                @include bgImg(10px,15px,'./../assets/image/icon-arrow.png');
              }
            }
            &:hover{
              background-color:$colorA;
              .children{
                display:block;
              }
            }
            .children{
              display:none;
              width:962px;
              height:451px;
              background-color:$colorG;
              position:absolute;
              top:0;
              left:264px;
              border:1px solid $colorH;
              ul{
                display:flex;
                justify-content:space-between;
                height:75px;
                li{
                  height:75px;
                  line-height:75px;
                  flex:1;
                  padding-left: 23px;
                }
                a{
                  color:$colorB;
                  font-size:14px;
                }
                img{
                  width:42px;
                  height:35px;
                  vertical-align:middle; //图片居中
                  margin-right:15px;
                }
              }
            }
          } 
        }
    }
    .swiper-container{
      height:451px;
      img{
        width:100%;
        height:100%;
      }
    }
  }
  .ads-box{
    @include flex();
    margin-top:14px;
    margin-bottom:31px;
    a{
      display:flex;
      width:296px;
      height:167px;
      img{
        width:100%;
        margin:auto;
      }
    }

  }
  .banner{
    margin-bottom:50px;
  }
  // .product-box{
  //     background-color:$colorJ;
  //     padding:30px 0 50px;
  //     h2{
  //       font-size:$fontF;
  //       height:21px;
  //       line-height:21px;
  //       color:$colorB;
  //       margin-bottom:20px;
  //     }
  //     .wrapper{
  //       display:flex;//弹性布局
  //       .banner-left{
  //         margin-right:16px;
  //         img{
  //           width:224px;
  //           height:619px;
  //         }
  //       }
  //       //  .list-box{
  //       //   .list{
  //       //     @include flex();
  //       //     width:986px;
  //       //     margin-bottom:14px;
  //       //     &:last-child{
  //       //       margin-bottom:0;
  //       //     }
  //       //     .item{
  //       //       width:236px;
  //       //       height:302px;
  //       //       background-color:$colorG;
  //       //       text-align:center;
  //       //       span{
  //       //         display:inline-block;
  //       //         width:67px;
  //       //         height:24px;
  //       //         font-size:14px;
  //       //         line-height:24px;//使字体居中
  //       //         color:$colorG;//秒杀、新品字体颜色
  //       //         &.new-pro{
  //       //           background-color:#7ECF68;
  //       //         }
  //       //         &.kill-pro{
  //       //           background-color:#E82626;
  //       //         }
  //       //       }
  //       //       .item-img{
  //       //         img{
  //       //           width:100%;
  //       //           height:195px;
  //       //         }
  //       //       }
  //       //       .item-info{
  //       //         h3{
  //       //           font-size:$fontJ;
  //       //           color:$colorB;
  //       //           line-height:$fontJ;
  //       //           font-weight:bold;
  //       //         }
  //       //         p{
  //       //           color:$colorD;
  //       //           line-height:13px;
  //       //           margin:6px auto 13px;
  //       //         }
  //       //         .price{
  //       //           color:#F20A0A;
  //       //           font-size:14px;
  //       //           font-weight:bold;
  //       //           cursor:pointer;  //满足加购物车的功能
  //       //           &:after{
  //       //             @include bgImg(22px,22px,'/imgs/icon-cart-hover.png');
  //       //             content:' ';
  //       //             margin-left:5px;
  //       //             vertical-align: middle;
  //       //           }
  //       //         }
  //       //       }
  //       //     }
  //       //   }
  //       //  }
  //     }
  // }
}
</style>