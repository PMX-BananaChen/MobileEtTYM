import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
// import app from './modules/app'
// import user from './modules/user'
// import tagsView from './modules/tagsView'
// import permission from './modules/permission'
// import settings from './modules/settings'
// import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		i18ns: vuexI18n.store
	},
	state: { // 设置属性 用来存储数据
		userId: '',
		userName: '',
		sex: '',
		userNo:'',
		tableIndex:'',
	},
	mutations: { // 更改属性的状态
		setUserId(state, data) { // 定义的修改 属性的方法
			state.userId = data
		},
		setUserName(state, data) { // 定义的修改 属性的方法
			state.userName = data
		},
		setSex(state, data) { // 定义的修改 性别
			state.sex = data
		},
		setUserNo(state, data) { // 定义的修改单据编号
			state.userNo = data
		},
		setTableIndex(state, data) { // 定义的修改单据编号
			state.tableIndex = data
		}
	}
})
Vue.use(vuexI18n.plugin, store)
Vue.i18n.set('en')

export default store