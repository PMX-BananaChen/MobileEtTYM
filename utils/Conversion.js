export default {
 getCurrentTime(objDate) {
    let date = new Date(objDate)
    // 时间格式HH:MM:SS
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
  },
  // 时间格式化
  formatTime: function (objDate) {
    if (!objDate) return
    let date = new Date(objDate)
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let strDate = date.getDate().toString().padStart(2, '0')
    // 时间格式yyyy-MM-dd HH:MM:SS
    return `${date.getFullYear()}-${month}-${strDate} ${this.getCurrentTime(date)}`
  },
  // 日期格式化
  formatDate: function (objDate) {
    if (!objDate) return
    let date = new Date(objDate)
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let strDate = date.getDate().toString().padStart(2, '0')
    // 时间格式yyyy-MM-dd
    return `${date.getFullYear()}-${month}-${strDate}`
  },
  compare: function (prop) {
    return function (obj1, obj2) {
      let val1 = obj1[prop]
      let val2 = obj2[prop]
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1)
        val2 = Number(val2)
      }
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
  },
  sort_pro: function (data, keys = []) {
    var c = []
    var d = {}
    for (var element of data) {
      let element_keyStr = ''
      let element_key = []
      let element_keyObj = {}
      for (var key of keys) {
        element_key.push(element[key])
        element_keyObj[key] = element[key]
      }
      element_keyStr = element_key.join('_')
      if (!d[element_keyStr]) {
        c.push({
          ...element_keyObj,
          children: [element]
        })
        d[element_keyStr] = element
      } else {
        for (var ele of c) {
          let isTrue = keys.some((key) => {
            return ele[key] != element[key]
          })
          if (!isTrue) {
            ele.children.push(element)
          }
        }
      }
    }
    return c
  },
  getUrlParam: function (name) {
    // 封装方法
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg) // 匹配目标参数
	console.log(window.location);
    if (r != null) return unescape(r[2])
    return null // 返回参数值
  },
  getCodeApi: function (state) {
    // 获取code
    let urlNow = encodeURIComponent(window.location.href)
    let scope = 'snsapi_base' // snsapi_userinfo   // 静默授权 用户无感知
    let appid = 'wx91b34d8e7feff276'
    let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
    console.log(window.location);
	window.location.replace(url)
	console.log(url);
  },
  /**
   * [获取URL中的参数名及参数值的集合]
   * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
   * @param {[string]} urlStr [当该参数不为空的时候，则解析该url中的参数集合]
   * @return {[string]}       [参数集合]
   */

  // 数组下标反转
  reverse2(array) {
    for (var i = 0; i < array.length / 2; i++) {
      var temp = array[i]
      array[i] = array[array.length - 1 - i]
      array[array.length - 1 - i] = temp
    }
    return array // Array对象中的方法返回了一个数组。
  },
  //0:申请,1:待主管審核,2:审核通过,3:退單,
   getOpoinionStates: function (states) {
      switch (states) {
        case 0:
          return '申请'
        case 1:
          return '待签核'
        case 2:
          return '已签核'
        case 3:
          return '已退回'
      }
    },
	
	toDates : function(number, flag, part){
	  let n = number
	  let date = new Date(parseInt(n) * 1000)
	  let y = date.getFullYear()
	  let m = date.getMonth() + 1
	  m = m < 10 ? ('0' + m) : m
	  let d = date.getDate()
	  d = d < 10 ? ('0' + d) : d
	  let h = date.getHours()
	  h = h < 10 ? ('0' + h) : h
	  let minute = date.getMinutes()
	  let second = date.getSeconds()
	  minute = minute < 10 ? ('0' + minute) : minute
	  second = second < 10 ? ('0' + second) : second
	  if (flag) {
	    if (part == 'year') {
	      return y
	    } else if (part == 'month') {
	      return m
	    } else if (part == 'date') {
	      return n
	    }
	    return y + '-' + m + '-' + d
	  }
	  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
	},
	
    mathChangeDate : function (date, method, days, flag) {
	  // method:'+' || '-'
	  // ios不解析带'-'的日期格式，要转成'/'，不然Nan，切记
	  let dateVal = date.replace(/-/g, '/')
	  let timestamp = Date.parse(dateVal)
	  if (method == '+') {
	    timestamp = timestamp / 1000 + 24 * 60 * 60 * days
	  } else if (method == '-') {
	    timestamp = timestamp / 1000 - 24 * 60 * 60 * days
	  }
	  return this.toDates(timestamp, true,'')
	},
	

	
}
