import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';

// import { createSaveUserInfoAction } from '../../redux/action_creators/login_action'
import storageUtils from '../../utils/storageUtils';
import LeftNav from '../../components/Left-nav/leftNav';
import Header from '../../components/Header/header';

import Home from '../Home/home.jsx';
import Category from '../Category/category';
import Product from '../Product/product';
import Role from '../Role/role';
import User from '../User/user';
import Bar from '../Charts/Bar/bar';
import Line from '../Charts/Line/line';
import Pie from '../Charts/Pie/pie';

import './admin.less';

const { Footer, Sider, Content } = Layout;
class Admin extends Component {
  render() {
    const loginUser = storageUtils.getUser();
    // const { user } = this.props.userInfo;
    if (!loginUser.token) {
      // this.props.history.replace('/login')   // 跳转到登入页面 , 这种用法只能在回调函数中使用, 不可以在render函数中使用
      return <Redirect to="/login" />; //在render函数中, 只能使用从定向路由标签, 自动跳转到指定的路由路径
    }
    return (
      <Layout className="admin">
        <Sider className="sider">
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content className="content">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/prod_about/category" component={Category} />
              <Route path="/prod_about/product" component={Product} />
              <Route path="/user" component={User} />
              <Route path="/role" component={Role} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer className="footer">
            推荐使用Google浏览器, 可以获得更好的页面操作&nbsp;
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect((state) => ({ userInfo: state.userInfo }), {})(Admin);
