<!-- 翻页效果 倒计时组件 -->
<template>
  <div
    :class="['vue-countdown-component', { theme2: theme !== 1 }, { ie: isIE }]"
  >
    <template v-for="(item, index) in timeArray" :key="index">
      <div :class="['time-box']">
        <!-- 底层基础div -->
        <div class="base">
          {{ item }}
          <div class="base-b">{{ timeArrayT[index] }}</div>
        </div>
        <!-- 翻页动画div -->
        <div
          :class="['face', { anime: isAnimate[index] }]"
          @animationend="onAnimateEnd(index)"
        >
          {{ timeArrayT[index] }}
        </div>
        <div :class="['back', { anime: isAnimate[index] }]">{{ item }}</div>
      </div>
      <!-- 文字 -->
      <div
        class="time-unit"
        :key="`unit-${index}`"
        v-if="isTimeUnitShow(index)"
      >
        {{ setTimeUnit(index) }}
      </div>
    </template>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
export default {
  emits: ["timeUp"],
  props: {
    endDate: { type: [Date, Number, String], default: 0 }, // 截止时间
    type: { type: [Number, String], default: 4 }, // 时间精度 4/3/2/1
    theme: { type: [Number, String], default: 1 },
    timeUnit: { type: Array, default: () => [] },
  },
  setup(props, context) {
    const isIE = ref(false);
    const timeArray = ref(
      props.theme === 2
        ? new Array(props.type * 2).fill("0")
        : new Array(props.type).fill("00")
    );
    const timeArrayT = ref(
      props.theme === 2
        ? new Array(props.type * 2).fill("0")
        : new Array(props.type).fill("00")
    );
    const isAnimate = ref(
      props.theme === 2
        ? new Array(props.type * 2).fill(false)
        : new Array(props.type).fill(false)
    );
    const timer = ref(null);

    const endTime = computed(() => {
      if (props.endDate instanceof Date) {
        return props.endDate.getTime();
      }
      return Number(props.endDate) > 0 ? Number(props.endDate) : 0;
    });

    const step = computed(() => (props.theme === 1 ? 1 : 2));
    const arr = computed(() => {
      const length = timeArray.value.length;
      const temp = [
        length - 1,
        length - step.value - 1,
        length - step.value * 2 - 1,
        length - step.value * 3 - 1,
      ];
      temp.length = props.type > 1 ? props.type : 1;
      return temp;
    });

    watch(timeArray, (newV, oldV) => {
      const diff = [];
      newV.forEach((value, index) => {
        if (value !== oldV[index]) {
          diff.push({ value, index });
          isAnimate.value[index] = true;
        }
      });
      setTimeout(() => {
        diff.forEach((item) => {
          timeArrayT.value[item.index] = item.value;
        });
      }, 350);
    });

    watch(endTime, (newV) => {
      if (newV > 0) {
        start();
      }
    });

    onMounted(() => {
      if (
        window.ActiveXObject ||
        "ActiveXObject" in window ||
        window.navigator.userAgent.indexOf("Edge") > -1
      ) {
        isIE.value = true;
      }
      start(0);
    });

    onBeforeUnmount(() => {
      clearTimeout(timer.value);
    });

    /**
     * 开始倒计时
     * @param st 重复执行的间隔时间
     */
    const start = (st = 1000) => {
      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        let t = endTime.value - new Date().getTime(); // 剩余的毫秒数
        t = t < 0 ? 0 : t;
        let day = 0; // 剩余的天
        let hour = 0; // 剩余的小时
        let min = 0; // 剩余的分钟
        let second = 0; // 剩余的秒
        const type = Number(props.type);
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

        let ar = [];
        if (Number(props.theme) === 1) {
          // 不分开
          type >= 4 && ar.push(String(day).padStart(2, "0"));
          type >= 3 && ar.push(String(hour).padStart(2, "0"));
          type >= 2 && ar.push(String(min).padStart(2, "0"));
          ar.push(String(second).padStart(2, "0"));
        } else {
          // 分开
          type >= 4 && ar.push(...String(day).padStart(2, "0").split(""));
          type >= 3 && ar.push(...String(hour).padStart(2, "0").split(""));
          type >= 2 && ar.push(...String(min).padStart(2, "0").split(""));
          ar.push(...String(second).padStart(2, "0").split(""));
        }
        timeArray.value = ar;

        if (t > 0) {
          start();
        } else {
          context.emit("timeUp");
        }
      }, st);
    };

    // 动画完毕后，去掉对应的class, 为下次动画做准备
    const onAnimateEnd = (index) => {
      isAnimate.value[index] = false;
    };

    const isTimeUnitShow = (index) => {
      if (arr.value.includes(index)) {
        if (index === timeArray.value.length - 1 && !props.timeUnit[3]) {
          return false;
        }
        return true;
      }
      return false;
    };

    const setTimeUnit = (index) => {
      switch (index) {
        case timeArray.value.length - 1:
          return props.timeUnit[3] || ""; // 秒
        case timeArray.value.length - step.value - 1:
          return props.timeUnit[2] || ""; // 分
        case timeArray.value.length - step.value * 2 - 1:
          return props.timeUnit[1] || ""; // 时
        default:
          return props.timeUnit[0] || ""; // 天
      }
    };

    return {
      isIE,
      timeArray,
      timeArrayT,
      isAnimate,
      endTime,
      step,
      arr,
      onAnimateEnd,
      isTimeUnitShow,
      setTimeUnit,
    };
  },
};
</script>

