<template>
	<form ref="form" model="form">
		<div class="van-divider--center" v-show="showT">
			暂无签核数据
		</div>
		<div>
			<loading v-model="showLoading" :text="loadText"></loading>
		</div>
		<!-- 待签核清单列表 -->
		<div v-show="!msgbox">
			<group class="formItem" v-for="(item, index) in opinionsLists" :key="index" id="listId">
				<form-preview :header-label="titles" :header-value="titlesv" :body-items="opinionsLists[0]"
					:name="opinionsList.id" />
			</group>
			<van-field v-model="form.type" v-show="false"></van-field>
			<van-field v-model="form.audituser" v-show="false"></van-field>
			<van-field v-model="form.backuser" v-show="false"></van-field>
			<van-field v-model="form.backremark" :error-message="errorMsg.resulta" type="textarea"
				placeholder="请输入退回原因" @change="query" rows="3" autosize />
			<box gap="20px 20px" v-show="!butonShow" >
				<flexbox>
					<flexbox-item>
						<van-button type="primary" size="large" class="van-button--large" round @click="submit('a')">
							<span style="font-size:20px">同意</span>
						</van-button>
					</flexbox-item>
					<flexbox-item>
						<van-button type="danger" size="large" class="van-button--large" round @click="submit('b')">
							<span style="font-size:20px">退回</span>
						</van-button>
					</flexbox-item>
				</flexbox>
			</box>
		</div>
		<msg v-show="msgbox">
			<template slot="buttons">
				<x-button plain type="primary">操作成功</x-button>
			</template>
		</msg>
		<van-field v-show="false" v-model="form.startimea" :error-message="errorMsg.resulta" :border="false" />
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
	import {
		getReleaseapply,
		updateReleaseapply
	} from "@/api/relapply";
	import Conversion from "@/utils/Conversion";
	import {
		FormPreview,
		Group,
		Msg,
		Loading
	} from 'vux';
	import {
		getCode
	} from "@/api/login";
	import {
		getEmployee
	} from "@/api/user";
	export default {
		data() {
			return {
				id: '',
				userNo: this.$store.state.userNo,
				titles: '状态',
				titlesv: '待签核',
				showT: false, //无数据显示
				msgbox: false, //操作成功对话框
				opinShow: false,
				butonShow:false,
				opinionsList: [],
				opinionsLists: [],
				// 第一：错误信息
				errorMsg: {
					resulta: '',
				},
				showLoading: true,
				loadText: '加载中...',
				count: 0,
				timer: 0,
				// 表单参数
				form: {
					type: '',
					audituser: '',
					backuser: '',
					backremark: '',
				},
				active: 1,
				// 第一：错误信息
				tabbars: [{
						name: "/apply",
						title: "放行申请",
						normal: require('@/pages/images/pass.png'),
						active: require('@/pages/images/passa.png')
					},
					{
						name: "/login",
						title: "工作台",
						normal: require('@/pages/images/deska.png'),
						active: require('@/pages/images/desk.png')
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
		created() { //查询数据
			this.id = window.location.href.split('?id=')[1]
			if (this.id == null) {
				this.id = this.$store.state.userNo;
			}
			//从网络进来的就不要在调用了，不然太慢了
			if (this.$store.state.userId === null || this.$store.state.userId === "") {
				this.setUser(); //从网络进来的重新拿账号
			} else {
				getReleaseapply(this.id).then(response => {
					if (response.code === 200) {
						this.opinionsList = response.data;
					    console.log(this.opinionsList.states);
						if (this.opinionsList.states === 2) //已经审核过
						{
							this.errorMsg.resulta = "已经处理！";
							this.showT=true;
							this.showLoading = false;
							this.butonShow=true;
							// this.$store.commit('setUserId', this.opinionsList.managerno.replace(/\b(0+)/gi, ""))
						} else {
							this.processOpinion();
							this.showLoading = false;
							// this.$store.commit('setUserId', this.opinionsList.managerno.replace(/\b(0+)/gi, ""))
							if (this.opinionsList.length === 0) {
								this.errorMsg.resulta = "数据异常!";
							}
						}
					}
				});
			}
			//测试账号
			// this.$store.commit('setUserId', 16097)
			// this.setUserName(this.$store.state.userId)
		},
		methods: {
			tabIndex(index) {
				index = Number(index)
				this.active = index;
				// 记录当前tab页
				let val = this.tabbars[index].name
				console.log(val);
				this.$router.push(val);
			},
			// 处理传入的数据集 意见
			processOpinion() {
				let arr = [];
				let self = this;
				let a = {
					label: "申请员工",
					value: self.opinionsList.empname,
				};
				let b = {
					label: "所在部门",
					value: self.opinionsList.dept,
				};
				let c = {
					label: "出行日期",
					value: Conversion.formatDate(self.opinionsList.date),
				};
				let d = {
					label: "出行时段",
					value: self.opinionsList.startime + '~' + self.opinionsList.endtime,
				};
				let e = {
					label: "申请理由",
					value: self.opinionsList.remark,
				};
				// let f = {
				// 	label: "申请日期",
				// 	value: Conversion.formatDate(self.opinionsList.createdate),
				// };
				// let g = {
				// 	label: "签核者",
				// 	value: self.opinionsList.managername,
				// };
				let arrs = new Array(a, b, c, d, e);
				arr.push(arrs);
				self.opinShow = arr.length === 0;
				self.opinionsLists = [...arr];
			},
			submit(ref) {
				this.showLoading = true;
				if (ref == 'b') {
					this.validCode();
					this.form.type = 3;
				} else {
					this.form.type = 2;
				}
				this.form.id = this.opinionsList.id; //id 主键
				let managernos = this.opinionsList.managerno.replace(/\b(0+)/gi, "");
				this.form.audituser = managernos;
				this.form.backuser = managernos;
				updateReleaseapply(this.form).then(response => {
					if (response.code === 200) {
						this.showLoading = false;
						if (response.data.Message.length > 0) //有错误的时候显示错误内容
						{
							this.errorMsg.resulta = response.data.Message;
						} else {
							this.msgbox = true;
							const timejump = 1;
							if (!this.timer) {
								this.count = timejump;
								this.timer = setInterval(() => {
									if (this.count > 0 && this.count <= timejump) {
										this.count--;
									} else {
										this.show = true;
										clearInterval(this.timer);
										this.timer = null;
										//跳转的页面写在此处
										this.$router.push('/managercheck') //这个退回到登入界面
									}
								}, 100)
							}
						}
					} else {
						this.errorMsg.resulta = "新增失败!";
					}

				});
			},
			validCode() {
				const value = this.form.backremark;
				if (!value) {
					this.errorMsg.resulta = '退回原因';
				}
			},
			//改变文本框里面的值，否则要detail才有值
			query(e) {
				if (e) {
					this.form.backremark = e.detail
				}
			},
			backHome() {
				this.$router.push(this.$store.state.tableIndex);
			},
			//考虑从超链接进来的要重新设置
			setUser() {
				const code = Conversion.getUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
				if (code !== null) {
					// 通过code获取 openId等用户信息
					getCode(code)
						.then((data) => {
							if (data.code === 1) {
								let userId = data.data.empNo.trim()
								this.$store.commit('setUserId', userId)
								this.setUserName(this.$store.state.userId)
							}
						})
						.catch((err) => {
							console.log(err)
						})
				} else {
					Conversion.getCodeApi('a')
				}

			},
			// 获取当前登录人名称
			setUserName(userId) {
				if (userId === null || userId === '') return
				getEmployee(userId)
					.then((data) => {
						if (data.msg === "操作成功") {
							this.$store.commit('setUserName', data.data.empName);
							this.$store.commit('setSex', data.data.empSex);
							getReleaseapply(this.id).then(response => {
								if (response.code === 200) {
									this.opinionsList = response.data;
									console.log(this.opinionsList.states);
									if (this.opinionsList.states === 2) //已经审核过
									{
										this.errorMsg.resulta = "已经处理！";
										this.showLoading = false;
										this.showT=true;
										this.butonShow=true;
									} else {
										this.processOpinion();
										this.showLoading = false;
										// this.$store.commit('setUserId', this.opinionsList.managerno.replace(
										// 	/\b(0+)/gi, ""))
										if (this.opinionsList.length === 0) {
											this.errorMsg.resulta = "数据异常!";
										}
									}
								}
							});
						} else {
							console.log(err);
						}
					})
					.catch((err) => {
						console.log(err)
					});
			},
		},
		components: {
			Loading
		}
	};
</script>

<style>
	.van-divider--center {
		text-align: center;
		font-size: larger;
		color: #007AFF;
	}

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

	.vux-form-preview>>>.weui-form-preview__value {
		font-size: 0.8em;
	}

	.vux-flexbox>>>.van-button--large {
		width: 100%;
		height: var(--button-large-height, 38px);
	}

	.gridCell>>>.van-icon {
		font-size: 50px;
	}
	.vant-nav-bar-index >>>.van-icon-arrow-left:before {
	    color: #999999;
		block-size:30px;
	}
	/* .weui-form-preview[data-v-124387c3]
	{
	  float: center;
	  margin-right: 1em;
	  min-width: 4em;
	  max-width: em;
	  color: var(--weui-FG-1);
	  text-align: right;
	  text-align-last: right
	} */
</style>
