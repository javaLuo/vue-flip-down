<template>
  <div>
    <CountDown :endDate="endDate" :type="type" :theme="1" :timeUnit="['天', '时', '分', '秒']" @timeUp="onTimeUp" />

    <hr />
    <input v-model="type" />
    <input v-model="endDate" />
    <div>{{ timeUp }}</div>
  </div>
</template>
<script>
// import CountDown from "../../dist/main.js";
import CountDown from "../../src/index.js";
export default {
  data() {
    return {
      timeUp: false,
      type: 2,
      endDate: new Date().getTime() + 5000,
    };
  },
  components: {
    CountDown,
  },
  methods: {
    onTypeChange(t) {
      this.type = t;
    },
    onTimeUp() {
      this.timeUp = true;
    },
  },
};
</script>
