(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a55edec"],{"3e5b":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-form",{ref:"form",attrs:{model:"form"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.showT,expression:"showT"}],staticClass:"van-divider--center"},[t._v("暂无数据")]),a("div",[a("van-nav-bar",{attrs:{"left-arrow":!0},on:{"click-left":function(e){arguments[0]=e=t.$handleEvent(e),t.backHome.apply(void 0,arguments)}}})],1),a("div",[a("loading",{attrs:{text:t.loadText},model:{value:t.showLoading,callback:function(e){t.showLoading=e},expression:"showLoading"}})],1),t._l(t.opinionsLists,(function(e,i){return a("group",{key:i,staticClass:"formItem",attrs:{id:"listId"}},[a("form-preview",{staticStyle:{color:"#1989fa"},attrs:{"header-label":t.titles,"header-value":t.titlesv,"body-items":t.opinionsLists[0],name:t.opinionsList.id}})],1)})),a("van-field",{attrs:{"error-message":t.errorMsg.resulta,border:!1},model:{value:t.form.startimea,callback:function(e){t.$set(t.form,"startimea",e)},expression:"form.startimea"}}),a("van-tabbar",{staticClass:"weui-tabbar",attrs:{"active-color":"#ff4c7f"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.tabbars,(function(e,i){return a("van-tabbar-item",{key:"tabbar"+i,attrs:{to:e.name},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tabIndex(i)}},scopedSlots:t._u([{key:"icon",fn:function(t){return[a("img",{staticStyle:{width:"20px",height:"20px"},attrs:{src:t.active?e.active:e.normal}})]}}],null,!0)},[a("span",[t._v(t._s(e.title))])])})),1)],2)},o=[]},5969:function(t,e,a){var i=a("c86c");e=i(!1),e.push([t.i,".demo-checkbox-group[data-v-6a7c2434]{margin:10px 0 0 20px}.demo-checkbox[data-v-6a7c2434]{margin:100px 0 0 20px}.value-class[data-v-6a7c2434]{flex:none!important}.icon[data-v-6a7c2434]{width:20px}.weui-tabbar[data-v-6a7c2434]{display:flex;position:fixed;z-index:500;bottom:0;width:100%;background-color:#f7f7fa}.van-tabbar-item--active[data-v-6a7c2434]{color:#e10f02}.vux-form-preview[data-v-6a7c2434] .weui-form-preview__value{font-size:.8em}.gridCell[data-v-6a7c2434] .van-icon{font-size:50px}.vant-nav-bar-index[data-v-6a7c2434] .van-icon-arrow-left:before{color:#999;block-size:30px}\n\n\t/* \t.weui-form-preview[data-v-124387c3]{\n\t  float: center;\n\t  margin-right: 1em;\n\t  min-width: 4em;\n\t  max-width: em;\n\t  color: var(--weui-FG-1);\n\t  text-align: right;\n\t  text-align-last: right\n\t} */",""]),t.exports=e},9686:function(t,e,a){"use strict";a.r(e);var i=a("3e5b"),o=a("9d1d");for(var n in o)["default"].indexOf(n)<0&&function(t){a.d(e,t,(function(){return o[t]}))}(n);a("e762");var s=a("828b"),r=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"6a7c2434",null,!1,i["a"],void 0);e["default"]=r.exports},"9d1d":function(t,e,a){"use strict";a.r(e);var i=a("ae78"),o=a.n(i);for(var n in i)["default"].indexOf(n)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=o.a},ae78:function(t,e,a){"use strict";a("6a54");var i=a("f5bd").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("64aa"),a("aa9c"),a("c223"),a("0c26");var o=a("1f67"),n=i(a("cc97")),s=(a("1fb6"),a("aacd")),r=a("53c0"),c={data:function(){return{id:"",titles:"状态",titlesv:"待签核",showT:!1,opinShow:!1,opinionsList:[],opinionsLists:[],errorMsg:{resulta:""},showLoading:!0,loadText:"加载中...",form:{startimea:""},active:!1,tabbars:[{name:"/apply",title:"申请",normal:a("bbd1"),active:a("bfc7")},{name:"/login",title:"工作台",normal:a("fb63"),active:a("d689")},{name:"/mynavigation",title:"我的",normal:a("eba7"),active:a("3e20")}]}},created:function(){var t=this;this.id=window.location.href.split("?id=")[1],null==this.id&&(this.id=this.$store.state.userNo),null===this.$store.state.userId||""===this.$store.state.userId?this.setUser():(0,o.getReleaseapply)(this.id).then((function(e){200===e.code&&(t.opinionsList=e.data,t.processOpinion(),t.showLoading=!1,0===t.opinionsList.length&&(t.errorMsg.resulta="数据异常!"))}))},methods:{tabIndex:function(t){t=Number(t),this.active=t;var e=this.tabbars[t].name;console.log(e),this.$router.push(e)},processOpinion:function(){var t=[],e={label:"申请员工",value:this.opinionsList.empname},a={label:"所在部门",value:this.opinionsList.factory},i={label:"出行日期",value:n.default.formatDate(this.opinionsList.date)},o={label:"出行时段",value:this.opinionsList.startime+"~"+this.opinionsList.endtime},s={label:"申请理由",value:this.opinionsList.remark},r={label:"申请日期",value:n.default.formatDate(this.opinionsList.createdate)},c=new Array(e,a,i,o,s,r);t.push(c),this.opinionsLists=[].concat(t)},backHome:function(){this.$router.push(this.$store.state.tableIndex)},setUser:function(){var t=this;if(""===this.$store.state.userId||null===this.$store.state.userId){var e=n.default.getUrlParam("code");e?(0,s.getCode)(e).then((function(e){if(1===e.code){var a=e.data.empNo.trim();t.$store.commit("setUserId",a),t.setUserName(t.$store.state.userId)}})).catch((function(t){console.log(t)})):n.default.getCodeApi("a")}},setUserName:function(t){var e=this;null!==t&&""!==t&&(0,r.getEmployee)(t).then((function(t){"操作成功"===t.msg?(e.$store.commit("setUserName",t.data.empName),e.$store.commit("setSex",t.data.empSex),(0,o.getReleaseapply)(e.id).then((function(t){200===t.code&&(e.opinionsList=t.data,e.processOpinion(),e.showLoading=!1,0===e.opinionsList.length&&(e.errorMsg.resulta="数据异常!"))}))):console.log(err)})).catch((function(t){console.log(t)}))}}};e.default=c},db48:function(t,e,a){var i=a("5969");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=a("967d").default;o("61dd5cbc",i,!0,{sourceMap:!1,shadowMode:!1})},e762:function(t,e,a){"use strict";var i=a("db48"),o=a.n(i);o.a}}]);