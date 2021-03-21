import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import logo from '../../assets/111.png';
import './login.less';

class Login extends Component {
  onFinish = (values) => {
    console.log(values);
  };

  render() {
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
                { pattern: /^\w+$/, message: '密码只能是字母, 数字和下划线' },
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

export default Login;
