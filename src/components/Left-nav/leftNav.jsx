import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
// import {
//   HomeOutlined,
//   AreaChartOutlined,
//   UnorderedListOutlined,
//   GoldOutlined,
//   DesktopOutlined,
//   UserOutlined,
//   PushpinOutlined,
//   BarChartOutlined,
//   LineChartOutlined,
//   PieChartOutlined,
// } from '@ant-design/icons';

import menuList from '../../config/menuConfig';

import './leftNav.less';
import logo from '../../assets/111.png';

const { SubMenu } = Menu;

class LeftNav extends Component {
  // 定义方法 根据menu 的数据数组生成对应的标签数组 , 使用map + 函数递归调用
  constructor(props){
    super(props)
    this.menuNode = this.getMenuNodes(menuList)
  }
  getMenuNodes = (lists) => {
    return lists.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
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
    const arrKeys = this.props.location.pathname.split('/').splice(1).map((item)=>{
      return item = '/' + item
    })
    return (
      <div className="left-nav">
        <Link className="left-nav-link" to="/home">
          <img src={logo} alt="logo" />
          <h1>管理系统</h1>
        </Link>

        <Menu
          selectedKeys={[selectedKey]}
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

export default withRouter(LeftNav);
