import request from '@/utils/request'

// 查询企业微信人员列表
export function listEmployee(query) {
  return request({
    url: '/system/Employee2/list',
    method: 'get',
    params: query
  })
}

// 查询生日福利人员消费详细
export function getEmployee(empNo) {
    return request({
        url: '/system/Employee2/' + empNo,
        method: 'get'
    })
}