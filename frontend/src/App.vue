<template>
  <div id="app">
    <div class="container">
      <!--<router-link to="/"><img src="./assets/logo.png"></router-link>-->
      <a href="/">
        <img src="./assets/logo.png">
      </a>
      <div class="header">
        <h1>SPA Web App Challenge 2</h1>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
