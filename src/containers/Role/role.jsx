import React, { Component } from 'react';
import { Card, Table, Button, Modal, Form, Input, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqRoleList } from '../../api';
import menuList from '../../config/menuConfig';

const { Item } = Form;

export default class Role extends Component {
  state = {
    isShowAdd: false,
    isShowAuth: false,
    roleList: [],
    menuList,
    checkedKeys: [],
    id: '',    // 当前操作的角色的 id
  };

  componentDidMount() {
    this.getRoleList();
  }

  getRoleList = async () => {
    let roleList = await reqRoleList();
    console.log(roleList);
    if (roleList) this.setState({ roleList });
  };
  // 新增角色确认按钮
  handleOk = () => {
    console.log('点确认按钮了');
    // const {id} = this.state;
    this.setState({ isShowAdd: false });
  };
  // 新增角色取消按钮
  handleCancel = () => {
    console.log('点取消按钮了');
    this.setState({ isShowAdd: false });
  };

  // 新增角色确认按钮
  handleAuthOk = () => {
    console.log('点确认按钮了');
    this.setState({ isShowAuth: false });
  };
  // 新增角色取消按钮
  handleAuthCancel = () => {
    console.log('点取消按钮了');
    this.setState({ isShowAuth: false });
  };

  onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    this.setState({
      checkedKeys: checkedKeysValue,
    });
  };

  showAuth =(id) => {
    this.setState({ isShowAuth: true });
  }
  onFinish = async (values) => {
    // const { username, password } = values;
  };

  render() {
    const { roleList, menuList } = this.state;
    // const dataSource = [
    //   {
    //     key: '1',
    //     name: 'admin',
    //     subon: '2019-05-08 16:54:26',
    //     des: '超级管理员',
    //     pid: 'admin'
    //   },
    //   {
    //     key: '2',
    //     name: 'admin2',
    //     subon: '2019-05-08 16:54:30',
    //     des: '超级管理员',
    //     pid: 'admin'
    //   },
    // ];

    let columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'subon',
        key: ' subon',
      },
      {
        title: '角色描述',
        dataIndex: 'des',
        key: 'des',
      },
      {
        title: '授权人',
        dataIndex: 'pId',
        key: 'pId',
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
              <Button
                type="link"
                onClick={(item) => {this.showAuth(item.id)}}
              >
                设置权限
              </Button>
            </div>
          );
        },
      },
    ];

    const treeData = [
      {
        title: '平台功能',
        key: 'top',
        children: menuList,
      },
    ];

    return (
      <div>
        <Card
          title={
            <Button
              type="primary"
              onClick={() => {
                this.setState({ isShowAdd: true });
              }}
            >
              <PlusOutlined />
              新增角色
            </Button>
          }
        >
          <Table
            dataSource={roleList}
            columns={columns}
            // loading={isLoading}
            bordered
            rowKey="id"
            pagination={{ pageSize: 5, showQuickJumper: true }}
          />
        </Card>

        <Modal
          title="添加角色"
          visible={this.state.isShowAdd}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            name="roleName"
            // className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input placeholder="请输入角色名" />
            </Item>
          </Form>
        </Modal>

        <Modal
          title="设置权限"
          visible={this.state.isShowAuth}
          onOk={this.handleAuthOk}
          onCancel={this.handleAuthCancel}
        >
          <Tree
            checkable // 允许选中
            defaultExpandAll
            // onExpand={this.onExpand} // 收缩或展开菜单的回调
            // expandedKeys={this.state.expandedKeys}   // 初始展开的节点, 可以使用默认展开所有树节点替代
            // autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            treeData={treeData}
          />
        </Modal>
      </div>
    );
  }
}
