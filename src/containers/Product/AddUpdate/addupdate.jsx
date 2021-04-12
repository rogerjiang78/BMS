import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Form, Input, Select, message } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';

import PictureWall from '../../../components/PictureWall/pictureWall';
import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor';
import { reqCategoryList, reqAddUpdateProduct } from '../../../api';

const { Option } = Select;
const { Item } = Form;

@connect((state) => ({ categoryList: state.categoryList }), {})
class AddUpdate extends Component {
  pictureWall = React.createRef(); // 创建一个 ref容器, 用来存储标签对象
  richText = React.createRef();

  state = {
    categoryList: [],
  };

  componentDidMount() {
    const { categoryList } = this.props;
    if (categoryList.length) this.setState({ categoryList });
    // else this.getCategoryList()
  }

  getCategoryList = async () => {
    const result = await reqCategoryList();
    const { status, data } = result;
    if (status === 1) {
      this.setState({ categoryList: data });
    } else message.error('出错了!');
  };

  validatePrice = (rule, value) => {
    return new Promise(async (resolve, reject) => {
      if (value === '') {
        await reject('价格必须指定');
      } else if (value * 1 <= 0) {
        await reject('价格必须大于0');
      } else {
        resolve();
      }
    });
  };
  // 表单的统一验证, 数据验证成功后回调事件
  onFinish = async (values) => {
    const { name, desc, price, categoryId } = values;
    // 通过容器中的current属性 , 可以调用标签组件中的方法,获取所有图片的文件名数组和富文本
    let imgs = this.pictureWall.current.getImgArr();
    let detail = this.richText.current.getRichText();
    console.log('Success:', { ...values, imgs, detail }); // 收集所有数据,以发请求添加商品或修改商品
    const productObj = { name, desc, price, categoryId, imgs, detail };  //
    
    if (this.isUpdate) {
      productObj.id = this.productInfo.key;
    }
    const result = await reqAddUpdateProduct(productObj);
    const { status } = result;
    if (status === 1) {
      message.success(`${this.isUpdate ? '修改' : '添加'}商品成功`);
      this.props.history.replace('/prod_about/product');
    } else message.error('出错了');
  };

  // 表单的统一验证, 数据验证失败后回调事件
  onFinishFailed = () => {
    message.error('添加信息错误', 1);
  };
  render() {
    const { categoryList } = this.state;
    this.productInfo = this.props.location.state || {};
    console.log(this.productInfo);
    const {name, desc, price, categoryId, imgs, detail} = this.productInfo;
    this.isUpdate = !!this.productInfo.key;
    return (
      <div>
        <Card
          title={
            <div style={{ fontSize: '20px' }}>
              <Button
                type="link"
                style={{ fontSize: '18px' }}
                onClick={() => {this.props.history.goBack()}}>
                  <LeftCircleOutlined />返回
              </Button>
              <span>{this.isUpdate ? '修改商品' : '添加商品'}</span>
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
            onFinishFailed={this.onFinishFailed}
          >
            <Item
              label="商品名称"
              name="name"
              initialValue={name}
              rules={[{ required: true, message: '请输入商品名称' }]}
            >
              <Input placeholder="请输入商品名称" />
            </Item>
            <Item
              label="商品描述"
              name="desc"
              initialValue={desc}
              rules={[{ required: true, message: '请输入商品描述' }]}
            >
              <Input placeholder="请输入商品描述" />
            </Item>
            <Item
              label="商品价格"
              name="price"
              initialValue={price}
              required
              rules={[{ validator: this.validatePrice }]}
            >
              <Input
                prefix="$"
                addonAfter="元"
                type="number"
                placeholder="请输入商品价格"
              />
            </Item>
            <Item
              label="商品分类"
              name="categoryId"
              initialValue={categoryId || ''}
              required
            >
              <Select placeholder="请选择分类">
                <Option value="">请选择分类</Option>
                {categoryList.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item label="商品图片" wrapperCol={{ span: 18 }}>
              {/* 将容器交给需要标记的标签对象,在解析时,就会自动将标签对象保存到容器this.pictureWall中 ,
              属性名是 current, 属性值就是标签对象 */}
              <PictureWall ref={this.pictureWall} imgs={imgs}/>
            </Item>
            <Item label="商品详情" wrapperCol={{ span: 18 }}>
              <RichTextEditor
                ref={this.richText}
                detail={detail}
              />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default AddUpdate;
