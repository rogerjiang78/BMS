import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { connect } from 'react-redux';

import menuList from '../../config/menuConfig';
import { createSaveTitleAction } from '../../redux/action_creators/menu_action';

import './leftNav.less';
import logo from '../../assets/111.png';

const { SubMenu } = Menu;

@connect((state) => ({}), {
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
      if (!item.children) {
        return (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => {
              this.props.saveTitle(item.title);
            }}
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
    });
  };

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
