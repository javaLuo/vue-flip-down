

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <!-- <Flip :endDate="endDate" @time-up="timeUp" /> -->
</template>

<script setup lang="ts">
import { ref } from "vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from "./components/HelloWorld.vue";
// import Flip from "../dist/vue-flip-down.es";
// import Flip from "./lib/App.vue";
const endDate = ref(Date.now() + 10 * 1000);

function timeUp() {
  console.log("时间到了");
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