<style lang="less">
.vue-countdown-component {
  display: flex;
  @keyframes animate-filp-face {
    0% {
      transform: rotateX(-0.01deg);
      opacity: 1; // 改变opacity 为了QQ浏览器和safari(不支持z-index animate)
    }
    50% {
      opacity: 1;
    }
    51% {
      opacity: 0;
    }
    100% {
      transform: rotateX(-180deg);
      opacity: 0;
    }
  }
  @keyframes animate-filp-back {
    0% {
      transform: rotateX(180deg);
    }
    100% {
      transform: rotateX(-0.01deg);
    }
  }
  &.ie {
    // 为了ie和老版edge（不支持clip-path）
    .base {
      .base-b {
        clip: rect(15px, auto, auto, auto);
      }
    }
    .face {
      clip: rect(auto, auto, 15px, auto);
    }
    .back {
      clip: rect(15px, auto, auto, auto);
    }
  }
  &.theme2 {
    .time-box {
      min-width: 20px;
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
    white-space: nowrap;
  }
  .time-box {
    position: relative;
    box-sizing: border-box;
    height: 30px;
    min-width: 28px;
    font-size: 14px;
    text-align: center;
    background-color: #6c96e8;
    perspective: 60px;
    border-radius: 3px;
    padding: 0 2px;
    color: #fff;
    line-height: 30px;

    &:before {
      content: "";
      position: absolute;
      background: #a7c7ff;
      width: 1px;
      height: 6px;
      top: 50%;
      left: -1px;
      margin-top: -3px;
      z-index: -1;
    }
    &:after {
      content: "";
      position: absolute;
      background: #a7c7ff;
      width: 1px;
      height: 6px;
      top: 50%;
      right: -1px;
      margin-top: -3px;
      z-index: -1;
    }
    & + .time-box {
      margin-left: 8px;
    }
    & > div {
      overflow: hidden;
      animation-timing-function: linear;
      animation-duration: 400ms;
      // 为了chrome，需要一个小的角度，否则字体渲染错位
      transform: rotateX(-0.01deg);
      border-radius: 3px;
      &.base {
        position: relative;
        .base-b {
          position: absolute;
          left: 0;
          bottom: 0;
          border-radius: 0 0 3px 3px;
          width: 100%;
          height: 100%;
          background-color: #709bf1; // a1比base浅一点点，为了模拟翻页的阴影效果
          // background-color: #0ff;
          clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
        }
      }
      &.face {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #6c96e8;
        // background-color: #f00;
        backface-visibility: visible;
        clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
        z-index: 2;
        &.anime {
          animation-name: animate-filp-face;
        }
      }
      &.back {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #709bf1; // b0和a1一致
        // background-color: #aa0;
        transform: rotateX(-180deg);
        backface-visibility: visible;
        clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
        &.anime {
          animation-name: animate-filp-back;
        }
      }
    }
  }
}
</style>
