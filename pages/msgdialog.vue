<template>
	<view>
		<msg>
		  <template slot="buttons">
		    <x-button plain type="primary">操作成功</x-button>
		  </template>
		</msg>
		<van-tabbar v-model="active" active-color="#ff4c7f" class="weui-tabbar">
			<van-tabbar-item :to="(item.name)" @click="tabIndex(index)" v-for="(item,index) in tabbars"
				:key="'tabbar' + index">
				<span>{{item.title}}</span>
				<template #icon="props">
					<img :src="props.active ? item.active : item.normal" />
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</view>
</template>
<script>

	import Vue from 'vue'
	export default {
		name: "indexTab",
		data() {
			return {
				active: 0, //默认选中tab
				tabbars: [{
						name: "/apply",
						title: "放行申请",
						//  normal: require('../img/waitcheck.png /applicationform'),
						// active: require('../img/checked.png')
					},
					{
						name: "/login",
						title: "工作台",
						//  normal: require('../img/waitcheck.png /applicationform'),
						// active: require('../img/checked.png')
					},
					{
						name: "/mynavigation",
						title: "我的",
						//  normal: require('../img/waitcheck.png /applicationform'),
						// active: require('../img/checked.png')
					},
				]
			};
		},
		mounted() {
			// 如有缓存，刷新页面时还进入该页面
			let index = sessionStorage.getItem('tabIndex')
			if (index) {
				this.tabIndex(index)
			}
		},
		created() {
             let val="/managercheck"
			 // this.$store.commit('setUserNo', 74476)
			 this.$router.push(val);
		},
		methods: {
			 
			tabIndex(index) {
				index = Number(index)
				this.active = index;
				// 记录当前tab页
				sessionStorage.setItem('tabIndex', index)
				let val = this.tabbars[index].name
				console.log(val);
				this.$router.push(val);
			},
		},
	};
</script>

<style>
	.gridCell {
		background-color: #fff;
		margin: 2vh;
		border-radius: 10px;
	}

	.weui-tabbar {
		display: flex;
		position: fixed;
		z-index: 500;
		bottom: 0;
		width: 100%;
		background-color: #f7f7fa;
	}
</style>
