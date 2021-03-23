/* eslint-disable import/no-anonymous-default-export */
// 操作 local数据的工具函数模块
const LOGIN_USER = 'LOGIN_USER';

export default {
  // 保存用户
  saveUser(user){
    localStorage.setItem(LOGIN_USER, JSON.stringify(user));
  },
  // 获取用户信息
  getUser() {
    return JSON.parse(localStorage.getItem(LOGIN_USER) || '{}')
  },
  // 删除用户信息
  removeUser() {
    localStorage.removeItem(LOGIN_USER)
  },
};
