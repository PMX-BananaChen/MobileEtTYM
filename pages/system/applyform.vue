<template>
	<form ref="form" model="form">
		<van-nav-bar left-arrow @click-left="backHome" />
		<van-field v-model="form.empno" label="申请工号" @blur="validCode0" :error-message="errorMsg.empnoa" required
			@change="query" />
		<van-field v-model="form.createuserempno" label="创建者工号" readonly v-show="false" />
		<div>
			<table>
				<tr>
					<td>
						<label style="font-size:15px;margin:60px 0 0 10px">通行日期</label>
					</td>
					<td>
						<picker mode="multiSelector" :range="dateTimeArray" v-model="form.dateTime" @change="change"
							@columnchange="columnchange">
							<input type="text" disabled="true" style="margin:5px 0 0 28px"
								placeholder-class="inputPlace" v-model="form.date" />
						</picker>
					</td>
				</tr>
			</table>
		</div>
		<van-field label="开始时段" v-model="form.startime" @blur="validCode" :error-message="errorMsg.startperioda"
			placeholder="请输入开始时段,如1200" :border="false" @change="query1" required />
		<van-field v-model="form.endtime" label="结束时段" @blur="validCode2" :error-message="errorMsg.endperioda"
			placeholder="请输入结束时段,如1800" :border="false" @change="query2" required />
		<van-field v-model="form.remark" :error-message="errorMsg.resulta" type="textarea" placeholder="请输入申请理由"
			rows="3" autosize @change="query3" required />
		<div style="margin: 16px;">
			<van-button round block type="primary" native-type="submit" @click="submit('form')">提交
			</van-button>
		</div>
		<div>
			<loading v-model="showLoading" :text="loadText"></loading>
		</div>
		<van-tabbar v-model="active" active-color="#ff4c7f" class="weui-tabbar">
			<van-tabbar-item :to="(item.name)" @click="tabIndex(index)" v-for="(item,index) in tabbars"
				:key="'tabbar' + index">
				<span>{{item.title}}</span>
				<template #icon="props">
					<img style="width:20px;height:20px;" :src="props.active ? item.active : item.normal" />
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</form>
</template>

