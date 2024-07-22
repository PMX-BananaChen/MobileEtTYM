<template>
   <view class="datetime-picker">
      <view
         class="mask"
         :class="{ show: open }"
         @touchmove.stop.prevent
         catchtouchmove="true"
		 @click="hide"
      ></view>
      <view class="wrap" :class="{ show: open }">
         <view class="picker-header" @touchmove.stop.prevent catchtouchmove="true">
            <view
               class="btn-picker cancel"
               :style="{ color: color }"
               @click="open = false"
            >取消</view>
            <view
               class="btn-picker submit"
               :style="{ backgroundColor: color }"
               @click="_onSubmit"
            >确定</view>
         </view>
         <view class="picker-body">
            <picker-view :value="value" @change="_onChange">
               <picker-view-column>
                  <view class="column-item" v-for="item in years">
                     {{ item }}年
                  </view>
               </picker-view-column>
               <picker-view-column>
                  <view class="column-item" v-for="item in months">
                     {{ item | formatNum }}月
                  </view>
               </picker-view-column>
               <picker-view-column>
                  <view class="column-item" v-for="item in days">
                     {{ item | formatNum }}日
                  </view>
               </picker-view-column>
               <picker-view-column>
                  <view class="column-item" v-for="item in hours">
                     {{ item | formatNum }}时
                  </view>
               </picker-view-column>
               <picker-view-column>
                  <view class="column-item" v-for="item in minutes">
                     {{ item | formatNum }}分
                  </view>
               </picker-view-column>
               <picker-view-column>
                  <view class="column-item" v-for="item in seconds">
                     {{ item | formatNum }}秒
                  </view>
               </picker-view-column>
            </picker-view>
         </view>
      </view>
   </view>
</template>

<script>
const formatNum = num => {
   return num < 10 ? "0" + num : num + "";
};

export default {
   name: "datetime-picker",
   data() {
	   const date = new Date()
	   const years = []
	   const year = date.getFullYear()
	   const months = []
	   const month = date.getMonth() + 1
	   const days = []
	   const day = date.getDate()
	   const hours = []
	   const hour = date.getHours()
	   const minutes = []
	   const minute = date.getMinutes()
	   const seconds = []
	   const second = date.getSeconds()
	   
	   for (let i = 2000; i <= date.getFullYear(); i++) {
	       years.push(i)
	   }
	   
	   for (let i = 1; i <= 12; i++) {
	       months.push(i)
	   }
	   
	   for (let i = 1; i <= 31; i++) {
	       days.push(i)
	   }
	   for (let i = 0; i <= 23; i++) {
	      hours.push(i);
	   }
	   for (let i = 0; i < 60; i++) {
	       minutes.push(i);
	   }
	   for (let i = 0; i < 60; i++) {
	       seconds.push(i);
	   }
      return {
		 date,
         open: false,
         years,
         year,
         months,
         month,
         days,
         day,
		 hours,
         hour,
		 minutes,
         minute,
		 seconds,
		 second,
         value: [9999, month - 1, day - 1, hour, minute, second]
      };
   },

   mounted() {
      this.init();
   },

   watch: {
      month() {
         this.getDays();
      },
	  year() {
	     this.getDays();
	  }
   },

   filters: {
      formatNum(num) {
         return formatNum(num);
      }
   },

   methods: {
      init() {
         this.setSelectValue();
      },
	  getDays(){
	
		 let selectedYear = this.date.getFullYear();
		 let selectedMonth = this.date.getMonth() + 1;
		 
		  let days = [];
			 if(this.open){
				  selectedYear = this.years[this.value[0]];
				  selectedMonth = this.months[this.value[1]];
			 }
			 
		 let  totalDays = new Date(selectedYear, selectedMonth, 0).getDate();
		 for (let i = 1; i <= totalDays; i++) {
		 	  days.push(i);
		  } 
		         
		  this.days = days;
		  
	  },
      show() {
         this.open = true;
      },

      hide() {
         this.open = false;
      },

      _onChange(e) {
         const value = e.detail.value;
         this.value = e.detail.value;
         this.setSelectValue();
      },

      setSelectValue() {
		  if(this.years[this.value[0]]){
			  
			  this.year = this.years[this.value[0]];
		 }else{
			  this.year = this.years[this.years.length -1];
		 }
         this.month = this.months[this.value[1]];
		 if(this.days[this.value[2]]){
		 	 this.day = this.days[this.value[2]];
		 }else{
		 	 this.day = this.days[this.days.length -1];
		 }
        
         this.hour = this.hours[this.value[3]];
         this.minute = this.minutes[this.value[4]];
		 this.second = this.minutes[this.value[5]];
      },

      _onSubmit() {
		 this.setSelectValue();
         const result = {
            year: formatNum(this.year),
            month: formatNum(this.month),
            day: formatNum(this.day),
            hour: formatNum(this.hour),
            minute: formatNum(this.minute),
            second: formatNum(this.second)
         };
         this.$emit("submit", result);
         this.hide();
      }
   }
};
</script>

<style lang="scss">
$transition: all 0.3s ease;
$primary: #488ee9;

.datetime-picker {
   position: relative;
   z-index: 999;

  picker-view {
      width: 100%;
      height: 600rpx;
      margin-top:20rpx;
  }
   
   .mask {
      position: fixed;
      z-index: 1000;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.6);
      visibility: hidden;
      opacity: 0;
      transition: $transition;
      &.show {
         visibility: visible;
         opacity: 1;
      }
   }

   .wrap {
      z-index: 1001;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      transition: $transition;
      transform: translateY(100%);
      &.show {
         transform: translateY(0);
      }
   }

   .picker-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 8px 8px;
      background-color: darken(#fff, 2%);
      background-color: #fff;
   }

   .picker-body {
      width: 100%;
      height: 420rpx;
      overflow: hidden;
      background-color: #fff;
   }

   .column-item {
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
	  line-height: 100rpx;
	  text-align: center;
   }

   .btn-picker {
      position: relative;
      display: inline-block;
      padding-left: 10px;
      padding-right: 10px;
      box-sizing: border-box;
      text-align: center;
      text-decoration: none;
      line-height: 2;
      -webkit-tap-highlight-color: transparent;
      overflow: hidden;
      background-color: #f8f8f8;
      font-size: 14px;
      border-radius: 2px;
      color: $primary;
   }

   .btn-picker.submit {
      background-color: $primary;
      color: #fff;
   }
}
</style>
