<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
        <table v-if="IsOrderAvailable">
            <thead>
                <tr>
                <th>Gift Order ID</th>
                <th v-if="adminUser && userid ==='1'">UserName</th>
                <th>Recipient Name</th>
                <th>Amount (INR)</th>
                <th>Commission (INR)</th>
                <th>Ordered Date</th>
                <th>Order Status</th>
                <th v-if="adminUser && userid ==='1'">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order,i) in orders" :key="i">
                <td v-if="order.id < 10">GF00{{order.id}}</td>
                <td v-else-if="order.id > 9 && order.id < 99">GF0{{order.id}}</td>
                <td v-else>GF{{order.id}}</td>
                <td v-if="adminUser && userid ==='1'">{{getUserNameForOrder(order.userID)}}</td>
                <td>{{order.firstName}} {{order.lastName}}</td> 
                <td>INR.{{order.amount}}</td> 
                <td>INR.{{order.commission}}</td> 
                <td>{{order.date}}</td> 
                <td>{{order.status}}</td>
                <td  v-if="adminUser && userid ==='1' && order.status === 'Out for delivery'" >
                  <button style="background-color: #4CAF50;" v-on:click="ProcessOrder(order)" type="button">Mark Delivered</button>
                </td> 
                <td  v-else-if="adminUser && userid ==='1' && order.status === 'Delivered'" >
                  <button style="background-color: #FFA500;" v-on:click="ProcessOrder(order)" type="button">Approve Redeemed</button>
                </td> 
                <td  v-else-if="adminUser && userid ==='1' && order.status === 'Redeemed'" >
                  <button style="background-color: #008CBA;" type="button" disabled>Order Processed</button>
                </td> 
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
  name: 'Welcome to Order',
  data: function(){
      return {
          msg:"View All Orders",
          orders:[],
          users:[],
          userid: this.$route.params.userid,
          adminUser:false,
          IsOrderAvailable:true,
      }
 },
 methods:{
   getOrders: function(){
            this.$http.get('http://localhost:3000/orders'+'?userID='+ this.userid )
                .then(res=>{
                     if(res.data.length)
                        {
                            this.orders = res.data
                            console.log(this.orders )
                        }
                    else{
                        this.IsOrderAvailable = false;
                    }
                }, err=>{
                    console.log(err)
                })

        },
         getAdminOrders: function(){
            this.$http.get('http://localhost:3000/orders')
                .then(res=>{
                     if(res.data.length)
                        {
                            this.orders = res.data
                            console.log(this.orders )
                        }
                    else{
                       this.IsOrderAvailable = false;
                    }
                }, err=>{
                    console.log(err)
                })
        },
        ProcessOrder : function(order){

          if(order.status === "Out for delivery")
          {
            order.status = "Delivered"
          }
          else if(order.status === "Delivered")
          {
            order.status = "Redeemed"
          }
          this.$http.put('http://localhost:3000/orders'+'/'+ order.id, order)
              .then(res=>{
                console.log(res)
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
      this.getOrders()
    }
    
},
computed : {
        
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
button {
  background-color: grey; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
}
</style>
