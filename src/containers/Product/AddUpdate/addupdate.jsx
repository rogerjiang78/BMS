import React, { Component } from 'react';
import { Button, Card, Form, Input, Select } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';

import PictureWall from '../../components/PictureWall/pictureWall';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const { Option } = Select;
const { Item } = Form;

class AddUpdate extends Component {
  pictureWall = React.createRef();
  richText = React.createRef();

  onFinish = (values) => {
    let imgs = this.pictureWall.current.getImgArr();
    let detail = this.richText.current.getRichText();
    console.log('Success:', { ...values, imgs, detail });
  };

  render() {
    return (
      <div>
        <Card
          title={
            <div style={{ fontSize: '20px' }}>
              <Button
                type="link"
                onClick={() => {
                  this.props.history.goBack();
                }}
              >
                <LeftCircleOutlined style={{ fontSize: '25px' }} />
              </Button>
              <span>商品添加</span>
            </div>
          }
        >
          <Form
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 9 }}
            name="add_product"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Item
              label="商品名称"
              name="name"
              initialValue=""
              rules={[{ required: true, message: '请输入商品名称' }]}
            >
              <Input placeholder="请输入商品名称" />
            </Item>
            <Item
              label="商品描述"
              name="desc"
              initialValue=""
              rules={[{ required: true, message: '请输入商品描述' }]}
            >
              <Input placeholder="请输入商品描述" />
            </Item>
            <Item label="商品价格" name="price" initialValue="" required>
              <Input
                prefix="$"
                suffix="元"
                type="number"
                placeholder="请输入商品价格"
              />
            </Item>
            <Item label="商品分类" name="category" initialValue="" required>
              <Select placeholder="请选择分类">
                <Option value="demo">Demo</Option>
              </Select>
            </Item>
            <Item label="商品图片" wrapperCol={{ span: 18 }}>
              <PictureWall ref={this.pictureWall} />
            </Item>
            <Item label="商品详情" wrapperCol={{ span: 18 }}>
              <RichTextEditor ref={this.richText} />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default AddUpdate;
