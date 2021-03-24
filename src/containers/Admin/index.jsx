import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';

// import { createSaveUserInfoAction } from '../../redux/action_creators/login_action'
import storageUtils from '../../utils/storageUtils';
import { deleteSaveUserInfoAction } from '../../redux/action_creators/login_action';
import LeftNav from '../../components/Left-nav';
import Header from '../../components/Header';

import Home from '../Home';
import Category from '../Category';
import Product from '../Product';
import Role from '../Role';
import User from '../User';
import Bar from '../Charts/Bar';
import Line from '../Charts/Line';
import Pie from '../Charts/Pie';

const { Footer, Sider, Content } = Layout;
class Admin extends Component {
  logout = ()=>{
    storageUtils.removeUser();
    this.props.deleteUserInfo();
  }
  render() {
    const loginUser = storageUtils.getUser();
    // const { user } = this.props.userInfo;
    if (!loginUser.token) {
      // this.props.history.replace('/login')   // 跳转到登入页面 , 这种用法只能在回调函数中使用, 不可以在render函数中使用
      return <Redirect to="/login" />;          //在render函数中, 只能使用从定向路由标签, 自动跳转到指定的路由路径
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{ backgroundColor: 'white' }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: 'rgba(0,0,0,0.5)' }}>
            推荐使用Google浏览器, 可以获得更好的页面操作
            <button onClick={this.logout}>退出登入</button>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  (state) => ({ userInfo: state.userInfo }),
  {
    deleteUserInfo: deleteSaveUserInfoAction
  }
  )(Admin);
