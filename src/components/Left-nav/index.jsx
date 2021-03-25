import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  AreaChartOutlined,
  UnorderedListOutlined,
  GoldOutlined,
  DesktopOutlined,
  UserOutlined,
  PushpinOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import './index.less';
import logo from '../../assets/111.png';

const { SubMenu } = Menu;

export default class LeftNav extends Component {
  render() {
    return (
      <div className="left-nav">
        <Link className="left-nav-link" to="/home">
          <img src={logo} alt="logo" />
          <h1>管理后台</h1>
        </Link>

        <Menu
          // defaultSelectedKeys={['/home']}
          // defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          // inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="/home" icon={<HomeOutlined />}>
            <Link to="/home">首页</Link>
          </Menu.Item>
          <SubMenu key="/prod_about" icon={<PushpinOutlined />} title="商品">
            <Menu.Item key="/category" icon={<UnorderedListOutlined />}>
              <Link to="/prod_about/category">分类管理</Link>
            </Menu.Item>
            <Menu.Item key="/product" icon={<GoldOutlined />}>
              <Link to="/prod_about/product">商品管理</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/category" icon={<DesktopOutlined />}>
            <Link to="/category">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="/user" icon={<UserOutlined />}>
            <Link to="/user">角色管理</Link>
          </Menu.Item>
          <SubMenu key="/charts" icon={<AreaChartOutlined />} title="图形图表">
            <Menu.Item key="/bar" icon={<BarChartOutlined />}>
              <Link to="/charts/bar">柱状图</Link>
            </Menu.Item>
            <Menu.Item key="/line" icon={<LineChartOutlined />}>
              <Link to="/charts/line">折线图</Link>
            </Menu.Item>
            <Menu.Item key="/pie" icon={<PieChartOutlined />}>
              <Link to="/charts/pie">饼状图</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
