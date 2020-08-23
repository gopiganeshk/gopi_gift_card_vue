<template>
  <span>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <div>
          <span v-if="error.length">
            <span class = "genError" v-for="(err, index) in error" v-bind:key="index">
              {{err}}
            </span>
          </span>
      </div>
      <div style="text-align:left;margin-left:235px;">
        <label>Current Date</label> : {{getDate()}}
      </div>
     <div class="row">
      <div class="col">
          <h3 >Receipient First Name</h3> 
          <input type="text" v-model="order.firstName" /> 
      </div>
      <div class="col">
          <h3 >Receipient Last Name</h3> 
          <input type="text" v-model="order.lastName" /> 
      </div>
      <div class="col">
          <h3 >Gift Card Value(INR)</h3> 
          <input v-on:keyup="getCommision" type="number"  v-model="order.amount" /> 
      </div>
      <div class="col">
          <h3 >Amount Payable(5 % commission inclusive)</h3> 
          <input type="text" disabled v-model="order.commission" > 
      </div>
      <div class="col">
          <h3 >Receipient Mobile Number</h3> 
          <input type="tel" maxlength="10" v-model="order.mobileNumber"/> 
      </div>
      <div class="col">
          <h3 >Address</h3> 
          <input type="text" v-model="order.address" /> 
      </div>
</div>
 <br>
          <button type="button"  v-on:click="PlaceOrder()">Place Order</button>
        <br>
    </div>
  </span>

</template>

<script>
export default {
  name: 'Welcome to Order',
  data: function(){
      return {
          msg:"Place your order",
          order:{
            "userID": this.$route.params.userid,
            "firstName": "",
            "lastName": "",
            "amount": 0,
            "commission": 0,
            "mobileNumber": "",
            "address": "",
            "status": "Out for delivery",
            "date" : this.getDate()
          },
          error:[],
          userid: this.$route.params.userid,
      }
 },
  created: function(){
    if(this.userid === '0')
    {
      this.$router.push({path:'/Login'})
    }
},
 methods:{
   getCommision: function(){
            this.order.commission = parseInt(this.order.amount) + parseInt(this.order.amount*0.05)
        },
        getDate: function(){
            return new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear();
        },
   PlaceOrder: function(){
     let validOrder = this.validateOrder()
       if(validOrder){
     this.$http.post('http://localhost:3000/orders', this.order)
              .then(res=>{
                console.log(res)
                      this.$router.push({path:'/OrderHistory/'+this.userid})
              }, err=>{
                console.log(err)
          })
       }
   },
   validateOrder: function(){
     this.error=[]
     
     if(this.order.amount == 0){
       this.error.push("Enter some gift amount!")
     }
     if(this.order.firstName === ""){
       this.error.push("Firstname cannot be blank!")
     }
     if(this.order.mobileNumber === ""){
       this.error.push("Mobile Number cannot be blank!")
     }
     if(this.error.length)
     {
      return false
     }
     return true
    }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
    width: 100%;
}
ul li {
    width: 49%;
    display: inline-block;
}

ul li > * {
    width: 100%;
}
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
