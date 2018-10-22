# vue-flip-down  [![npm](https://img.shields.io/npm/v/vue-flip-down.svg)](https://www.npmjs.com/package/vue-flip-down)


这是一个简单的翻页倒计时vue组件，项目中有用到，所以提取了一下。

### 示例
![img](https://github.com/javaLuo/vue-flip-down/blob/master/public/demo.gif)

### 安装
```
npm install vue-flip-down --save
或
yarn add vue-flip-down 
```

### 使用
```
import FlipDown from 'vue-flip-down';

<FlipDown
  :endDate="1540212399971"
>
```

### 参数

|名称|类型|默认值|描述|
|----|----|----|----|
|endDate|Date/Number|0|结束的时间，即倒计时会从当前时间一直到endDate停止，可以是一个日期对象，也可以是毫秒数|
|type|Number|4|要怎么显示倒计时：4-日时分秒，3-时分秒，2-分秒，1-秒|


### 说明

* 内部使用了setTimeout，当倒计时结束后，就会停止循环。但可以动态改变日期，倒计时又会被激活。
* 基于本地时间做对比
