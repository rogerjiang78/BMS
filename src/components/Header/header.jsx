import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Modal } from 'antd';
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import screenfull from 'screenfull';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import storageUtils from '../../utils/storageUtils';
import { deleteSaveUserInfoAction } from '../../redux/action_creators/login_action';
import { reqWeather } from '../../api/index';
import './header.less';

const { confirm } = Modal;

@connect((state) => ({ userInfo: state.userInfo }), {
  deleteUserInfo: deleteSaveUserInfoAction,
})
@withRouter     // 在非路由组件中, 要想使用路由组件的API, 就需要使用 withRouter包裹, 它是个高阶组件
class Header extends Component {
  state = {
    isFull: false,
    date: dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
    weatherInfo: {},
  };

  fullScreen = () => {
    screenfull.toggle();
  };

  componentDidMount() {
    // console.log(this.props);
    screenfull.on('change', () => {
      // 切换全屏的切换
      let isFull = !this.state.isFull;
      this.setState({ isFull });
    });
    // this.timeId = setInterval(() => {
    //   this.setState({ date: dayjs().format('YYYY年 MM月DD日 HH:mm:ss') });
    // }, 1000);
    this.getWeather(); // 获取天气信息
  }
  // 设置实时的时间, 一定要取消定时器, 否则退出后, 系统无法得知就会报错
  componentWillUnmount() {
    clearInterval(this.timeId);
  }

  getWeather = async () => {
    let weatherInfo = await reqWeather();
    this.setState({ weatherInfo });
  };
  // 退出登陆
  logout = () => {
    const { deleteUserInfo } = this.props;
    confirm({
      title: '确定退出?',
      icon: <ExclamationCircleOutlined />,
      content: '如果退出, 需要重新登陆',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        storageUtils.removeUser();
        deleteUserInfo();
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  render() {
    let { isFull, date, weatherInfo } = this.state;
    let { user } = this.props.userInfo;
    return (
      <header className="header">
        <div className="head-top">
          <Button size="small" onClick={this.fullScreen}>
            {!isFull ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
          </Button>
          <span className="username">欢迎, {user.username}</span>
          <Button type="link" onClick={this.logout}>退出登入</Button>
        </div>
        <div className="head-bottom">
          <div className="head-bottom-left">柱状图</div>
          <div className="head-bottom-right">
            {date}&nbsp;{weatherInfo.weather} 温度: {weatherInfo.minTemp} ~{' '}
            {weatherInfo.maxTemp}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