<script>
	const dateTimePicker = require('@/util/dateTimePicker.js');
	import {
		addReleaseapply
	} from "@/api/relapply";
	import {
		Loading
	} from 'vux'
	export default {
		data() {
			return {
				// 表单参数
				form: {
					empno: this.$store.state.userId,
					createuserempno: this.$store.state.userId,
					dateTime: '', // 时间选择器
					date: '',
					startime: '',
					endtime: '',
					remark: '',
				},
				showLoading: false,
				loadText: '处理',
				active: 0,
				// 第一：错误信息  
				errorMsg: {
					empnoa: '',
					startperioda: '',
					endperioda: '',
					resulta: '',
				},
				// 第一：错误信息
				tabbars: [{
						name: "/apply",
						title: "申请",
						normal: require('@/pages/images/passa.png'),
						active: require('@/pages/images/pass.png')
					},
					{
						name: "/login",
						title: "工作台",
						normal: require('@/pages/images/desk.png'),
						active: require('@/pages/images/deska.png')
					},
					{
						name: "/mynavigation",
						title: "我的",
						normal: require('@/pages/images/my.png'),
						active: require('@/pages/images/mya.png')
					},
				]
			};
		},
		created() {
			//传入开始展示年份startYear 结束展示年份endYear
			//自定义开始显示时间
			var newDate = new Date();
			let year = newDate.getFullYear();
			let month = newDate.getMonth() + 1;
			let day = newDate.getDate();
			let arr = year + '-' + this.withData(month) + '-' + this.withData(day);
			let obj = dateTimePicker.dateTimePicker(2000, 2050, arr);
			this.dateTimeArray = obj.dateTimeArray;
			this.form.dateTime = obj.dateTime;
			this.form.date = arr;
			// this.form.empno.detail = this.$store.state.userId;
		},
		onLoad() {},
		methods: {
			validCode0() {
				const value = this.form.empno;
				if (!value) {
					this.errorMsg.empnoa = '请输入工号';
					this.form.empno.focus();
				} else if (/^[0-9]*$/.test(value)) {
					this.errorMsg.empnoa = '';
				} else {
					this.errorMsg.empnoa = '工号只能是数字';
					this.form.empno.focus();
					return false
				}
			},
			validCode() {
				if(this.form.remark===null||this.form.remark==='')
				{
					this.errorMsg.resulta = '备注不能为空';
					this.form.remark.focus();
					return false
				}
				this.form.startime = this.form.startime.replace("：", "").replace(":", "");
				const value = this.form.startime.replace("：", "").replace(":", "");
				if (!value) {
					this.errorMsg.startperioda = '请输入';
				} else if (/^(([01]?[0-9]|2[0-3])[0-5][0-9])$/.test(value)) {
					this.errorMsg.startperioda = '';
				} else {
					this.errorMsg.startperioda = '时间格式';
					return false;
				}
			},
			validCode2() {
				this.form.endtime = this.form.endtime.replace("：", "").replace(":", "");
				const value = this.form.endtime.replace("：", "").replace(":", "");
				const value0 = this.form.startime.replace("：", "").replace(":", "");
				if (!value) {
					this.errorMsg.endperioda = '请输入';
				} else if (/^([01]?[0-9]|2[0-3])[0-5][0-9]$/.test(value)) {
					this.errorMsg.endperioda = '';
					if (value0 > value) {
						this.errorMsg.endperioda = '开始时间大于结束时间';
						return false
					} else {
						if (value0 === value) {
							this.errorMsg.endperioda = '开始时间不能等于结束时间';
							return false
						}
					}


				} else {
					this.errorMsg.endperioda = '时间格式';
					return false
				}
			},
			//时间格式化
			withData(param) {
				return param < 10 ? '0' + param : '' + param;
			},
			change(e) {
				let this_ = this;
				let value = [];
				e.detail.value.forEach((val, index) => {
					if (index === 0) {
						value.push(this.withData(val));
					} else {
						value.push(this.withData(val + 1));
					}
				})
				let arr = "20" + value[0] + '-' + value[1] + '-' + value[2];
				// document.getElementById("date").val('2022/02/17 13:01:02');
				this.form.date = arr;
				console.log(this.form.date);
			},
			query(e) {
				if (e) {
					this.form.empno = e.detail
				}
			},
			query1(e) {
				if (e) {
					this.form.startime = e.detail
				}
			},
			query2(e) {
				if (e) {
					this.form.endtime = e.detail
				}
			},
			query3(e) {
				if (e) {
					this.form.remark = e.detail
				}
			},

			onIndexChange(e) {
				let indexv = e;
				switch (indexv) {
					case 'apply':
						this.title = '放行申请'
						this.$router.push('/apply')
						break
					case 'work':
						this.title = '工作台'
						this.$router.push('/login')
						break
					case 'myinformation':
						this.title = '我的'
						this.$router.push('/mynavigation')
						break
				}
			},
			columnchange(e) {
				let dateArr = this.dateTimeArray
				let arr = this.form.dateTime
				//滑动所在列的数据并对其值进行更新
				arr[e.detail.column] = e.detail.value
				//更新展示月份对应的天数（28 or 29 or 30 or 31）
				dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]])
				//最后把最新的数值赋值到dateTimeArray
				this.dateTimeArray = dateArr
				this.form.dateTime = arr
			},
			submit(ref) {
				debugger;
				if(this.form.empno===null||this.form.empno==='')
				{
					this.errorMsg.resulta = "工号不能为空!";
				}
				else
				{
					this.validCode()
					let _this = this;
					_this.showLoading = true;
					addReleaseapply(this.form).then(response => {
						debugger;
						if (response.code === 200) {
							_this.showLoading = false;
							if (response.data.Message.length > 0) //有错误的时候显示错误内容
							{
								this.errorMsg.resulta = response.data.Message;
							} else {
								this.errorMsg.resulta = "新增成功!";
								this.tabIndex = 'work'
								this.onIndexChange(this.tabIndex)
								let val = "/waitcheck";
								this.$router.push(val);
							}
						} else {
							this.errorMsg.resulta = "新增失败!";
						}
					});
				}
			},
			tabIndex(index) {
				index = Number(index)
				this.active = index;
				// 记录当前tab页
				this.$store.commit('setTableIndex', '/apply')
				let val = this.tabbars[index].name
				this.$router.push(val);
			},
			backHome() {
				this.$router.push(this.$store.state.tableIndex);
			},
		},
		components: {
			Loading
		}
	};
</script>

<style>
	.demo-checkbox-group {
		margin: 10px 0 0 20px;
	}

	.demo-checkbox {
		margin: 100px 0 0 20px;
	}

	.value-class {
		flex: none !important;
	}

	.icon {
		width: 20px;
	}

	.weui-tabbar {
		display: flex;
		position: fixed;
		z-index: 500;
		bottom: 0;
		width: 100%;
		background-color: #f7f7fa;
	}

	.van-tabbar-item--active {
		color: #e10f02;
	}

	.gridCell>>>.van-icon {
		font-size: 50px;
	}

	.vant-nav-bar-index>>>.van-icon-arrow-left:before {
		color: #999999;
		block-size: 30px;
	}
</style>
