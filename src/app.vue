<template>
<div class="page">
  <div class="title">倒计时DEMO</div>
  <div class="box">
    <div>基本</div>
    <Down :endDate="timestemp" />
  </div>
  <div class="box">
    <div>加间隔符号</div>
    <Down :endDate="timestemp" :timeUnit="timeUnit1" />
    <br/>
    <Down :endDate="timestemp" :timeUnit="timeUnit2" />
  </div>
  <div class="box">
    <div>不同的样式 :theme="2"</div>
    <Down :endDate="timestemp" :theme="2"  :timeUnit="timeUnit1"/>
  </div>
  <div class="box">
    <div>不同的单位 :type="4/3/2/1"</div>
    <Down :endDate="time" :timeUnit="timeUnit2" :type="type" />
    <br/>
    <div class='f'>
      <span>选择单位：</span>
      <el-select v-model="type">
        <el-option
          label="日时分秒(:type='4')"
          :value="4">
        </el-option>
        <el-option
          label="时分秒(:type='3')"
          :value="3">
        </el-option>
        <el-option
          label="分秒(:type='2')"
          :value="2">
        </el-option>
        <el-option
          label="秒(:type='1')"
          :value="1">
        </el-option>
      </el-select>
    </div>
    <br/>
    <div class="f"><span>设置时间(ms): </span><el-input class="el-input" v-model="time" /></div>
  </div>
  <br/>
  <br/>
  <a class="a" href="https://github.com/javaLuo/vue-flip-down" target="_blank">Github</a>
  </div>
</template>

<script>
import {ref} from "vue";
import Down from "vue-flip-down";

export default {
  name: "App",
  components:{
    Down,
  },
  setup(){
    const type = ref(4);
    const time = ref(Date.now() + 31536000000);

    const setTime = (num) => {
      time.value = num;
    };

    return {
      timestemp: Date.now() + 31536000000,
      timeUnit1: [':',':',':'],
      timeUnit2: ['天','时','分','秒'],
      type,
      time,
      setTime
    }
  }
};
</script>

<style lang="less">
.page{
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
}
.title{
  text-align: center;
  font-size: 24px;
}
.box{
  min-width: 320px;
  margin: 40px auto 0 auto;
  color:#222;
  
  &>div:first-child{
    margin-bottom: 10px;
  }
}
.f{
  display:flex;
  align-items: center;
  span{
    width: 120px;
  }
  .el-input{
    width: 180px;
  }
}
.a{
  margin: 0 auto;
  padding: 10px;
  color:rgb(8, 130, 245);
  text-decoration: none;
  &:hover{
    color:rgb(70, 159, 243);
  }
}
</style>
