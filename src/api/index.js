// 包含应用中所有请求接口的函数: 也就是接口请求函数;

import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd'
import { BASE_URL, APPID, APPSECRET, CITY } from '../config'
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

// 获取天气信息
export const reqWeather = () => {
  return new Promise((resolve, reject) => {
    jsonp(`https://tianqiapi.com/api?version=v6&appid=${APPID}&appsecret=${APPSECRET}&city=${CITY}`, (err, data)=>{
      if (err) {
        message.error('请求天气接口失败,请联系管理员')
        return new Promise(()=>{})
      } else {
        let weatherObj = {
          weather: data.wea,
          minTemp: data.tem2,
          maxTemp: data.tem1
        }
        resolve(weatherObj)
      }
    })
  })
}
