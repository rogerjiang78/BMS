// 封装一个符合自己要求的能发ajax请求的axios

import axios from 'axios';
import qs from 'querystring';
import { message } from 'antd';

//创建一个axios实例对象instance
const instance = axios.create({
  timeout: 5000,
});

//请求拦截器
// 如果是 POST请求, 默认传递的是 JSON 对象格式, 转换成 urlendcoded 格式
instance.interceptors.request.use(
  (config) => {
    const { method, data } = config;
    if (method.toLowerCase() === 'post' && data instanceof Object) {
      config.data = qs.stringify(data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // 如果请求错误，添加处理逻辑
  },
);

// 响应拦截器 -- 请求数据已经返回，但未传递给.then和.catch。添加处理，如改变数据格式，选择响应结果数据等
// 统一处理所有的请求异常错误
instance.interceptors.response.use(
  (response) => {
    return response.data; // 请求成功时执行, 只返回响应中的 data 数据
  },
  (error) => {
    // return Promise.reject(error);        // 请求失败时执行, 返回一个reject状态的promise
    message.error(error.message, 1);
    return new Promise(() => {});
  },
);

export default instance;
