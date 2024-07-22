
### dataTimePicker

时间选择器，支持时间+日期

**使用方式：**

在 `script` 中引用组件

```javascript
import simpleDatetimePicker from "@/components/simple-datetime-picker/simple-datetime-picker.vue";
	
export default {
  components: { simpleDatetimePicker }
};
```

使用组件

```html
	<simple-datetime-picker  @submit="onConfirm"></simple-datetime-picker>
```
```script
	// 监听选择
			onConfirm(e) {
			   console.log(e);
			   this.date = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`;
			},
```

**事件说明：**

|事件称名|说明|返回参数|
|---|----|---|
|onConfirm|确定时间的事件|返回格式{
	"year": "",
	"month": "",
	"day": "",
	"hour": "",
	"minute": "",
	"second": ""
}
|


### 更新日志

**1.0.0**

- 初始项目