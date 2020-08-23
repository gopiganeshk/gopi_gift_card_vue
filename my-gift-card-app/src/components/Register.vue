<template>
  <span>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <div>
          <span v-if="error.length">
            <span class="genError" v-for="(err, index) in error" v-bind:key="index">
              {{err}}
            </span>
          </span>
      </div>
      <form >
        <h3>Username:</h3>
        <input type="text" v-on:change="CheckExcistingUser" v-model="register.username"  required>
        <br>
        <span v-show='!showReg'> Tab to check the availability of username </span>
        <div v-show='showReg'>
        <h3>Password:</h3>
        <input type="password"  v-model="register.password"  required>
        <br>
        <h3>Confirm Password:</h3>
        <input type="text"  v-model="cnfpw"  required>
        <br>
        <h3>Email Address:</h3>
        <input type="email"  v-model="register.emailaddress"  required>
        <br>
        <br>
          <button type="button"  v-on:click="RegisterUser()">Register</button>
        </div>
      </form>
    </div>
  </span>

</template>

<script>
export default {
  name: 'Welcome to Registration',
  data: function(){
      return {
          msg:"Welcome to Registration",
          cnfpw:"",
          register:{
            "username": "",
            "password": "",
            "emailaddress":"",
            "isAdmin":false
          },
           error:[],
           showReg : false
      }
 },
 methods:{
   RegisterUser: function(){
       let validUser = this.validateUser()
       if(validUser){
     this.$http.post('http://localhost:3000/RegisterUser', this.register)
              .then(res=>{
                console.log(res)
                this.$router.push({path:'/Login'})
              }, err=>{
                console.log(err)
              })
       }
   },
   CheckExcistingUser: function(){
     this.$http.get('http://localhost:3000/RegisterUser'+'?username='+ this.register.username)
              .then(res=>{
                this.error=[]
                if(!res.data.length > 0)
                {
                  this.showReg = true;
                }
                else{
                  this.error.push("Username "+this.register.username+" already exists")
                }
              }, err=>{
                console.log(err)
              })
   },
   validateUser: function(){
     this.error=[]
     if(this.register.username === ""){
       this.error.push("Username cannot be blank!")
     }
     if(this.register.password === ""){
       this.error.push("Password cannot be blank!")
     }
     if(this.register.emailaddress === ""){
       this.error.push("Email Address cannot be blank!")
     }
     else if(this.register.emailaddress.indexOf('@')<0 ||  this.register.emailaddress.indexOf('.')<0)
      {
        this.error.push("Email Address is not valid!");
      }
      if(this.register.password != this.cnfpw){
       this.error.push("Confirm Password should match Password!")
     }
     if(this.error.length > 0)
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
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


</style>
