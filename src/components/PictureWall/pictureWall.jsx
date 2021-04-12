import React, { Component } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { BASE_URL } from '../../config';
import {reqDeleteImg} from '../../api'

// 将图片变成 base64 的形式
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class PictureWall extends Component {
  state = {
    previewVisible: false, // 是否展示预览弹窗
    previewImage: '',      // 要预览图片的URL地址或base64编码
    previewTitle: '',      // 要预览图片的文件名
    fileList: [             // 收集已经上传的图片文件
      // {
      //   uid: '-1',         // 唯一标识
      //   name: 'image.png', // 文件名
      //   status: 'done',    // 当前图片的状态: uploading, done, removed, error
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',  // 服务器保存的图片的地址
      // },
    ],
  }

  constructor(props){
    super(props)
    this.setFileList()
  }

  // 从父组价获取已经存在的图片数组, 重置一个fileList 用于回显
  setFileList = () => {
    const {imgs} = this.props
    let imgArr = [];
    if (imgs && imgs.length>0) {
      imgs.forEach((item, index) => {
        imgArr.push({
          uid: -index,
          name: item,
          status: 'done',
          url: `${BASE_URL}/upload/${item}`,
        });
      });
    }
    this.setState({ fileList: imgArr });
  };

  // 从 fileList中提取所有商品的图片名,构建一个数组交给父组件使用, 用来提交新增商品
  getImgArr = () => {
    let result = [];
    this.state.fileList.forEach((item) => {
      result.push(item.name);
    });
    return result;
  };

  // 点击,展示预览窗
  handlePreview = async (file) => {
    // 这儿的file是当前点击的图片对象, 它也是fileList中的文件,
    if (!file.url && !file.preview) {
      // 如果点击的图片对象没有url, 也没有经过base64处理过, 那就进行一次base64处理, 显示图片
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  // 关闭预览窗
  handleCancel = () => this.setState({ previewVisible: false });

  // 当图片状态发生改变的回调,
  handleChange = async ({ file, fileList }) => {
    console.log(file.response);   // 图片上传成功时 , 这就是服务器给回来的响应
    // 注意 这儿file是当前操作(添加或删除)的图片, 而fileList是后端服务器中已经保存的所有相关的图片的集合数组,
    // 图片上传成功时 ,系统会自动将file添加到fileList中;
    if (file.status === 'done') {
      const { url, name } = file.response.data;  // 取出响应数据中 服务器返回的图片文件名name和 URL
      fileList[fileList.length - 1].url = url;    // file和fileList中最后一张图片的是两个不同的对象, 所以,需要从file中取出从服务器返回的数据
      fileList[fileList.length - 1].name = name;  // 将 URL添加到fileList中的那个新生成的对象中, 并重写它的文件名name属性, 使用从服务器返回的文件名
    }
    if (file.status === 'removed') {                 // 删除图片时, 前端就从fileList将图片文件移除了, 而后端删除文件就需要发送请求,
      const result = await reqDeleteImg(file.name)   // 需要提供当前图片的文件名, 而此时, file 的文件名已经重写成后端返回的文件名了
      if(result.status === 1) message.success('删除图片成功')
      else message.error('删除图片失败')
    }
    // 更新状态
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/per/upload`}   //上传图片去服务器的地址, 上传图片是不需要发送ajax请求,
          // method="post"                    // 因为传递的参数是文件,不是字符串,发送方式, 默认使用POST,
          name="image"                     // 发送到后台的图片文件对应的属性名
          listType="picture-card"          // 照片墙的展示方式
          fileList={fileList}                // 已上传的所有图片对象的数组
          onPreview={this.handlePreview}   // 点击预览按钮的回调
          onChange={this.handleChange}     // 图片状态改变的回调
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>

        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img style={{ width: '100%' }} src={previewImage} alt="example" />
        </Modal>
      </>
    );
  }
}

export default PictureWall;
