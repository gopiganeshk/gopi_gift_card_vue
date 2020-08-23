import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import NewOrder from "../components/NewOrder.vue";
import OrderHistory from "../components/OrderHistory.vue";
import MonthlyReport from "../components/MonthlyReport.vue";

export default [
    {
        path: '/',
        redirect: '/Login'
    },
    {
        path:'/NewOrder/:userid',
        component:NewOrder,
        meta: {
            reload: true,
          },
          name: 'NewOrder',
          props: true
    },
    {
        path:'/OrderHistory/:userid',
        component:OrderHistory,
        meta: {
            reload: true,
          },
          name: 'OrderHistory',
          props: true
    },
    {
        path:'/MonthlyReport/:userid',
        component:MonthlyReport,
        meta: {
            reload: true,
          },
          name: 'MonthlyReport',
          props: true
    },
    {
        path:'/Login',
        component:Login,
        meta: {
            reload: true,
          },
    },
    {
        path:'/Register',
        component:Register,
        meta: {
            reload: true,
          },
    }
]