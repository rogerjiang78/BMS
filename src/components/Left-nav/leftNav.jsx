import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { connect } from 'react-redux';

import menuList from '../../config/menuConfig';
import { createSaveTitleAction } from '../../redux/action_creators/menu_action';

import './leftNav.less';
import logo from '../../assets/111.png';

const { SubMenu } = Menu;

@connect(
  // (state) => ({menus: state.userInfo.user.role.menus}),
  (state) => ({user: state.userInfo.user.username}),
  {
  saveTitle: createSaveTitleAction,
})
@withRouter
class LeftNav extends Component {
  // 定义方法 根据menu 的数据数组生成对应的标签数组 , 使用map + 函数递归调用
  constructor(props) {
    super(props);
    this.menuNode = this.getMenuNodes(menuList);
  }
  // 用于创建菜单的函数
  getMenuNodes = (list) => {
    return list.map((item) => {
      if (this.hasAuth(item)) {   // 判断当前用户是否有此item对应的权限
        if (!item.children) {
          return (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => {this.props.saveTitle(item.title)}}
            >
              <Link to={item.key}>{item.title}</Link>
            </Menu.Item>
          );
        }
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
      else return null
    });
  };

  // 根据当前用户所拥有的menus, 展示相应的节点
  hasAuth = (item) => {
    console.log(item);            // 是指 menuList中的一个个子节点
    // const {  user, menus } = this.props;   // 得到当前用户以及他的所有权限
    // // 如果当前用户是admin, 或者item是公开的, 或者当前用户的一级菜单有此item的权限, 返回true
    // if (user.username === 'admin' || item.public || menus.indexOf(item.key) !== -1) {
    //   return true
    // }
    // // 当前用户的一个菜单的子节点有此item的权限, 当前 item 也应该返回true
    // else if (item.children) {
    //   return menus.some((cItem) => item.children.key === cItem)
    // }
    return true
  }

  render() {
    const selectedKey = this.props.location.pathname;
    console.log(selectedKey);
    const arrKeys = this.props.location.pathname
      .split('/')
      .splice(1)
      .map((item) => {
        return (item = '/' + item);
      });
    return (
      <div className="left-nav">
        <Link className="left-nav-link" to="/home">
          <img src={logo} alt="logo" />
          <h1>管理系统</h1>
        </Link>

        <Menu
          selectedKeys={selectedKey.indexOf('product') !== -1 ? '/prod_about/product' : selectedKey}
          defaultOpenKeys={arrKeys}
          mode="inline"
          theme="dark"
        >
          {this.menuNode}
        </Menu>
      </div>
    );
  }
}

export default LeftNav;
