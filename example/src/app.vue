<template>
  <div>
    <CountDown :endDate="endDate"
               :type="type" />

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
      endDate: new Date().getTime() + 100861100,
    };
  },
  components: {
    CountDown,
  },
  methods: {
    onTypeChange(t) {
      this.type = t;
    },
  },
};
</script>