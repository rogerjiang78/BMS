import React, { Component } from 'react';
import { Card, Button, Select, Input, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import {createSaveProductAction} from '../../redux/action_creators/product_action'
const { Option } = Select;

@connect(
  state => ({}),
  {
    saveProduct: createSaveProductAction
  }
)
class Product extends Component {
  state = {
    productList: [],
    current: 1,
    total: '',
    keyWord: '',
    searchType: 'name',
  };

  componentDidMount() {
    // this.getProductList()
  }

  // 将初始化和搜索商品列表合并在一起
  getProductList = async (number = 1) => {
    let result;
    if (this.isSearch) {
      // const {searchType, keyWord} = this.state
      // result = await reqSearchProduct(number, 5, searchType, keyWord)
    } else {
      // result = await reqProductList(number, 5)
    }
    const { data } = result;
    this.setState({
      productList: data.list,
      total: data.total,
      current: data.pageNum,
    });
    // 把获取的商品列表存入redux
    this.props.saveProduct(data.list)
  };

  search = () => {
    this.isSearch = true;
    this.getProductList();
  };

  updateProductStatus = async ({key, status }) => {
    if (status === 1) status = 0;             // 改变销售状态
    else status = 1;
    console.log(status);
    // let result = await reqUpdateProductStatus(id, status)
    let newProductList = [...this.state.productList]
    if(status === 0) {
      message.success('状态更新成功!',1)
      newProductList = newProductList.map((item) => {
        if(item.key === key) {
          item.status = status
        }
        return item
      })
      this.setState({newProductList})
    }
    else message.success('跟新状态失败!',1)
  };

  render() {
    const dataSource = [
      {
        key: '1',
        name: '华为',
        desc: '国产骄傲',
        price: '5999',
        status: 1,
      },
      {
        key: '2',
        name: '苹果',
        desc: '尖峰科技',
        price: '7999',
        status: 0,
      },
    ];
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        width: '10%',
        render: (price) => '$ ' + price,
      },
      {
        title: '状态',
        // dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: '10%',
        render: (item) => {
          return (
            <div>
              <Button
                type={item.status === 1 ? 'danger' : 'primary'}
                onClick={() => {
                  this.updateProductStatus(item);
                }}
              >
                {item.status === 1 ? '下架' : '上架'}
              </Button>
              <br />
              <span>{item.status === 1 ? '在售' : '已停售'}</span>
            </div>
          );
        },
      },
      {
        title: '操作',
        // dataIndex: 'opera',
        key: 'opera',
        align: 'center',
        width: '10%',
        render: (item) => {
          return (
            <div>
              <Button type="link" onClick={()=>{this.props.history.push(`/prod_about/product/detail/${item.key}`)}}
              >详情</Button>
              <br />
              <Button type="link" onClick={()=>{this.props.history.push(`/prod_about/product/add_update/${item.key}`)}}
              >修改</Button>
            </div>
          );
        },
      },
    ];

    return (
      <div>
        <Card
          title={
            <div>
              <Select
                defaultValue="name"
                style={{ width: 150 }}
                onChange={(value) => this.setState({ searchType: value })}
              >
                <Option value="name">按名称搜索</Option>
                <Option value="desc">按描述搜索</Option>
              </Select>
              <Input
                placeholder="请输入关键字"
                style={{ width: '25%', margin: '0 10px' }}
                allowClear
                onChange={(event) =>
                  this.setState({ keyWord: event.target.value })
                }
              />
              <Button type="primary" onClick={this.search}>
                搜索
              </Button>
            </div>
          }
          extra={
            <Button type="primary" onClick={()=>{this.props.history.push('/prod_about/product/add_update')}}>
              <PlusOutlined />
              添加商品
            </Button>
          }
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            // rowKey='id'
            pagination={{
              total: this.state.total,
              pageSize: 5,
              current: this.state.current,
              onChange: this.getProductList,
            }}
          />
        </Card>
      </div>
    );
  }
}

export default Product
