<!-- 翻页效果 倒计时组件 -->
<template>
  <div class="vue-countdown-component">
    <!-- 天 -->
    <div class="time-box"
         v-if="type>=4">
      {{day}}
      <div :class="['b0',{'anime': isDayAnime}]">
        <div>{{day}}</div>
      </div>
      <div :class="['a0',{'anime': isDayAnime}]"
           @animationend="onDayAnimateEnd">
        <div>{{dayDelay}}</div>
      </div>
      <div class="a1">
        <div>{{dayDelay}}</div>
      </div>
    </div>

    <!-- 时 -->
    <div class="time-box"
         v-if="type>=3">
      {{hour}}
      <div :class="['b0',{'anime': isHourAnime}]">
        <div>{{hour}}</div>
      </div>
      <div :class="['a0',{'anime': isHourAnime}]"
           @animationend="onHourAnimateEnd">
        <div>{{hourDelay}}</div>
      </div>
      <div class="a1">
        <div>{{hourDelay}}</div>
      </div>
    </div>

    <!-- 分 -->
    <div class="time-box"
         v-if="type>=2">
      {{min}}
      <div :class="['b0',{'anime': isMinAnime}]">
        <div>{{min}}</div>
      </div>
      <div :class="['a0',{'anime': isMinAnime}]"
           @animationend="onMinAnimateEnd">
        <div>{{minDelay}}</div>
      </div>
      <div class="a1">
        <div>{{minDelay}}</div>
      </div>
    </div>

    <!-- 秒 -->
    <div class="time-box">
      {{second}}
      <div :class="['b0',{'anime': isSecondAnime}]">
        <div>{{second}}</div>
      </div>
      <div :class="['a0',{'anime': isSecondAnime}]"
           @animationend="onSecondAnimateEnd">
        <div>{{secondDelay}}</div>
      </div>
      <div class="a1">
        <div>{{secondDelay}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      day: '', // 剩余日
      dayDelay: '',
      hour: '', // 剩余小时
      hourDelay: '',
      min: '', // 剩余分钟
      minDelay: '',
      second: '', // 剩余秒
      secondDelay: '',
      timer: null, // 计时器
      isDayAnime: false, // 日 执行动画
      isHourAnime: false, // 时 执行动画
      isMinAnime: false, // 分 执行动画
      isSecondAnime: false, // 秒 执行动画
    };
  },
  props: {
    endDate: { type: [Date, Number, String], default: 0 }, // 截止时间
    type: { type: [Number, String], default: 4 }, // 时间精度 4/3/2/1
  },
  computed: {
    endTime() {
      if (this.endDate instanceof Date) {
        return this.endDate.getTime();
      }
      return Number(this.endDate) > 0 ? Number(this.endDate) : 0;
    },
  },
  watch: {
    day(newV) {
      this.isDayAnime = true;
      setTimeout(() => {
        this.dayDelay = newV;
      }, 350);
    },
    hour(newV) {
      this.isHourAnime = true;
      setTimeout(() => {
        this.hourDelay = newV;
      }, 350);
    },
    min(newV) {
      this.isMinAnime = true;
      setTimeout(() => {
        this.minDelay = newV;
      }, 350);
    },
    second(newV) {
      this.isSecondAnime = true;
      setTimeout(() => {
        this.secondDelay = newV;
      }, 350);
    },
    endTime(newV) {
      if (newV > 0) {
        this.start();
      }
    },
  },

  mounted() {
    this.start();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    // 开始倒计时
    start() {
      clearTimeout(this.timer);
      console.log('每秒1次啊');
      this.timer = setTimeout(() => {
        let t = this.endTime - new Date().getTime(); // 剩余的毫秒数
        t = t < 0 ? 0 : t;
        let day = 0; // 剩余的天
        let hour = 0; // 剩余的小时 已排除天
        let min = 0; // 剩余的分钟 已排除天和小时
        let second = 0; // 剩余的秒
        let type = Number(this.type);
        if (type >= 4) {
          day = Math.floor(t / 86400000); // 剩余的天
          hour = Math.floor(t / 3600000 - day * 24); // 剩余的小时 已排除天
          min = Math.floor(t / 60000 - day * 1440 - hour * 60); // 剩余的分钟 已排除天和小时
          second = Math.floor(t / 1000 - day * 86400 - hour * 3600 - min * 60); // 剩余的秒
        } else if (type >= 3) {
          hour = Math.floor(t / 3600000); // 剩余的小时 已排除天
          min = Math.floor(t / 60000 - hour * 60); // 剩余的分钟 已排除天和小时
          second = Math.floor(t / 1000 - hour * 3600 - min * 60); // 剩余的秒
        } else if (type >= 2) {
          min = Math.floor(t / 60000); // 剩余的分钟 已排除天和小时
          second = Math.floor(t / 1000 - min * 60); // 剩余的秒
        } else {
          second = Math.floor(t / 1000); // 剩余的秒
        }

        this.day = String(day).padStart(2, '0');
        this.hour = String(hour).padStart(2, '0');
        this.min = String(min).padStart(2, '0');
        this.second = String(second).padStart(2, '0');

        if (t > 0) this.start();
      }, 1000);
    },
    // 日 动画结束
    onDayAnimateEnd() {
      this.isDayAnime = false;
    },
    onHourAnimateEnd() {
      this.isHourAnime = false;
    },
    onMinAnimateEnd() {
      this.isMinAnime = false;
    },
    onSecondAnimateEnd() {
      this.isSecondAnime = false;
    },
  },
};
</script>

<style lang="less" scoped>
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
      content: '';
      position: absolute;
      background: #a7c7ff;
      width: 2px;
      height: 6px;
      top: 50%;
      left: -1px;
      margin-top: -3px;
    }
    &:after {
      content: '';
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