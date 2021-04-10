import React, { Component } from 'react';
import { Card, Button, Select, Input, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { createSaveProductAction } from '../../redux/action_creators/product_action';
import {
  reqProductList,
  reqSearchProduct,
  reqUpdateProductStatus,
} from '../../api';
import { PAGE_SIZE } from '../../config';
const { Option } = Select;

@connect((state) => ({}), { saveProduct: createSaveProductAction })
class Product extends Component {
  state = {
    productList: [], // 商品分页列表数据
    current: 1, // 当前所在的页
    total: 0, // 数据总数
    keyWord: '', // 搜索关键字
    searchType: 'productName', // 搜索类型
  };

  componentDidMount() {
    // this.getProductList()
  }

  // 将初始化和搜索商品列表合并在一起, 使代码可以复用
  getProductList = async (pageNum = 1) => {
    let result;
    if (this.isSearch) {
      let { searchType, keyWord } = this.state;
      result = await reqSearchProduct(pageNum, PAGE_SIZE, searchType, keyWord);
    } else {
      result = await reqProductList(pageNum, PAGE_SIZE);
    }
    // 取出数据
    const { status, data } = result;
    if (status === 1) {
      this.setState({
        // 更新状态
        productList: data.list,
        total: data.total,
        current: pageNum,                   // 存储当前页, 以供其它函数使用
      });
    } else message.error('加载数据出错了!');
    this.props.saveProduct(data.list);     // 把获取到的商品信息列表存入到redux中
  };

  search = () => {
    console.log(this.state.keyWord, this.state.searchType);
    this.isSearch = true;  // 向组件实例添加一个属性, 由于我们不需要使用它来显示,所以就不需要存储到state中
    // this.getProductList();
  };

  updateProductStatus = async (item) => {
    console.log(item);
    let { key, status } = item;
    status = status === 1 ? 0 : 1; // 改变销售状态 , 1: 在售; 0: 停售
    // if (status === 1) status = 0;
    // else status = 1;
    // state值是对象或数组时,需要使用扩展运算符复制一份, 再进行修改
    let newProductList = [...this.state.productList];
    let result = await reqUpdateProductStatus(key, status);
    if (result.status === 0) {
      message.success('状态更新成功!', 1);
      newProductList = newProductList.map((item) => {
        if (item.key === key) {
          item.status = status;
        }
        return item;
      });
      this.setState({ productList: newProductList });
      // this.getProductList(this.state.current);         //如果数据不多, 可以直接发ajax请求.重新获取一遍数据, 注意要获取当前页的显示
    } else message.error('跟新状态失败!', 1);
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
        status: 1,
      },
      {
        key: '3',
        name: '小米',
        desc: '性价比高',
        price: '2999',
        status: 1,
      },
      {
        key: '4',
        name: 'OPPO',
        desc: '实惠产品',
        price: '3999',
        status: 0,
      },
      {
        key: '5',
        name: 'VIVO',
        desc: '不俗科技',
        price: '4999',
        status: 1,
      },
      {
        key: '6',
        name: '三星',
        desc: '海外大厂',
        price: '5949',
        status: 1,
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
        width: '15%',
        render: (price) => '$ ' + price,
      },
      {
        title: '状态',
        // dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: '15%',
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
            </div> // status 是表示商品的销售状况, 1: 在售; 0: 停售
          );
        },
      },
      {
        title: '操作',
        // dataIndex: 'opera',
        key: 'opera',
        align: 'center',
        width: '15%',
        render: (item) => {
          return (
            <div>
              <Button type="link"
                onClick={() => {this.props.history.push(`/prod_about/product/detail/${item.key}`, item)}}
              >
                详情
              </Button>
              <br />
              <Button type="link" onClick={() => {
                  this.props.history.push(`/prod_about/product/add_update/${item.key}`, item);
                }}
              >
                修改
              </Button>
            </div>
          );
        },
      },
    ];

    const title = (
      <div>
        <Select
          style={{ width: '15%' }}
          defaultValue="productName"
          onChange={(value) => this.setState({ searchType: value })} // 受控组件
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          style={{ width: '25%', margin: '0 10px' }}
          placeholder="请输入关键字"
          allowClear // 可以清空输入框的图标
          onChange={(event) => this.setState({ keyWord: event.target.value })} // 受控组件,
        />
        <Button type="primary" onClick={this.search}>
          搜索
        </Button>
      </div>
    );

    return (
      <div>
        <Card
          title={title}
          extra={
            <Button
              type="primary"
              onClick={() =>
                this.props.history.push('/prod_about/product/add_update')
              }
            >
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
              pageSize: PAGE_SIZE,
              current: this.state.current,
              onChange: this.getProductList,
            }}
          />
        </Card>
      </div>
    );
  }
}

export default Product;
