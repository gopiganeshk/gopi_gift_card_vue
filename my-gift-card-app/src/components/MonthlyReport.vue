<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <h3>Select Month:</h3> 
      <select  v-model="selectedMonth"  @change="onMonthChange()" >
        <option v-for="month in months" v-bind:Key="month.mid">
            {{month.month}}
        </option>
    </select>  
    <br>
    <br>
    <br>
        <table v-if="IsOrderAvailable">
            <thead>
                <tr>
                <th>Gift Order ID</th>
                <th>UserName</th>
                <th>Recipient Name</th>
                <th>Ordered Date</th>
                <th>Amount (INR)</th>
                <th>Commission (INR)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order,i) in searchOrders" :key="i">
                <td v-if="order.id < 10">GF00{{order.id}}</td>
                <td v-else-if="order.id > 9 && order.id < 99">GF0{{order.id}}</td>
                <td v-else>GF{{order.id}}</td>
                <td>{{getUserNameForOrder(order.userID)}}</td>
                <td>{{order.firstName}} {{order.lastName}}</td> 
                <td>{{order.date}}</td> 
                <td>INR.{{order.amount}}</td> 
                <td>INR.{{order.commission}}</td> 
                </tr>
                <tr v-if="searchOrders.length > 0" class="totalRow">
                <td colspan="3"></td> 
                <td>Total</td> 
                <td>INR.{{calculateOrderAmount}}</td> 
                <td>INR.{{calculateOrderCommission}}</td> 
                </tr>
                <tr v-else class="totalRow">
                <td colspan="6">No orders in {{selectedMonth}} month :( </td> 
                </tr>
            </tbody>
    </table>
    <div v-if="!IsOrderAvailable" style="text-align:left;margin-left:235px;">
        <h3 style="color:red;">No active orders at this moment to show!!!</h3>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Welcome to Monthly Report',
  data: function(){
      return {
          msg:"Monthly Reports",
          orders:[],
          users:[],
          userid: this.$route.params.userid,
          adminUser:false,
          IsOrderAvailable:true,
          selectedMonth: "All",
          months:[
            {mid: 0, month: "All"},
            {mid: 1, month: "Jan"},
            {mid: 2, month: "Feb"},
            {mid: 3, month: "Mar"},
            {mid: 4, month: "Apr"},
            {mid: 5, month: "May"},
            {mid: 6, month: "Jun"},
            {mid: 7, month: "Jul"},
            {mid: 8, month: "Aug"},
            {mid: 9, month: "Sep"},
            {mid: 10, month: "Oct"},
            {mid: 11, month: "Nov"},
            {mid: 12, month: "Dec"}
          ]
      }
 },
 methods:{
         getAdminOrders: function(){
            this.$http.get('http://localhost:3000/orders')
                .then(res=>{
                     if(res.data.length)
                        {
                            this.orders = res.data
                        }
                    else{
                        this.IsOrderAvailable = false;
                    }
                }, err=>{
                    console.log(err)
                })
        },
         getUsersForOrders: function(){
            this.$http.get('http://localhost:3000/RegisterUser')
                .then(res=>{
                     if(res.data.length)
                        {
                            this.users = res.data
                        }
                }, err=>{
                    console.log(err)
                })
        },
        getUserNameForOrder : function(userId){
           var userName = null;
                if(this.users.length > 0)
                {
                    this.users.forEach(e => {
                      if(e.id === parseInt(userId))
                        userName =  e.username
                        })
                }
                return userName
        }
 },
  created: function(){
    if(this.userid === '0')
    {
      this.$router.push({path:'/Login'})
    }
    this.adminUser = localStorage.getItem("adminUser");
    if(this.adminUser && this.userid ==='1')
    {
      this.getAdminOrders()
      this.getUsersForOrders()
    }
    else{
      this.$router.push({path:'/Login'})
    }
     
},
computed :{
calculateOrderCommission : function(){
    var commision = 0
                if(this.searchOrders.length > 0)
                {
                    for (var i = 0; i < this.searchOrders.length; i++) {
                        commision +=  this.searchOrders[i].commission
                        }
                }
                return commision
        },
        calculateOrderAmount : function(){
    var amount = 0
                if(this.searchOrders.length > 0)
                {
                    for (var i = 0; i < this.searchOrders.length; i++) {
                        amount +=  parseInt(this.searchOrders[i].amount)
                        }
                }
                return amount
        },
        searchOrders: function(){
      return this.orders.filter((order)=>{
        if(this.selectedMonth != "All")
        {
          var month = 0;
          this.months.forEach(e => {
            if(e.month === this.selectedMonth )
            {
              month = e.mid
            }
          });
          return order.date.match('-'+ month +'-')
        }
        return order
      })
}
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
table {
margin: 0 auto; 
border-collapse: collapse;
}
th {
  background-color: green;
  color: white;
}
.totalRow{
    background-color: lightgreen;
  color: black;
  border: 2px solid black;
}
.totalRow:hover {background-color : lightgreen;}
table, th, td {
  border: 1px solid black;
}
tr:hover {background-color: #f5f5f5;}
a {
  color: #42b983;
}
.row {
    overflow: hidden;
    padding: 10px;
}
.col {
    float: left;
    width: 50%
}
</style>
