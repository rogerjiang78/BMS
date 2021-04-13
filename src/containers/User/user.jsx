import React, { Component } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  reqUserList,
  reqRoleList,
  reqUserRoleList,
} from '../../api';
import { PAGE_SIZE } from '../../config';

const { Item } = Form;
const { Option } = Select;
export default class User extends Component {
  formRef = React.createRef();

  state = {
    userList: [], // 用户列表
    roleList: [], // 角色列表
    handleType: '',
    isModalVisible: false, // 是否展示新增弹窗
    isLoading: false,
    currentUser: [],
  };

  componentDidMount() {
    this.getUserList();
  }
  // 动态的获取数据, 需要发送ajax请求, 并把返回的数据保存在状态中, 以便可以将来随着状态的改变而自动更新
  getUserList = async () => {
    this.setState({ isLoading: true });
    let userList = await reqUserList();
    let roleList = await reqRoleList();
    let UserRoleList = await reqUserRoleList();
    console.log(userList, roleList, UserRoleList);
    this.setState({
      userList,
      roleList,
      isLoading: false,
    });
  };

  showAdd = () => {
    this.setState({
      handleType: 'add',
      isModalVisible: true,
    });
    // this.formRef.current.resetFields();
  };

  showUpdate = (item) => {
    console.log(item);
    this.setState({
      handleType: 'update',
      isModalVisible: true,
      currentUser: item,      // 获取当前用户用于回显
    });
  }

  // 新增用户弹窗, 确定按钮
  handleOk = async () => {
    const values = await this.formRef.current.validateFields(); // 从 Modal中获取Form表单中的数据
    console.log('fieldsValue', values);
    // const { handleType } = this.state;
    // if (handleType === 'add') {
    //   console.log('点添加按钮了');
    //   const result = reqAddUser(values)
    //   if (result.status === 1) {
    //     message.success('添加用户成功')
    //     this.getUserList();
    //     this.setState({ isModalVisible: false });
    //     this.formRef.current.resetFields();
    //   }
    //   else message.error('添加用户失败');
    // }

    // if (handleType === 'update') {
    //   console.log('点修改按钮了');
    //   values.id = this.state.currentUser.id;
    //   const result = reqUpdateUser(values)
    //   if (result.status === 1) {
    //     message.success('修改用户成功')
    //     this.getUserList();
    //     this.setState({ isModalVisible: false });
    //     this.formRef.current.resetFields();
    //   }
    //   else message.error('修改用户失败');
    // }
  };

  // 新增用户弹窗, 取消按钮
  handleCancel = () => {
    this.formRef.current.resetFields();
    this.setState({ isModalVisible: false });
    console.log('点取消按钮了');
  };

  deleteUser = (item) => {
    Modal.confirm({
      title: `确定删除${item.name}`,
      okText: '确认',
      cancelText: '取消',
      // onOk: async ()=>{
      //   const result = await reqDeleteUser(item.id);
      //   if (result.status === 1) {
      //     message.success('添加用户成功')
      //     this.getUserList();
      //     this.setState({ isModalVisible: false });
      //     this.formRef.current.resetFields();
      //   }
      //   else message.error('添加用户失败');
      // },
      onCancel(){}
    });
  }

  render() {
    let { userList, isModalVisible, handleType, isLoading, currentUser } = this.state;

    const columns = [
      {
        title: '用户名',
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
        title: '角色',
        dataIndex: 'roleId',
        key: 'roleId',
        render: () => {},      // 根据用户的 id, 找到相应角色的id, 再找到该角色的角色名
      },
      {
        title: '提交时间',
        dataIndex: 'subon',
        key: 'subon',
        render: (time) => time ? time : dayjs().format('YYYY年 MM月DD日 HH:mm:ss')
      },
      {
        title: '操作',
        // dataIndex: 'id',
        // key: 'id',
        width: '25%',
        align: 'center',
        render: (item) => {
          return (
            <div>
              <Button type="link" onClick={() => {this.showUpdate(item)}}>修改用户</Button>
              <Button type="link" onClick={() => {this.deleteUser(item)}}>删除用户</Button>
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
            pagination={{ pageSize: PAGE_SIZE, showQuickJumper: true }}
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
            // destroyOnClose
          >
            <Item
              label="用户名"
              name="name"
              initialValue={currentUser.name}
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
              initialValue={currentUser.password}
              rules={[{ required: true, message: '请输入用户密码!' }]}
            >
              <Input type="password" placeholder="请输入用户密码" />
            </Item>
            <Item
              label="手机号"
              name="phone"
              initialValue={currentUser.phone}
              rules={[{ required: true, message: '请输入电话号码!' }]}
            >
              <Input type="number" placeholder="请输入电话号码" />
            </Item>
            <Item
              label="邮箱"
              name="mail"
              initialValue={currentUser.mail}
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input placeholder="请输入邮箱" />
            </Item>
            <Item
              label="角色"
              name="roleId"
              initialValue=""
              rules={[{ required: true, message: '请选择角色名!' }]}
            >
              <Select>
                <Option value="">请选择一个角色</Option>
                {this.state.roleList.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
