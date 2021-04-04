import React, { Component } from 'react'
import {Button, Card, List} from 'antd'
import { LeftCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

@connect(
  state => ({productList: state.productList}),
  {}
)
class Detail extends Component {

  // 初始化数据
  state = {
    name: '',
    desc: '',
    price: '',
    categoryId: '',
    imgs: [],
    details: ''
  }

  componentDidMount() {
    const reduxProductList = this.props.productList;
    const {id} = this.props.match.params;
    let result = reduxProductList.find((item) => {
      return item.key === id
    })
    if (result) {
      const {name, desc, price, categoryId, imgs, details} = result;
      this.setState({name, desc, price, categoryId, imgs, details})
    }
  }

  render() {
    let data = [
      '商品名称: XXXX',
      '商品描述: XXXX',
      '商品价格: XXXX',
      '商品分类: XXXX',
      '商品图片: XXXX',
      '商品详情: XXXX'
    ]
    return (
      <div>
        <Card title={
          <div style={{fontSize: '20px'}}>
            <Button type="link" onClick={()=>{this.props.history.goBack()}}>
              <LeftCircleOutlined style={{fontSize: '25px'}}/>
            </Button>
            <span>商品详情</span>
          </div>
        }>
        <List
          size="large"
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
        </Card>
      </div>
    )
  }
}

export default Detail
