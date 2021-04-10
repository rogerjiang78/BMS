import React, { Component } from 'react';
import { Button, Card, Form, Input, Select, message } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';

import PictureWall from '../../../components/PictureWall/pictureWall';
import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { reqCategoryList } from '../../../api'

const { Option } = Select;
const { Item } = Form;

class AddUpdate extends Component {
  pictureWall = React.createRef();
  richText = React.createRef();

  state = {
    categoryList: [],
  }

  componentDidMount() {
    // this.getCategoryList()
  }

  getCategoryList = async () => {
    const result = await reqCategoryList()
    const {status, data} = result;
    if (status === 1) {
      this.setState({categoryList: data})
    }
  }

  validatePrice = (rule, value) => {
    return new Promise(async(resolve, reject) => {
        if (value === '') {
          await reject('价格必须指定');
        } else if (value *1 <= 0) {
          await reject('价格必须大于0');
        } else {
          resolve();
        }
    })
  }
  // 表单的统一验证, 数据验证成功后回调事件
  onFinish = (values) => {
    // const {name, desc, price} = values
    let imgs = this.pictureWall.current.getImgArr();
    let detail = this.richText.current.getRichText();
    console.log('Success:', { ...values, imgs, detail });
  };

  // 表单的统一验证, 数据验证失败后回调事件
  onFinishFailed = () => {
    message.error('添加信息错误', 1)
  }
  render() {
    const {categoryList} = this.state
    const productInfo = this.props.location.state || {};
    console.log(productInfo);
    const isUpdate = !!productInfo.key
    return (
      <div>
        <Card
          title={
            <div style={{ fontSize: '20px' }}>
              <Button type="link"
                onClick={() => {this.props.history.goBack()}}
              >
                <LeftCircleOutlined style={{ fontSize: '25px' }} />
              </Button>
              <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </div>
          }
        >
          <Form
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 9}}
            name="add_product"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Item
              label="商品名称"
              name="name"
              initialValue={productInfo.name}
              rules={[{ required: true, message: '请输入商品名称' }]}
            >
              <Input placeholder="请输入商品名称" />
            </Item>
            <Item
              label="商品描述"
              name="desc"
              initialValue={productInfo.desc}
              rules={[{ required: true, message: '请输入商品描述' }]}
            >
              <Input placeholder="请输入商品描述" />
            </Item>
            <Item
              label="商品价格"
              name="price"
              initialValue={productInfo.price}
              required
              rules={[{ validator: this.validatePrice }]}
            >
              <Input
                prefix="$"
                suffix="元"
                type="number"
                placeholder="请输入商品价格"
              />
            </Item>
            <Item
              label="商品分类"
              name="categoryId"
              initialValue={productInfo.CategoryId || ''}
              required
            >
              <Select placeholder="请选择分类">
                <Option value="">未选择</Option>
                {
                  categoryList.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>)
                }
              </Select>
            </Item>
            <Item label="商品图片" wrapperCol={{ span: 18 }}>
              <PictureWall ref={this.pictureWall} />
            </Item>
            <Item label="商品详情" wrapperCol={{ span: 18 }}>
              <RichTextEditor ref={this.richText} />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">提交</Button>
            </Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default AddUpdate;
