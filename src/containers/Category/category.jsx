import React, { Component } from 'react';
import { Card, Button, Table, Modal, message, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'

import { reqCategoryList, reqAddCategory, reqUpdateCategory } from '../../api';
import { createSaveCategoryAction } from '../../redux/action_creators/category_action'

const { Item } = Form;

@connect(
  state => ({}),
  {
    saveCategoryList: createSaveCategoryAction,
  }
)
class Category extends Component {
  formRef = React.createRef();

  state = {
    categorys: [],
    isLoading: false, //
    showStatus: 0,    // 标识添加/更新的确认框是否显示 ,  0: 不显示  1: 显示添加  2:显示更新
    modalCurrentValue: '', // 弹框显示的值, 用于数据回显
    modalCurrentKey: '',
  };

  constructor() {
    super();
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width: '25%',
        align: 'center',
        render: (item) => (
          <Button
            type="link"
            onClick={() => {
              this.showUpdate(item);
            }}
          >
            修改分类
          </Button>
        ),
      },
    ];
  }

  componentDidMount() {
    // this.getCategoryList();
  }

  getCategoryList = async () => {
    this.setState({ isLoading: true });
    const result = await reqCategoryList();
    console.log(result);
    if (result) {
      this.setState({ categorys: result.data.reverse(), isLoading: false });
      // 把商品的分类信息放入redux中
      this.props.saveCategoryList(result.data)
    }
    else message.error('获取数据失败');
  };

  showUpdate = (item) => {
    // console.log(item);
    const { name, key } = item;
    this.setState({
      showStatus: 2,
      modalCurrentValue: name,
      modalCurrentKey: key,
    });
  };

  handleOk = async () => {
    const values = await this.formRef.current.validateFields(); // 从 Modal中获取Form表单中的数据
    console.log('fieldsValue', values);
    const { showStatus } = this.state;

    if (showStatus === 1) {
      console.log('我要新增');
      let { categoryName } = values;
      const result = await reqAddCategory(categoryName);
      const { status, data } = result;
      if (status === 1) {
        message.success('新增商品分类成功'); // 添加分类成功后, 重新获取分类项
        const categoryList = [...this.state.categorys]; // 将状态中的数据复制一份
        categoryList.unshift(data);
        this.setState({ categorys: categoryList });
        this.setState({ showStatus: 0 });
        this.formRef.current.resetFields();
        // this.reqCategoryList();      // 也可以直接发送请求.获取最新的分类列表
      } else if (status === 0) message.error('操作失败');
    }

    if (showStatus === 2) {
      console.log('我是修改');
      // console.log(this.state.modalCurrentKey, values.categoryName);
      const categoryId = this.state.modalCurrentKey;
      const categoryName = values.categoryName;
      const result = await reqUpdateCategory({ categoryId, categoryName });
      const { status } = result;
      if (status === 1) {
        message.success('修改商品分类成功');
        this.reqCategoryList(); // 直接发送请求.获取最新的分类列表
        this.setState({
          showStatus: 0,
          modalCurrentValue: '',
          modalCurrentKey: '',
        });
        this.formRef.current.resetFields();
      } else if (status === 0) message.error('操作失败', 1);
    }
  };

  handleCancel = () => {
    this.setState({ showStatus: 0 });
    this.formRef.current.resetFields();
  };

  render() {
    const { isLoading, showStatus, modalCurrentValue } = this.state;

    const data = [
      {
        key: '1',
        name: '电视',
      },
      {
        key: '2',
        name: '手机',
      },
      {
        key: '3',
        name: '电脑',
      },
      {
        key: '4',
        name: '文具',
      },
      {
        key: '5',
        name: '家具',
      },
      {
        key: '6',
        name: '工具',
      },
    ];

    // card的右侧
    const extra = (
      <Button
        type="primary"
        onClick={() => {
          this.setState({
            showStatus: 1,
            modalCurrentValue: '',
          });
        }}
      >
        <PlusOutlined />
        添加
      </Button>
    );
    return (
      <div>
        <Card extra={extra}>
          <Table
            loading={isLoading}
            dataSource={data}
            columns={this.columns}
            bordered
            // rowKey="id"
            pagination={{
              defaultPageSize: 5,
              showQuickJumper: true,
            }}
          />
        </Card>

        <Modal
          title={showStatus === 1 ? '添加分类' : '修改分类'}
          visible={showStatus !== 0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose
          // footer={null}
        >
          <Form
            name="categoryName"
            initialValues={{
              remember: true,
            }}
            ref={this.formRef}
            // onFinish={this.onFinish}            // 表单的统一验证, 数据验证成功后回调事件
            // onFinishFailed={() => {this.handleCancel()}} // 表单的统一验证, 数据验证失败后回调事件
          >
            <Item
              label={showStatus === 1 ? '添加分类' : '更新分类'}
              name="categoryName"
              initialValue={modalCurrentValue || ''} // 设置输入框的默认值
              rules={[{ required: true, message: '请输入分类名称!' }]}
            >
              <Input placeholder="请输入分类名称" />
            </Item>
            {/* <Item >
              <Button type="primary" htmlType="submit">Submit</Button>
            </Item> */}
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Category
