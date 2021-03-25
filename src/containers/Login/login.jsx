/* eslint-disable no-useless-escape */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { createSaveUserInfoAction } from '../../redux/action_creators/login_action';
import { reqLogin } from '../../api';
import storageUtils from '../../utils/storageUtils';
import logo from '../../assets/111.png';
import './login.less';

class Login extends Component {
  onFinish = async (values) => {
    const { username, password } = values;
    // reqLogin(username, password)
    //   .then((result)=>{
    //     console.log(result);
    //   })
    //   .catch((reason)=>{
    //     console.log(reason);
    //   })
    let result = await reqLogin(username, password);
    const { code, msg } = result;
    // console.log(result);
    if (code === 1) {
      storageUtils.saveUser(result); // 使用定义的函数代替上面的代码
      this.props.saveUserInfo(result); // 从服务器返回的 user信息, 交给redux管理
      this.props.history.replace('/'); // 跳转到主页面
    } else {
      message.warning(msg, 1);
    }
  };

  render() {
    // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
    const loginUser = storageUtils.getUser();
    if (loginUser.token) {
      return <Redirect to="/" />; //在render函数中, 只能使用路由标签, 自动跳转到指定的路由路径
    }

    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登陆</h1>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
                { min: 4, message: '用户名必须是大于4位数' },
                { max: 12, message: '用户名必须是小于等于12位数' },
                { pattern: /^\w+$/, message: '用户名只能是字母, 数字和下划线' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
                { min: 4, message: '密码必须是大于4位数' },
                { max: 12, message: '密码必须是小于等于12位数' },
                // eslint-disable-next-line no-useless-escape
                {
                  pattern: /^[a-zA-Z0-9\.\_]{0,12}$/,
                  message: '密码只能是字母, 数字,点和下划线',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

// export default Login;

export default connect((state) => ({}), {
  saveUserInfo: createSaveUserInfoAction,
})(Login);
