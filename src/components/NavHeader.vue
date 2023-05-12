<template>
    <div class="header">
      <div class="nav-topbar">
        <div class="container">
          <div class="topbar-menu">
            <a href="javascript:;">全景商城</a>
            <a href="javascript:;">线上浏览</a>
            <a href="javascript:;">极致体验</a>
          </div>
        </div>
      </div>
      <div class="nav-header">
        <div class="container">
          <div class="header-logo">
            <a href="/#/index"></a>
          </div>
          <div class="header-menu">
            <div class="item-menu">
              <span>一层区域</span>
              <div class="children">
                <ul>
                <li class="product" v-for="(item,index) in firstfloorList" :key="index">
                  <a v-bind:href="'/#/'+item.src" target="_blank">
                    <div class="pro-img">
                      <img v-bind:src="item.mainImage" >
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
              </div>
            </div>
            <div class="item-menu">
              <span>二层区域</span>
              <div class="children">
                <ul>
                <li class="product" v-for="(item,index) in secondfloorList" :key="index">
                  <a v-bind:href="'/#/'+item.src" target="_blank">
                    <div class="pro-img">
                      <img v-bind:src="item.mainImage" >
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
              </div>
            </div>
            <div class="item-menu">
              <span>三层区域</span>
              <div class="children">
                <ul>
                <li class="product" v-for="(item,index) in thirdfloorList" :key="index">
                  <a v-bind:href="'/#/'+item.src" target="_blank">
                    <div class="pro-img">
                      <img v-bind:src="item.mainImage" >
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
              </div>
            </div>
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
        firstfloorList:[
        {
            src:'Queen',
            mainImage:'https://xqimg.imedao.com/1880eda147915823fdf2516d.jpg',
            name:'Queen 女装店',
            price:'均价500',
          },
          {
            src:'Cake',
            mainImage:'https://xqimg.imedao.com/1880ed85f9315273fe2c43b6.jpg',
            name:'可可烘焙',
            price:'均价 66',
          },{
            src:'Resturant',
            mainImage:'https://xqimg.imedao.com/1880ed85fe415263fec631f9.jpg',
            name:'好味',
            price:'均价 109',
          }
        ],
        secondfloorList:[
        {
            src:'Man',
            mainImage:'https://xqimg.imedao.com/1880ed8613b15033fd41382a.jpg',
            name:'优雅男装',
            price:'均价500',
          },
          {
            src:'Gym',
            mainImage:'https://xqimg.imedao.com/1880ed8609b156a3fde1b8fe.jpg',
            name:'燃脂健身',
            price:'年卡 1999',
          },{
            src:'CyberBar',
            mainImage:'https://xqimg.imedao.com/1880ed85f3715023fa643bc6.jpg',
            name:'极速网吧',
            price:'均价 30/h',
          }
        ],
        thirdfloorList:[
        {
            src:'Child',
            mainImage:'https://xqimg.imedao.com/1880ef2d9b0169a3fcb1c11c.jpg!custom.jpg',
            name:'儿童乐园',
            price:'100/人',
          },
          {
            src:'Salon',
            mainImage:'https://xqimg.imedao.com/1880ef2d9be16613fdef25b2.jpg!custom.jpg',
            name:'美容美发',
            price:'均价 399',
          },{
            src:'Yoga',
            mainImage:'https://xqimg.imedao.com/1880ef2a56a15fe3fdf23a7f.jpg',
            name:'瑜伽馆',
            price:'年卡 1999',
          }
        ],
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
                @include bgImg(55px,55px,'./../assets/image/snow-logo.png',55px);
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
          .product{
            position:relative;
            float:left;
            width:33%;
            height:220px;
            font-size:12px;
            line-height:12px;
            text-align: center;
            a{
              display:inline-block;
            }
            img{
              width:auto;
              height:111px;
              margin-top:26px;
            }
            .pro-img{
              height:137px;
            }
            .pro-name{
              font-weight: bold;
              margin-top: 19px;
              margin-bottom: 8px;
              color: $colorB;
            }
            .pro-price{
              color: $colorA;
            }
            &:before{
            content:' ';
            position:absolute;
            top:28px;
            right:0;
            border-left:1px solid $colorF;
            height:100px;
            width:1px;
          }
          &:last-child:before{
            display:none;
          }
          }
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