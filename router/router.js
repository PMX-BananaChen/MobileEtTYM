import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// import Layout from '@/layout'
// import ParentView from '@/components/ParentView';
/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */
// import index1 from '@/pages/index.vue'
import index2 from '@/pages/login.vue'
// import redirect from '@/pages/redirect.vue'


// 公共路由
export const constantRoutes = [
	// {
	// 	path: '/redirect',
	// 	component: redirect,
	// 	hidden: true,
	// 	children: [{
	// 		path: '/redirect/:path(.*)',
	// 		component: (resolve) => require(['@/pages/redirect'], resolve)
	// 	}]
	// },
	{
		path: '/login',
		component: (resolve) => require(['@/pages/login'], resolve),
		hidden: true
	},
	{
		path: '/apply',
		component: (resolve) => require(['@/pages/system/applyform'], resolve),
		hidden: true
	},
	{
		path: '/mynavigation', // 我的
		component: (resolve) => require(['@/pages/mynavigation'], resolve),
		hidden: true
	},
	{
		path: '/waitcheck', // 待签核界面
		component: (resolve) => require(['@/pages/system/waitcheck'], resolve),
		hidden: true
	},
	{
		path: '/waitchecked', // 已签核界面
		component: (resolve) => require(['@/pages/system/waitchecked'], resolve),
		hidden: true
	},
	{
		path: '/returnapply', // 退回界面
		component: (resolve) => require(['@/pages/system/returnapply'], resolve),
		hidden: true
	},
	{
		path: '/managercheck', // 主管待签核界面
		component: (resolve) => require(['@/pages/system/managercheck'], resolve),
		hidden: true
	},
	{
		path: '/managerchecked', // 主管已经签核界面
		component: (resolve) => require(['@/pages/system/managerchecked'], resolve),
		hidden: true
	},
	{
		path: '/returnmanager', // 主管退回签核界面
		component: (resolve) => require(['@/pages/system/returnmanager'], resolve),
		hidden: true
	},
	{
		path: '/actioncheck', // 签核界面
		component: (resolve) => require(['@/pages/actioncheck'], resolve),
		hidden: true
	},
	{
		path: '/waitcheckdetail', // 待签核明细界面
		component: (resolve) => require(['@/pages/waitcheckdetail'], resolve),
		hidden: true
	},
	{
		path: '/waitcheckeddetail', // 已签核明细界面
		component: (resolve) => require(['@/pages/waitcheckeddetail'], resolve),
		hidden: true
	},
	{
		path: '/returnapplydetail', // 退回明细界面
		component: (resolve) => require(['@/pages/returnapplydetail'], resolve),
		hidden: true
	},
	{
		path: '/msgdialog', // 退回明细界面
		component: (resolve) => require(['@/pages/msgdialog'], resolve),
		hidden: true
	},
	{
		path: '/404',
		component: (resolve) => require(['@/pages/error/404'], resolve),
		hidden: true
	},
	{
		path: '/401',
		component: (resolve) => require(['@/pages/error/401'], resolve),
		hidden: true
	},
	{
		path: '',
		component: index2,
		redirect: 'login',
		children: [{
			path: 'login',
			component: (resolve) => require(['@/pages/login'], resolve),
			name: '首页',
			meta: {
				title: '首页',
				icon: 'dashboard',
				noCache: true,
				affix: true
			}
		}]
	},
]

export default new Router({
	mode: 'history', // 去掉url中的#
	base: '/newRelease/', //ReleaseSystem/接口也是写在PubmiddleGround里面，只是前端用uniapp开发
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRoutes
})
