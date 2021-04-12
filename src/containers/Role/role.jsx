import React, { Component } from 'react';
import { Card, Table, Button, Modal, Form, Input, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqRoleList } from '../../api';
import menuList from '../../config/menuConfig';

const { Item } = Form;

export default class Role extends Component {
  formRef = React.createRef()

  state = {
    isShowAdd: false,    // 是否显示添加界面
    isShowAuth: false,   // 是否显示权限界面
    roleList: [],        // 所有角色的列表
    menuList,
    checkedKeys: [],    //
    id: '',            // 当前操作的角色的 id
  };

  componentDidMount() {
    this.getRoleList();
  }

  getRoleList = async () => {
    let roleList = await reqRoleList();
    console.log(roleList);
    if (roleList) this.setState({ roleList });
  }

  // 新增角色确认按钮
  handleOk = async () => {
    const value = await this.formRef.current.validateFields(); // 从 Modal中获取Form表单中的数据
    console.log('点确认按钮了', value);
    // const result = await reqAddRole(value.name)
    // if (result.status === 1) message.success('添加角色成功')
    // else message.error('添加角色失败');
    // this.getRoleList();                   // 显示最新的列表
    this.setState({ isShowAdd: false });
  };
  // 新增角色取消按钮
  handleCancel = () => {
    console.log('点取消按钮了');
    this.setState({ isShowAdd: false });
  };

  // 显示授权弹窗的界面
  showAuth =(item) => {
    this.role = item;           // 将当前需要设置的角色保存到组件
    const menus = item.menus;   // 将选中角色所拥有的选项, 回显出来
    this.setState({
      isShowAuth: true,
      checkedKeys: menus,
    });
  }

  // 授权弹窗的确认按钮, 进行勾选操作时的回调
  handleAuthOk = () => {
    console.log('点确认按钮了');
    this.setState({
      isShowAuth: false
    });
  }
  // 授权弹窗的取消按钮
  handleAuthCancel = () => {
    console.log('点取消按钮了');
    this.setState({ isShowAuth: false });
  };

  onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    this.setState({checkedKeys: checkedKeysValue});
  };

  render() {
    const { roleList, menuList } = this.state;
    const role = this.role || {};
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
        title: '角色描述',
        dataIndex: 'des',
        key: 'des',
      },
      {
        title: '创建时间',
        dataIndex: 'subon',
        key: 'subon',
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
        render: (item) => {
          return (
            <div>
              <Button type="link" onClick={() => {this.showAuth(item)}}>设置权限</Button>
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
            <Button type="primary" onClick={() => {this.setState({ isShowAdd: true })}}>
              <PlusOutlined />新增角色
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
          destroyOnClose
        >
          <Form
            name="role_name"
            // className="login-form"
            initialValues={{
              remember: true,
            }}
            ref={this.formRef}
          >
            <Item
              name="roleName"
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
          <Item label="当前角色名称: ">
            <Input value={role.name} disabled/>
          </Item>
          <Tree
            checkable               // 允许选中
            defaultExpandAll        // 默认展开所有选择项
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
