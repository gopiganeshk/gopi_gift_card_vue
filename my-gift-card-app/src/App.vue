<template>
  <div id="app">
     <div class="header">
       <img class="logo" alt="Vue logo" src="./assets/logo.png">
         <h2>Gopi's Gift Card Site :)</h2>
       </div>
    <navbar></navbar>
   <router-view></router-view>
  </div>
</template>

<script>

import NavBar from "./components/Navigation.vue";


export default {
  name: 'App',
  components:{
    'navbar':NavBar,
  },
  mounted: function(){
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
  overflow: hidden;
  background-color: lightcyan;
  padding: 50px 20px;
}
.logo{
    height: 125px;
    position: absolute;
    top: 61px;
    left: 63px;
    font-size: 18px;
    background: transparent;
}

input {
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid black;
}
button {
  background-color: lightseagreen; 
  border: none;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
button:hover{
  background-color: lightsteelblue;
  color: black;
}
.genError{
  color: red;
  font-weight: bold;
}
</style>
