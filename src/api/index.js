// 包含应用中所有请求接口的函数: 也就是接口请求函数;

import ajax from './ajax'

// 请求登陆
export function reqLogin(username, password) {
  ajax({
    method: 'post',
    url: '/api/userlogin',
    data: {
      username,
      password
    }
  })
}
