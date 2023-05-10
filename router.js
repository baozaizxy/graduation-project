import Vue from "vue";
import Router from "vue-router";
import Home from "./src/pages/home.vue";
import Index from "./src/pages/index.vue";
import Queen from "./src/pages/Queen.vue";

Vue.use(Router);

export default new Router({
  routes:[
    {
      path: "/",
      name: "Home",
      component: Home,
      redirect:"Home",
      children:[
        {
        path:'/index',
        name:'index',
        component:Index,
       },
    // // {
    // //     path:'/detail/:id',
    // //     name:'detail',
    // //     component:Detail,
    // // },
    ]
  
  
  
        // path:'/',
        // name:'index',
        // component:Index,
        // redirect:"index",
        // children:[
        //   {
        //     path:'/Queen',
        //     name:'Queen',
        //     component:Queen,
        //   },
        // ]
  
    },
    {
      path:'/Queen',
      name:'Queen',
      component:Queen,
  },
  ],
});


