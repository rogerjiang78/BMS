import React, { Component } from 'react';
import { Card, Table, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { reqUserList } from '../../api';

const { Item } = Form;
export default class User extends Component {
  formRef = React.createRef();

  state = {
    userList: [],
    isModalVisible: false,
    handleType: '',
    isLoading: false,
  };

  componentDidMount() {
    this.getUserList();
  }
  // 动态的获取数据, 需要发送ajax请求, 并把返回的数据保存在状态中, 以便可以将来随着状态的改变而自动更新
  getUserList = async () => {
    this.setState({ isLoading: true });
    let result = await reqUserList();
    // console.log(result);
    this.setState({ isLoading: false });
    this.setState({ userList: result });
  };

  showAdd = () => {
    this.setState({
      handleType: 'add',
      isModalVisible: true,
    });
  };

  showUpdate = (item) => {
    this.setState({
      handleType: 'update',
      isModalVisible: true,
    });
  };

  handleOk = () => {
    const { handleType } = this.state;
    this.formRef.current.resetFields();
    this.setState({ isModalVisible: false });
    if (handleType === 'add') console.log('点添加按钮了');
    if (handleType === 'update') console.log('点修改按钮了');
  };

  handleCancel = () => {
    this.formRef.current.resetFields();
    this.setState({ isModalVisible: false });
    console.log('点取消按钮了');
  };

  onFinish = async (values) => {
    // const { username, password } = values;
  };

  render() {
    let { userList, isModalVisible, handleType, isLoading } = this.state;

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '邮箱',
        dataIndex: 'mail',
        key: 'mail',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '身份ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '操作',
        // dataIndex: 'id',
        // key: 'id',
        width: '25%',
        align: 'center',
        render: () => {
          return (
            <div>
              <Button type="link" onClick={(item) => this.showUpdate(item)}>
                修改用户
              </Button>
              <Button type="link">删除用户</Button>
            </div>
          );
        },
      },
    ];

    const title = (
      <Button type="primary" onClick={this.showAdd}>
        <PlusOutlined />
        添加用户
      </Button>
    );

    return (
      <div>
        <Card title={title}>
          <Table
            dataSource={userList}
            columns={columns}
            bordered
            rowKey="id"
            loading={isLoading}
            pagination={{ pageSize: 5, showQuickJumper: true }}
          />
        </Card>

        <Modal
          title={handleType === 'add' ? '添加用户' : '修改用户'}
          visible={isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            initialValues={{
              remember: true,
            }}
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: '请输入用户名!' },
                { pattern: /^\w+$/, message: '用户名只能是字母, 数字和下划线' },
              ]}
            >
              <Input placeholder="请输入用户名" />
            </Item>
            <Item
              label="用户密码"
              name="password"
              rules={[{ required: true, message: '请输入用户密码!' }]}
            >
              <Input type="password" placeholder="请输入用户密码" />
            </Item>
            <Item
              label="手机号"
              name="phone"
              rules={[{ required: true, message: '请输入电话号码!' }]}
            >
              <Input type="number" placeholder="请输入电话号码" />
            </Item>
            <Item
              label="邮箱"
              name="mail"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input placeholder="请输入邮箱" />
            </Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
