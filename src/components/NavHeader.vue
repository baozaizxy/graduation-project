<template>
    <div class="header">
      <div class="nav-topbar">
        <div class="container">
          <div class="topbar-menu">
            <a href="javascript:;">全景商城</a>
            <a href="javascript:;">女装</a>
            <a href="javascript:;">男装</a>
            <a href="javascript:;">童装</a>
          </div>
        </div>
      </div>
      <div class="nav-header">
        <div class="container">
          <div class="header-logo">
            <a href="/#/index"></a>
          </div>
          <div class="header-menu">
            <!-- <div class="item-menu">
              <span>女装区</span>
              <div class="children">
                <ul>
                <li class="product" v-for="(item,index) in phoneList" :key="index">
                  <a v-bind:href="'/#/Queen/'+item.id" target="_blank">
                    <div class="pro-img">
                      <img v-bind:src="item.mainImage" :alt="item.subtitle">
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
              </div>
            </div> -->
            <div class="item-menu">
              <span>女装区</span>
            </div>
            <div class="item-menu">
              <span>男装区</span>
            </div>
            <div class="item-menu">
              <span>童装区</span>
            </div>
            <!-- <div class="item-menu">
              <span>童装区</span>
              <div class="children">
                 <ul>
                  <li class="product">
                    <a href="" target="_blank">
                      <div class="pro-img">
                        <img src="/imgs/nav-img/nav-3-1.jpg" alt="">
                      </div>
                      <div class="pro-name">全景壁画电视 65英寸</div>
                      <div class="pro-price">6999元</div>
                    </a>
                  </li>
                   <li class="product">
                    <a href="" target="_blank">
                      <div class="pro-img">
                        <img src="/imgs/nav-img/nav-3-2.jpg" alt="">
                      </div>
                      <div class="pro-name">全景全面屏电视E55A</div>
                      <div class="pro-price">1999元</div>
                    </a>
                  </li>
                  <li class="product">
                    <a href="" target="_blank">
                      <div class="pro-img">
                        <img src="/imgs/nav-img/nav-3-3.png" alt="">
                      </div>
                      <div class="pro-name">全景电视4A 32英寸</div>
                      <div class="pro-price">699元</div>
                    </a>
                  </li>
                   <li class="product">
                    <a href="" target="_blank">
                      <div class="pro-img">
                        <img src="/imgs/nav-img/nav-3-4.jpg" alt="">
                      </div>
                      <div class="pro-name">全景电视4A 55英寸</div>
                      <div class="pro-price">1799元</div>
                    </a>
                  </li>
                  <li class="product">
                    <a href="" target="_blank">
                      <div class="pro-img">
                        <img src="/imgs/nav-img/nav-3-5.jpg" alt="">
                      </div>
                      <div class="pro-name">全景电视4A 65英寸</div>
                      <div class="pro-price">2699元</div>
                    </a>
                  </li>
                   <li class="product">
                    <a href="" target="_blank">
                      <div class="pro-img">
                        <img src="/imgs/nav-img/nav-3-6.png" alt="">
                      </div>
                      <div class="pro-name">查看全部</div>
                      <div class="pro-price">全景电视</div>
                    </a>
                  </li>
                </ul>
              </div>
            </div> -->
          </div>
          <div class="header-search">
            <div class="wrapper">
              <input type="text" name="keyword">
              <a href="javascript:;"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default{
    name:'nav-header',
    data(){
      return{
        phoneList:[]
      }
    },
    computed:{
    },
    mounted(){
    // this.getProductList();
    },
    // methods:{
    //    getProductList(){
    //     this.axios.get('/products',{
    //       params:{
    //         categoryId:'100012',
    //         pageSize:6
    //       }
    //     }).then((res)=>{
    //       if(res.list.length>=6){
    //       this.phoneList = res.list;
    //       }
    //     })
    //   },
    // }
  }

</script>
<style lang="scss">

 @import '../assets/scss/base.scss';
 @import '../assets/scss/mixin.scss';
 @import '../assets/scss/config.scss';


.header{
    .nav-topbar{
        height:39px;
        line-height:39px;
        background-color:#333333;
        color:#B0B0B0;
      .container{
      @include flex();
        a{
          display:inline-block;
          color:#B0B0B0;
          margin-right:17px;
        }
      }
      }
    .nav-header{
      .container{
        position:relative;
        height:112px;
        @include flex();
        .header-logo{
            display:inline-block;
            width: 55px;
            height: 55px;
            background-color: #FF6600;
            background-size: 55px;
            a{
              display:inline-block;
              width:110px;
              height:55px;
              &:before{
                content:' ';
                @include bgImg(55px,55px,'./../assets/image/mi-logo.png',55px);
                transition:margin .2s;
              }
              &:after{
                content:' ';
                @include bgImg(55px,55px,'./../assets/image/mi-home.png',55px);
              }
              &:hover:before{
                margin-left:-55px;
                transition:margin .2s;
              }
            }
        }
        .header-menu{
          display:inline-block;
          width:643px;
          padding-left: 209px;
          .item-menu{
            display:inline-block;
            color: #333333;
            font-weight: bold;
            font-size: 16px;
            line-height: 112px;
            margin-right: 20px;
            span{
              cursor:pointer;
            }
            &:hover{  
              color:$colorA;
              .children{
                height:220px;
                opacity:1;
              }
        }
        .children{
          position:absolute;
          top:112px;
          left:0;
          width:1226px;
          height:0;
          opacity: 0;
          overflow: hidden;
          border-top:1px solid #E5E5E5;
          box-shadow:0px 7px 6px 0px rgba(0,0,0,0.11);
          z-index: 10;
          transition: all .5s;
          background-color: #ffffff;
          // .product{
          //   position:relative;
          //   float:left;
          //   width:16.6%;
          //   height:220px;
          //   font-size:12px;
          //   line-height:12px;
          //   text-align: center;
          //   a{
          //     display:inline-block;
          //   }
          //   img{
          //     width:auto;
          //     height:111px;
          //     margin-top:26px;
          //   }
          //   .pro-img{
          //     height:137px;
          //   }
          //   .pro-name{
          //     font-weight: bold;
          //     margin-top: 19px;
          //     margin-bottom: 8px;
          //     color: $colorB;
          //   }
          //   .pro-price{
          //     color: $colorA;
          //   }
          //   &:before{
          //   content:' ';
          //   position:absolute;
          //   top:28px;
          //   right:0;
          //   border-left:1px solid $colorF;
          //   height:100px;
          //   width:1px;
          // }
          // &:last-child:before{
          //   display:none;
          // }
          // }
        }
      }
        }
        .header-search{
          width:319px;
          .wrapper{
            height:50px;
            border: 1px solid #E0E0E0;
            display: flex;
            align-items:center;
            input{
              border:none;
              border-right: 1px solid #E0E0E0;
              width:264px;
              height:50px;
              padding-left: 14px;
              box-sizing: border-box;
            }
            a{
              @include bgImg(18px,18px,'./../assets/image/icon-search.png',contain);
              margin-left:17px;
            }
          }

        }

      }
    }
  }
  </style>