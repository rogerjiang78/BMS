import React, { Component } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { BASE_URL } from '../../config';

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
    previewVisible: false, // 是否展示预览窗
    previewImage: '', // 要预览图片的URL地址或base64编码
    previewTitle: '',
    fileList: [
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
    ],
  };
  // 从 fileList 中提取所有该商品的图片的名字,构建一个数组给新增商品组件使用
  getImgArr = () => {
    let result = [];
    this.state.fileList.forEach((item) => {
      result.push(item);
    });
    return result;
  };

  setFileList = (imgArr) => {
    let result = [];
    this.state.fileList.forEach((item, index)=>{
      imgArr.push({uid:-index, name:item, url: `${BASE_URL}/upload/${item}`})
    })
    this.setState({fileList: result})
  }
  // 关闭预览窗
  handleCancel = () => this.setState({ previewVisible: false });
  // 展示预览窗
  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  // 当图片状态发生改变的回调
  handleChange = ({ file, fileList }) => {
    // console.log(file.response);
    // 若图片上传成功
    if (file.status === 'done') {
      fileList[fileList.length - 1].url = file.response.data.url;
      fileList[fileList.length - 1].name = file.response.data.name;
    }
    if (file.status === 'removed') {
      fileList[fileList.length - 1].url = file.response.data.url;
      fileList[fileList.length - 1].name = file.response.data.name;
    }
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
          action={`${BASE_URL}/per/upload`} //接收图片服务器的地址
          listType="picture-card" // 照片墙的展示方式
          name="imgF" // 展示所有图片对象的数组
          fileList={fileList}
          onPreview={this.handlePreview} // 点击预览按钮的回调
          onChange={this.handleChange} // 图片状态改变的回调
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default PictureWall;
