<template>
  <div>
    <CountDown :endDate="endDate"
               :type="type"
               :theme="2"
               :timeUnit="['天','时','分','秒']"
               @timeUp="onTimeUp" />

    <hr />
    <input v-model="type">
    <input v-model="endDate">
  </div>
</template>
<script>
import CountDown from "../../dist/main.js";
export default {
  data() {
    return {
      type: 2,
      endDate: new Date().getTime() + 30000
    };
  },
  components: {
    CountDown
  },
  methods: {
    onTypeChange(t) {
      this.type = t;
    },
    onTimeUp() {
      console.log("时间到了");
    }
  }
};
</script>