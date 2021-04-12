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

// 获取分类列表
export const reqCategoryList = () => ajax.get(`${BASE_URL}/xxx/category`);

// 添加分类
export const reqAddCategory = (categoryName) => ajax.post(`${BASE_URL}/xxx/category/add`, {categoryName})

// 修改分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax.post(`${BASE_URL}/xxx/category/add`, {categoryId, categoryName})

// 获取商品分页列表
export const reqProductList = (productId, status) => ajax.post(`${BASE_URL}/xxx/product/updateStatus`, {productId, status})

// 请求商品在售状态
export const reqUpdateProductStatus = (pageNum, pageSize) => ajax.get(`${BASE_URL}/xxx/product/list`, {params:{pageNum, pageSize}})

// 请求商品搜索分页列表
export const reqSearchProduct = (pageNum, pageSize, searchType, keyWord) => {
  // if (searchType === 'productName') ajax.get(`${BASE_URL}/xxx/product/search`, {params:{pageNum, pageSize, productName: keyWord}});
  // if (searchType === 'productDesc') ajax.get(`${BASE_URL}/xxx/product/search`, {params:{pageNum, pageSize, productDesc: keyWord}});
  ajax.get(`${BASE_URL}/xxx/product/search`, {params:{pageNum, pageSize, [searchType]: keyWord}});
}

// 根据商品id, 获取商品信息
export const reqProductById = (productId) => ajax.get(`${BASE_URL}/xxx/product/info`, {params:{productId}});

// 删除图片文件
export const reqDeleteImg = (name) => ajax.post(`${BASE_URL}/xxx/img/delete`, {name})

// 添加/修改商品
// export const reqAddUpdateProduct = ({product}) => ajax.post(BASE_URL+'/xxx/product/'+(product.id ? 'update' : 'add'), {product})
export const reqAddUpdateProduct = (productObj) => ajax.post(`${BASE_URL}'/xxx/product/'${productObj.id ? 'update' : 'add'}`, {...productObj})

// 获取所有角色列表
export const reqRoleList = () => ajax.get(`${BASE_URL}/per/role`);

// 添加角色
export const reqAddRole = (roleName) => ajax.post(`${BASE_URL}/xxx/role/add`, {roleName});

// 更新角色
export const reqUpdateRole = (role) => ajax.put(`${BASE_URL}/xxx/role/update`, {...role});

// 获取用户列表
export const reqUserList = () => ajax.get(`${BASE_URL}/per/user`);
