<template>
	<form ref="form" model="form">
		<van-nav-bar left-arrow @click-left="backHome" style="color:#999999" />
		<div class="app-container">
			<van-grid :column-num="1">
				<van-grid-item key="waitchecka" :icon="imgSrc" />
			</van-grid>
		</div>
		<group class="formItem" v-for="(item, index) in opinionsLists" :key="index" id="listId">
			<form-preview :header-label="sss" :header-value="bb" :body-items="opinionsLists[index]"
				:name="opinionsLists[index]"   />
		</group>
		<van-tabbar v-model="active" active-color="#ff4c7f" class="weui-tabbar">
			<van-tabbar-item :to="(item.name)" @click="tabIndex(index)" v-for="(item,index) in tabbars"
				:key="'tabbar' + index">
				<span>{{item.title}}</span>
				<template slot="icon" slot-scope="props">
					<img :src="props.active ? item.active : item.normal" style="width:20px;height:20px;" />
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</form>
</template>

<script>
	import {
		Vue,
		FormPreview
	} from 'vue'
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
	export default {
		data() {
			return {
				iconPortrait: {
					man: require('./images/man.png'),
					woman: require('./images/woman.png'),
				},
				active: 2, //默认选中tab
				// form:{
				// 	  empname: this.$store.state.userName,
				//       empno: this.$store.state.userId,
				//       factory: '',
				// },
				opinionsLists: [],
				sss: "个人信息",
				bb: "...",
				tabbars: [{
						name: "/apply",
						title: "申请",
						normal: require('./images/pass.png'),
						active: require('./images/passa.png')
					},
					{
						name: "/login",
						title: "工作台",
						normal: require('./images/desk.png'),
						active: require('./images/deska.png')
					},
					{
						name: "/mynavigation",
						title: "我的",
						normal: require('./images/mya.png'),
						active: require('./images/my.png')
					},
				]
			}
		},
		created() {
			console.log(this.$store.state.userId);
			this.setUserName(this.$store.state.userId); //为了拿部门信息
			if (this.$store.state.userId === null || this.$store.state.userId === "") {
				this.setUser();
			} else {
				this.setUserName(this.$store.state.userId);
			}
			/*
			  测试用代码 平时请注释(下面两行)
			  需要更换人员时,修改下面工号74476 16097
			// */
			// this.$store.commit('setUserId', 6616247);
			// this.setUserName(this.$store.state.userId);
		},
		computed: {
			imgSrc: function() {
				switch (this.$store.state.sex) {
					case 'M':
						return this.iconPortrait.man
					case 'F':
						return this.iconPortrait.woman
					default:
						''
				}
			},
		},
		methods: {
			setUser() {
				if (
					this.$store.state.userId === '' ||
					this.$store.state.userId === null
				) {
					const code = Conversion.getUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
					if (code !== null) {
						// 通过code获取 openId等用户信息
						console.log(code);
						getCode(code)
							.then((data) => {
								console.log('s');
								if (data.code === 1) {
									let userId = data.data.empNo;
									console.log(userId);
									this.$store.commit('setUserId', userId);
									this.setUserName(this.$store.state.userId);
								}
							})
							.catch((err) => {
								console.log(err);
							})
					} else {
						Conversion.getCodeApi('a')
					}
				}
			},
			setUserName(userId) {
				if (userId === null || userId === '') return
				getEmployee(userId)
					.then((data) => {
						this.$store.commit('setUserName', data.data.empName);
						this.$store.commit('setSex', data.data.empSex);
						let self = this;
						self.opinionsList = data.data;
						let arr = [];
						let c = {
							label: "姓名:",
							value: self.opinionsList.empName,
						};
						let d = {
							label: "工号:",
							value: self.opinionsList.empNo,
						};
						let e = {
							label: "部门:",
							value: self.opinionsList.factory,
						};
						let arrs = new Array(c, d, e);
						arr.push(arrs);
						self.opinionsLists = [...arr];
					})
					.catch((err) => {
						console.log(err)
					})
			},
			onClick() {
				// this.$emit('getMessage', 'opinion')
				// this.$emit('setTitle', '电子放行')
				this.$router.push({
					path: '/apply'
				})
			},
			tabIndex(index) {
				index = Number(index)
				this.active = index;
				this.$store.commit('setTableIndex', '/mynavigation')
				// 记录当前tab页
				// sessionStorage.setItem('tabIndex', index)
				let val = this.tabbars[index].name
				// console.log(val);
				this.$router.push(val);
			},
			backHome() {
				this.$router.push(this.$store.state.tableIndex);
				// this.onIndexChange(this.tabIndex)
			},
		}
	}
</script>

<style scoped lang="scss">
	.gridCell {
		background-color: #fff;
		margin: 2vh;
		border-radius: 10px;
		font-weight: bold;
		/* font-size:50px; */
	}

	.home {
		blockquote {
			padding: 10px 20px;
			margin: 0 0 20px;
			font-size: 17.5px;
			border-left: 5px solid #eee;
		}

		hr {
			margin-top: 20px;
			margin-bottom: 20px;
			border: 0;
			border-top: 1px solid #eee;
		}

		.col-item {
			margin-bottom: 20px;
		}

		ul {
			padding: 0;
			margin: 0;
		}

		font-family: 'open sans',
		'Helvetica Neue',
		Helvetica,
		Arial,
		sans-serif;
		font-size: 13px;
		color: #676a6c;
		overflow-x: hidden;

		ul {
			list-style-type: none;
		}

		h4 {
			margin-top: 0px;
		}

		h2 {
			margin-top: 10px;
			font-size: 26px;
			font-weight: 100;
		}

		p {
			margin-top: 10px;

			b {
				font-weight: 700;
			}
		}

		.update-log {
			ol {
				display: block;
				list-style-type: decimal;
				margin-block-start: 1em;
				margin-block-end: 1em;
				margin-inline-start: 0;
				margin-inline-end: 0;
				padding-inline-start: 40px;
			}
		}
	}

	* {
		margin: 0;
		padding: 0;
	}

	.app-container {
		position: relative;

		img {
			width: 100%;
			height: 100%;
		}

		h2 {
			position: absolute;
			left: 10px;
			top: 10px;
			// color: aliceblue;
		}
	}

	.weui-tabbar {
		display: flex;
		position: fixed;
		z-index: 500;
		bottom: 0;
		width: 100%;
		background-color: #f7f7fa;
	}

	.imgHeadName {
		text-align: center;
		margin-top: 0.2rem;
	}

	.vant-nav-bar-index>>>.van-nav-bar__arrow {
		color: #999999;
		block-size: 30px;
	}

	::v-deep .van-icon {
		color: #999999;
		block-size: 30px;
	}

	::v-deep .weui-form-preview__hd[data-v-124387c3] {
		// visibility: hidden;
		height: 30px;
	}

	::v-deep .weui-form-preview__value[data-v-124387c3] {
		text-align: center;
	}
	// .weui-form-preview[data-v-124387c3]
	// {
	//   float: center;
	//   color: var(--weui-FG-1);
	//   text-align: right;
	//   text-align-last: right
	// }
</style>
