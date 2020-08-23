<template>
    <div>
        <ul>
            <li>
                <router-link v-if="!userLoggedIn" to="/Login" exact>Login</router-link>
                <router-link v-if="!userLoggedIn" to="/Register" exact>Register</router-link>
                <router-link v-if="userLoggedIn && !adminUser"  :to="{ name: 'NewOrder', params: { userId } }" exact>New Order</router-link>
                <router-link v-if="userLoggedIn"  :to="{ name: 'OrderHistory', params: { userId } }" exact>Order History</router-link>
                <router-link v-if="userLoggedIn && adminUser" :to="{ name: 'MonthlyReport', params: { userId } }" exact>Monthly Report</router-link>
                <a v-if="userLoggedIn" v-on:click="ProcessLogOut()">Logout</a>
            </li>
        </ul>
    </div>
</template>


<script>
export default {
  data: function(){
      return {
          userLoggedIn:false,
          adminUser:false,
          userId:0
      }
 },
 methods:{
   ProcessLogOut: function(){
        localStorage.setItem("adminUser", false)
        localStorage.setItem("userLoggedIn", false)
        localStorage.setItem("UserId", 0)
        this.userLoggedIn=false,
          this.adminUser=false,
          this.userId=0
        this.$router.push({path:'/Login'})
        },
 },
  created: function(){
    this.userId = localStorage.getItem("UserId")
    this.userLoggedIn = localStorage.getItem("userLoggedIn") && this.userId > 0;
    this.adminUser = localStorage.getItem("adminUser") && this.userId == 1;
},
mounted: function(){
    this.$root.$on('eventUserLoggedIn', data => {
        this.userLoggedIn = data;
    });
    this.$root.$on('eventUserId', data => {
        this.userId = data;
    });
    this.$root.$on('eventAdminUser', data => {
        this.adminUser = data;
    });
}
}
</script>

<style scoped>

.router-link-active{
    background-color:  lightseagreen;
    color: black;
}

li{
    display: inline-block;
}

li a {
   color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
ul{
    list-style-type: none;
    margin: 0;
    padding: 5px;
    overflow: hidden;
    background-color:darkgreen;
}
li a:hover {
  background-color: lightsteelblue;
}

</style>