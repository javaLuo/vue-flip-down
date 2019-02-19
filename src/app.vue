<!-- 翻页效果 倒计时组件 -->
<template>
  <div :class="['vue-countdown-component', {'theme2': theme !== 1}]">
    <template v-for="(item, index) in timeArray">
      <div :class="['time-box']"
           :key="index">
        {{item}}
        <div :class="['b0',{'anime': isAnimate[index]}]">
          <div>{{item}}</div>
        </div>
        <div :class="['a0',{'anime': isAnimate[index]}]"
             @animationend="onAnimateEnd(index)">
          <div>{{timeArrayT[index]}}</div>
        </div>
        <div class="a1">
          <div>{{timeArrayT[index]}}</div>
        </div>
      </div>
      <div class="time-unit"
           :key="`unit-${index}`"
           v-if="isTimeUnitShow(index)">
        {{setTimeUnit(index)}}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeArray:
        this.theme === 2
          ? new Array(this.type * 2).fill("0")
          : new Array(this.type).fill("00"),
      timeArrayT:
        this.theme === 2
          ? new Array(this.type * 2).fill("0")
          : new Array(this.type).fill("00"),
      isAnimate:
        this.theme === 2
          ? new Array(this.type * 2).fill(false)
          : new Array(this.type).fill(false)
    };
  },
  props: {
    endDate: { type: [Date, Number, String], default: 0 }, // 截止时间
    type: { type: [Number, String], default: 4 }, // 时间精度 4/3/2/1
    theme: { type: [Number, String], default: 1 },
    timeUnit: { type: Array, default: () => [] }
  },
  computed: {
    endTime() {
      if (this.endDate instanceof Date) {
        return this.endDate.getTime();
      }
      return Number(this.endDate) > 0 ? Number(this.endDate) : 0;
    },
    step() {
      return this.theme === 1 ? 1 : 2;
    },
    arr() {
      const length = this.timeArray.length;
      const step = this.step;
      const temp = [
        length - 1,
        length - step - 1,
        length - step * 2 - 1,
        length - step * 3 - 1
      ];
      temp.length = this.type > 1 ? this.type : 1;
      return temp;
    }
  },
  watch: {
    timeArray(newV, oldV) {
      const diff = [];
      newV.forEach((value, index) => {
        if (value !== oldV[index]) {
          this.$set(this.isAnimate, index, true);
          diff.push({ value, index });
        }
      });
      setTimeout(() => {
        diff.forEach(item => {
          this.$set(this.timeArrayT, item.index, item.value);
        });
      }, 350);
    },
    endTime(newV) {
      if (newV > 0) {
        this.start(true);
      }
    }
  },

  mounted() {
    this.start(true);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    // 开始倒计时
    start(isFirst) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let t = this.endTime - new Date().getTime(); // 剩余的毫秒数
        t = t < 0 ? 0 : t;
        let day = 0; // 剩余的天
        let hour = 0; // 剩余的小时
        let min = 0; // 剩余的分钟
        let second = 0; // 剩余的秒
        const type = Number(this.type);
        if (type >= 4) {
          day = Math.floor(t / 86400000); // 剩余的天
          hour = Math.floor(t / 3600000 - day * 24); // 剩余的小时 已排除天
          min = Math.floor(t / 60000 - day * 1440 - hour * 60); // 剩余的分钟 已排除天和小时
          second = Math.floor(t / 1000 - day * 86400 - hour * 3600 - min * 60); // 剩余的秒
        } else if (type >= 3) {
          hour = Math.floor(t / 3600000); // 剩余的小时
          min = Math.floor(t / 60000 - hour * 60); // 剩余的分钟 已排小时
          second = Math.floor(t / 1000 - hour * 3600 - min * 60); // 剩余的秒
        } else if (type >= 2) {
          min = Math.floor(t / 60000); // 剩余的分钟
          second = Math.floor(t / 1000 - min * 60); // 剩余的秒
        } else {
          second = Math.floor(t / 1000); // 剩余的秒
        }

        let arr = [];
        if (Number(this.theme) === 1) {
          // 不分开
          type >= 4 && arr.push(String(day).padStart(2, "0"));
          type >= 3 && arr.push(String(hour).padStart(2, "0"));
          type >= 2 && arr.push(String(min).padStart(2, "0"));
          arr.push(String(second).padStart(2, "0"));
        } else {
          // 分开
          type >= 4 &&
            arr.push(
              ...String(day)
                .padStart(2, "0")
                .split("")
            );
          type >= 3 &&
            arr.push(
              ...String(hour)
                .padStart(2, "0")
                .split("")
            );
          type >= 2 &&
            arr.push(
              ...String(min)
                .padStart(2, "0")
                .split("")
            );
          arr.push(
            ...String(second)
              .padStart(2, "0")
              .split("")
          );
        }
        this.timeArray = arr;
        if (isFirst) {
          this.timeArrayT = [...this.timeArray];
          this.isAnimate = new Array(this.timeArray.length).fill(false);
        }
        if (t > 0) {
          this.start();
        } else {
          this.$emit("timeUp");
        }
      }, 1000);
    },
    onAnimateEnd(index) {
      this.$set(this.isAnimate, index, false);
    },
    isTimeUnitShow(index) {
      console.log("this.arr是什么：", this.arr);
      if (this.arr.includes(index)) {
        if (index === this.timeArray.length - 1 && !this.timeUnit[3]) {
          return false;
        }
        return true;
      }
      return false;
    },
    setTimeUnit(index) {
      switch (index) {
        case this.timeArray.length - 1:
          return this.timeUnit[3] || ""; // 秒
        case this.timeArray.length - this.step - 1:
          return this.timeUnit[2] || ""; // 分
        case this.timeArray.length - this.step * 2 - 1:
          return this.timeUnit[1] || ""; // 时
        default:
          return this.timeUnit[0] || ""; // 天
      }
    }
  }
};
</script>

