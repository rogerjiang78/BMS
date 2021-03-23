// 包含应用中所有请求接口的函数: 也就是接口请求函数;

import ajax from './ajax';
import { BASE_URL } from '../config'
// 请求登陆
export const reqLogin = (username, password) => ajax.post(`${BASE_URL}/api/userlogin`, {username, password,})

// export const reqLogin = (username, password) => (
//   ajax({
//     method: 'post',
//     url: `${BASE_URL}/api/userlogin`,
//     data: {
//       username,
//       password,
//     },
//   })
// )
