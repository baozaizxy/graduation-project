import Vue from "vue";
import Router from "vue-router";
import Home from "./src/pages/home.vue";
import Index from "./src/pages/index.vue";
import Queen from "./src/pages/Queen.vue";
import Man from "./src/pages/Man.vue";
import Child from "./src/pages/Child.vue";
import Gym from "./src/pages/Gym.vue";
import Cake from "./src/pages/Cake.vue";
import CyberBar from "./src/pages/CyberBar.vue";
import Yoga from "./src/pages/Yoga.vue";
import Resturant from "./src/pages/Resturant.vue";
import Salon from "./src/pages/Salon.vue";
import Product from "./src/pages/product.vue";

Vue.use(Router);

export default new Router({
  routes:[
    {
      path: "/",
      name: "Home",
      component: Home,
      redirect:"index",
      children:[
        {
          path:'/index',
          name:'index',
          component:Index,
        },
    ]  
    },
    {
      path:'/Queen',
      name:'Queen',
      component:Queen,
    },
    {
      path:'/Man',
      name:'Man',
      component:Man,
    },
  {
    path:'/Child',
    name:'Child',
    component:Child,
  },
  {
    path:'/Cake',
    name:'Cake',
    component:Cake,
  },
  {
    path:'/Gym',
    name:'Gym',
    component:Gym,
  },
  {
    path:'/CyberBar',
    name:'CyberBar',
    component:CyberBar,
  },
  {
    path:'/Yoga',
    name:'Yoga',
    component:Yoga,
},
{
  path:'/Resturant',
  name:'Resturant',
  component:Resturant,
},
{
  path:'/Salon',
  name:'Salon',
  component:Salon,
},
{
  path:'/roduct',
  name:'product',
  component:Product,
},
  ],
});


