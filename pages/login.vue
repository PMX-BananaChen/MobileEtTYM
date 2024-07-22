<template>
	<view>
		<div>
			<div class="gridCell">
				<van-cell-group>
					<van-cell title="发起申请" class="van-cellfont" is-link icon="chat-o"  @click.native="onClick(3,'/apply')" />
				</van-cell-group>
				<van-cell-group title="我发起的">
					<van-grid :column-num="3">
						<van-grid-item key="waitcheck" :icon="require('./images/waitcheck.png')" text="待签核"
							@click.native="onClick(3,'/waitcheck')" />
						<van-grid-item key="checked" :icon="require('./images/checked.png')"
							@click.native="onClick(3,'/waitchecked')" text="已签核" />
						<van-grid-item key="returned" :icon="require('./images/returned.png')"
							@click.native="onClick(3,'/returnapply')" text="已退单" />
					</van-grid>
				</van-cell-group>
			</div>
			<div class="gridCell">
				<van-cell-group title="我签核的">
					<van-grid :column-num="3">
						<van-grid-item key="waitcheckme" :icon="require('./images/mywaitcheck.png')"
							@click.native="onClick(3,'/managercheck')" text="待我签核">
						</van-grid-item>
						<van-grid-item key="checkedme" :icon="require('./images/mychecked.png')"
							@click.native="onClick(3,'/managerchecked')" text="我已签核" />
						<van-grid-item key="returnedme" :icon="require('./images/myreturned.png')"
							@click.native="onClick(3,'/returnmanager')" text="我已退单" />
					</van-grid>
				</van-cell-group>
			</div>
		</div>
		<van-tabbar v-model="tabIndex" active-color="#ff4c7f" class="weui-tabbar" @change="onIndexChange">
			<van-tabbar-item name="apply" to="/apply">
				<span>发起申请</span>
				<template #icon="props">
					<img style="width:20px;height:20px;" :src="props.active ? icona.active : icona.inactive" />
				</template>
			</van-tabbar-item>

			<van-tabbar-item name="work" to="/login">
				<span>工作台</span>
				<template #icon="props">
					<img style="width:20px;height:20px;" :src="props.active ? iconJob.active : iconJob.inactive" />
				</template>
			</van-tabbar-item>

			<van-tabbar-item name="myinformation" to="/mynavigation">
				<span>我的</span>
				<template #icon="props">
					<img style="width:20px;height:20px;" :src="props.active ? iconMy.active : iconMy.inactive" />
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</view>
</template>
<script>
	// import list from '../../config';
	import {
		getCode
	} from "@/api/login";
	import {
		listConfig
	} from "@/api/relapply";
	import {
		getEmployee
	} from "@/api/user";
	import Conversion from '@/utils/Conversion.js'
	import Vue from 'vue'
	export default {
		name: "login",
		data() {
			const tabIndex = 'myinformation';
			const icona = {
				inactive: require('./images/pass.png'),
				active: require('./images/passa.png'),
			};
			const iconJob = {
				inactive: require('./images/deska.png'),
				active: require('./images/desk.png'),
			};
			const iconMy = {
				inactive: require('./images/my.png'),
				active: require('./images/mya.png'),
			};
			return {
				icona,
				iconJob,
				iconMy,
				tabIndex,
				title: '我的',
				titles: '我发起的',
			};
		},
		onLoad() {},
		mounted() {
			// 如有缓存，刷新页面时还进入该页面
			// let index = sessionStorage.getItem('tabIndex')
			// if (index) {
			// 	this.tabIndex(index)
			// }
		},
		computed: {

		},
		created() {
			this.setUser();
			this.onIndexChange(this.tabIndex);
			/*
			  测试用代码 平时请注释(下面两行)
			  需要更换人员时,修改下面工号74476 16097
			// */
			// this.$store.commit('setUserId', 6616247);
			// this.setUserName(this.$store.state.userId);
			// this.onIndexChange(this.tabIndex)
		},
		methods: {
			setUser() {
				if (
					this.$store.state.userId === '' ||
					this.$store.state.userId === null
				) {
					const code = Conversion.getUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
					// console.log('code===>' + code)
					if (code) {
						// 通过code获取 openId等用户信息
						getCode(code)
							.then((data) => {
								if (data.code === 1) {
									// console.log('授权成功')
									let userId = data.data.empNo.trim()
									this.$store.commit('setUserId', userId)
									this.setUserName(this.$store.state.userId)
									// Toast.clear()
								}
							})
							.catch((err) => {
								console.log(err);
							})
					} else {
						// console.log('a' + code)
						Conversion.getCodeApi('a')
					}
				}
			},
			// 获取当前登录人名称
			setUserName(userId) {
				if (!userId) return
				getEmployee(userId)
					.then((data) => {
						if (data.msg === "操作成功") {
							// console.log(data.data.empName);
							// console.log(data.data.empSex);
							this.$store.commit('setUserName', data.data.empName);
							this.$store.commit('setSex', data.data.empSex);
						} else {
							console.log(err);
						}
					})
					.catch((err) => {
						console.log(err);
					})
			},
			onClick(index, name) {
				let val = name;
				this.$router.push(val);
			},
			// query(e) {
			// 	if (e) {
			// 		this.form.empno = e.detail
			// 	}
			// 	},
			onIndexChange(e) {
				let indexv = e.detail;
				this.$store.commit('setTableIndex', '/login')
				switch (indexv) {
					case 'apply':
						this.title = '申请'
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
			backHome() {
				this.$router.push(this.$store.state.tableIndex);
			},
		},
	};
</script>

<style>
	.gridCell {
		background-color: #fff;
		margin: 2vh;
		border-radius: 10px;
		font-weight: bold;
		/* font-size:50px; */
	}

	.van-cell-group_title {
		font-weight: bold;
		color: #007AFF;
	}

	.van-tabbar-item--active {
		color: #e10f02;
	}

	.weui-tabbar {
		display: flex;
		position: fixed;
		z-index: 500;
		bottom: 0;
		width: 100%;
		background-color: #f7f7fa;
	}

	.gridCell>>>.van-icon {
		font-size: 40px;
	}

	.vant-nav-bar-index>>>.van-icon-arrow-left:before {
		color: #999999;
		block-size: 30px;
	}

	.imgsizea {
		width: 16px;
		height: 16px;
	}

	.imgsize {
		width: 20px;
		height: 20px;
		margin: 25px 0 0 10px;
	}
	::v-deep .van-cell {
		color:#646566;
	}
</style>