<style lang="less">
.vue-countdown-component {
  display: flex;
  @keyframes animate-filp {
    0% {
      transform: rotateX(0);
    }
    100% {
      transform: rotateX(-180deg);
    }
  }
  @keyframes animate-filp2 {
    0% {
      transform: rotateX(180deg);
    }
    100% {
      transform: rotateX(0);
    }
  }
  &.theme2 {
    .time-box {
      min-width: 21px;
      & + .time-box {
        margin-left: 1px;
      }
    }
  }
  .time-unit {
    padding: 0 4px;
    color: #222;
    font-size: 14px;
    line-height: 30px;
  }
  .time-box {
    position: relative;
    box-sizing: border-box;
    height: 30px;
    min-width: 28px;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    background-color: #6c96e8;
    color: #ffffff;
    perspective: 50px;
    border-radius: 3px;
    padding: 0 2px;
    &:before {
      content: "";
      position: absolute;
      background: #a7c7ff;
      width: 2px;
      height: 6px;
      top: 50%;
      left: -1px;
      margin-top: -3px;
    }
    &:after {
      content: "";
      position: absolute;
      background: #a7c7ff;
      width: 2px;
      height: 6px;
      top: 50%;
      right: -1px;
      margin-top: -3px;
    }
    & + .time-box {
      margin-left: 8px;
    }
    & > div {
      position: absolute;
      left: 0;
      width: 100%;
      height: 50%;
      overflow: hidden;

      transform-style: preserve-3d;
      & > div {
        position: absolute;
        left: 0;
        width: 100%;
        height: 30px;
      }
      &.a0 {
        top: 0;
        // opacity: 0;
        border-radius: 3px 3px 0 0;
        background-color: #6c96e8;
        transform-origin: 50% bottom;
        animation-duration: 500ms;
        // animation-fill-mode: none;
        transform: rotateX(0);
        backface-visibility: hidden;
        z-index: 2;
        &.anime {
          animation-name: animate-filp;
        }
        & > div {
          top: 0;
        }
      }
      &.b0 {
        top: 15px;
        border-radius: 0 0 3px 3px;
        background-color: #73a1f8;
        transform-origin: 50% top;
        animation-duration: 500ms;
        // animation-fill-mode: none;
        transform: rotateX(180deg);
        backface-visibility: hidden;
        z-index: 2;
        & > div {
          bottom: 0;
        }
        &.anime {
          animation-name: animate-filp2;
        }
      }
      &.a1 {
        top: 15px;
        border-radius: 0 0 3px 3px;
        background-color: #73a1f8;
        & > div {
          bottom: 0;
        }
      }
    }
  }
}
</style>