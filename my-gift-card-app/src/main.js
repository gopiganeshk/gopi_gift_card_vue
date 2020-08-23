import Vue from 'vue'
import App from './App.vue'
import giftAppRoutes from "./routes/routes";
import axios from "axios";
import VueRouter from "vue-router";

Vue.use(VueRouter)
//use new alias for $http so that all $http request mentods can be reused!
Vue.prototype.$http = axios

const giftAppRouter = new VueRouter({
  routes:giftAppRoutes,
  mode:'history',
})



new Vue({
  render: h => h(App),
  router:giftAppRouter,
}).$mount('#app')
