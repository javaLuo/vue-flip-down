<template>
  <div>
    <CountDown :endDate="endDate"
               :type="type"
               @timeUp="onTimeUp" />

    <hr />
    <input v-model="type">
    <input v-model="endDate">
  </div>
</template>
<script>
import CountDown from '../../dist/main.js';
export default {
  data() {
    return {
      type: 4,
      endDate: new Date().getTime(),
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
      console.log('时间到了');
    },
  },
};
</script>