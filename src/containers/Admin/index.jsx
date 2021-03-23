import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {createDemo1Action} from '../../redux/action_creators/test_action'
import storageUtils from '../../utils/storageUtils'

class Admin extends Component {

  render() {
    // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
    const user = storageUtils.getUser()
    if (!user.id) {
      // this.props.history.replace('/login')   // 跳转到登入页面 , 这种用法只能在回调函数中使用, 不可以在render函数中使用
      return <Redirect to='/login'/>     //在render函数中, 只能使用路由标签, 自动跳转到指定的路由路径
    }
    return (
      <div>
        Admin, {user.username}
      </div>
    )
  }
}

export default connect(
  state => ({demoProps: state.demo}),
  {
    gongfu: createDemo1Action
  }
)(Admin)
