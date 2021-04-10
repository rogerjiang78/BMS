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
    previewVisible: false,   // 是否展示预览弹窗
    previewImage: '',        // 要预览图片的URL地址或base64编码
    previewTitle: '',
    fileList: [
      {
        uid: '-1',            // 唯一标识
        name: 'image.png',    // 文件名
        status: 'done',       // 上传状态
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
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

  // 展示预览窗
  handlePreview = async (file) => {    // 这儿的file是fileList中的文件,
    if (!file.url && !file.preview) {   // 如果 file没有图片的 url,只进行一次base64处理, 显示图片
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

  // 当图片状态发生改变的回调
  handleChange = ({ file, fileList }) => {
    // console.log(file.response);
    // 若图片上传成功时 , 注意 这儿file是当前操作(添加或删除)的图片, 而fileList是后端服务器中已经保存的所有相关的图片的集合数组;
    if (file.status === 'done') {
      const {url, name} = file.response.data;   // 取出响应数据中的图片文件名和 URL
      fileList[fileList.length - 1].url = url;   // file和fileList中最后一张图片的是两个不同的对象, 所以,从file中取出的数据
      fileList[fileList.length - 1].name = name;  // 需要添加到fileList中的那个新生成的对象中, 它通常在数组中的最后位置
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
          listType="picture-card"          // 照片墙的展示方式
          name="image"                     // 图片文件对应的参数名
          fileList={fileList}                // 已上传的所有图片对象的数组
          onPreview={this.handlePreview}   // 点击预览按钮的回调
          onChange={this.handleChange}     // 图片状态改变的回调
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
