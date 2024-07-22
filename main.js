import Vue from 'vue'
import store from './store'
import Cookies from 'js-cookie'
import App from './App'
import router from './router/router.js'
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, download, handleTree } from "@/utils/mobileet";
import {
    AlertPlugin,
    ToastPlugin,
    AjaxPlugin,
    XInput,
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    Group,
    Cell,
    Tabbar,
    TabbarItem,
    Calendar,
    Divider,
    Card,
    Popup,
    PopupPicker,
    XTextarea,
    DatetimeRange,
    Datetime,
    Tab,
    TabItem,
    Panel,
    Sticky,
    XButton,
    Flexbox,
    FlexboxItem,
    Box,
    Toast,
    Confirm,
    ConfirmPlugin,
    Rater,
    CellFormPreview,
    Swiper,
    SwiperItem,
    Msg,
    Flow,
    FlowState,
    FlowLine,
    Timeline,
    TimelineItem,
    Search,
    Grid,
    GridItem,
    GroupTitle,
    XSwitch,
    XDialog,
    PopupRadio,
    FormPreview,
    Alert,
    Badge
} from 'vux'
Vue.component('x-input', XInput)
Vue.component('x-header', XHeader)
Vue.component('actionsheet', Actionsheet)
Vue.component('button-tab', ButtonTab)
Vue.component('button-tab-item', ButtonTabItem)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('calendar', Calendar)
Vue.component('divider', Divider)
Vue.component('card', Card)
Vue.component('popup', Popup)
Vue.component('popup-picker', PopupPicker)
Vue.component('x-textarea', XTextarea)
Vue.component('datetime-range', DatetimeRange)
Vue.component('datetime', Datetime)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('panel', Panel)
Vue.component('sticky', Sticky)
Vue.component('x-button', XButton)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('box', Box)
Vue.component('toast', Toast)
Vue.component('confirm', Confirm)
Vue.component('rater', Rater)
Vue.component('cell-form-preview', CellFormPreview)
Vue.component('swiper', Swiper)
Vue.component('swiper-item', SwiperItem)
Vue.component('msg', Msg)
Vue.component('flow', Flow)
Vue.component('flow-state', FlowState)
Vue.component('flow-line', FlowLine)
Vue.component('timeline', Timeline)
Vue.component('timeline-item', TimelineItem)
Vue.component('search', Search)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('group-title', GroupTitle)
Vue.component('x-switch', XSwitch)
Vue.component('x-dialog', XDialog)
Vue.component('popup-radio', PopupRadio)
Vue.component('form-preview', FormPreview)
Vue.component('alert', Alert)
Vue.component('badge', Badge)
// 全局方法挂载
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree

Vue.prototype.msgSuccess = function(msg) {
    this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function(msg) {
    this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function(msg) {
    this.$message.info(msg);
}
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})