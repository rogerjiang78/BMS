import React, { Component } from 'react';
import { Card, Table, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { reqUserList } from '../../api';
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
    const { handleType } = this.state
    this.formRef.current.resetFields();
    this.setState({ isModalVisible: false });
    if(handleType === 'add') console.log('点添加按钮了');
    if(handleType === 'update') console.log('点修改按钮了');
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
        title: '学校',
        dataIndex: 'school',
        key: 'school',
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
        title: '操作',
        // dataIndex: 'id',
        // key: 'id',
        width: '25%',
        align: 'center',
        render: () => {
          return (
            <div>
              <Button type="link" onClick={(item) => this.showUpdate(item)}>修改用户</Button>
              <Button type="link">删除用户</Button>
            </div>
          );
        },
      },
    ];
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <PlusOutlined />
        添加用户
      </Button>
    );
    return (
      <div>
        <Card extra={extra}>
          <Table
            dataSource={userList}
            columns={columns}
            loading={isLoading}
            bordered
            rowKey="id"
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
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
                { pattern: /^\w+$/, message: '用户名只能是字母, 数字和下划线' },
              ]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input type="password" placeholder="请输入用户密码" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
