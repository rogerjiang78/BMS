import React, { Component } from 'react';
import { Button, Card, List } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

// import { BASE_IMG } from '../../../config'
import { reqProductById, reqCategoryList } from '../../../api'
import './detail.less';

@connect(
  (state) => ({
    productList: state.productList,
    categoryList: state.categoryList,
  }),
  {}
  )
class Detail extends Component {
  // 初始化数据
  state = {
    name: '',
    desc: '',
    price: '',
    imgs: [],
    detail: '',
    categoryId: '',
    categoryName: '',
  };

  getProductById = async (id) => {
    let result = await reqProductById(id)
    const {status, data} = result
    if (status === 1) {
      this.categoryId = data.categoryId;
      const { name, desc, price, categoryId, imgs, detail } = data;
      this.setState({ name, desc, price, categoryId, imgs, detail });
    }
  }

  getCategoryList = async () => {
    const result = await reqCategoryList()
    const {status, data} = result;
    if (status === 1) {
      let result = data.find((item) => {
        return item.id === this.categoryId;
      });
      if (result) this.setState({categoryName: result.name})
    }
  }

  componentDidMount() {
  //   const { id } = this.props.match.params;
  //   const reduxProductList = this.props.productList;
  //   const reduxCategoryList = this.props.categoryList;
  //   if (reduxProductList.length) {
  //     let result = reduxProductList.find((item) => {
  //       return item.key === id;
  //     });
  //     if (result) {
  //       this.categoryId = result.categoryId; // 由于setState()是异步的,在同一个函数中,无法立刻获得跟新的state值, 需要另外存储
  //       const { name, desc, price, categoryId, imgs, detail } = result;
  //       this.setState({ name, desc, price, categoryId, imgs, detail });
  //     }
  //   } else {
  //     this.getProductById(id);   // 如果页面刷新, 将丢失redux中的数据, 就需要发送请求从服务器获取数据
  //   }
  //   if (reduxCategoryList.length) {
  //     let result = reduxCategoryList.find((item) => {
  //       return item.id === this.categoryId;
  //     });
  //     if (result) {
  //       this.setState({categoryName: result.name})
  //     } else {
  //       this.getCategoryList()
  //     }
  //   }
    const productInfo = this.props.location.state;
    console.log(productInfo);
    const { name, desc, price, imgs, detail } = productInfo;
    this.setState({ name, desc, price, imgs, detail });
  }

  render() {
    const { Item } = List;
    const { name, desc, price, detail } = this.state

    return (
      <div>
        <Card
          title={
            <div style={{ fontSize: '20px' }}>
              <Button type="link" onClick={() => {this.props.history.goBack()}}>
                <LeftOutlined style={{ fontSize: '20px' }}/>
              </Button>
              <span>商品详情</span>
            </div>
          }
        >
          <List className="detail"
          //  loading={this.state.isLoading}
          >
            <Item>
              <div>
                <span className="detail-title">商品名称 : </span>
                <span className="detail-content">{name}</span>
              </div>
            </Item>
            <Item>
              <div>
                <span className="detail-title">商品描述 : </span>
                <span className="detail-content">{desc}</span>
              </div>
            </Item>
            <Item>
              <div>
                <span className="detail-title">商品价格 : </span>
                <span className="detail-content">{price}</span>
              </div>
            </Item>
            <Item>
              <div>
                <span className="detail-title">商品分类 : </span>
                <span className="detail-content">{this.state.categoryName}</span>
              </div>
            </Item>
            <Item>
              <div>
                <span className="detail-title">商品图片 : </span>
                <span>
                  <img className="detail-img"
                    src="http://www.33lc.com/article/UploadPic/2012-10/2012101714102663437.jpg"
                    alt="picture1"
                  />
                  <img className="detail-img"
                    src="http://www.33lc.com/article/UploadPic/2012-10/2012101714103954400.jpg"
                    alt="picture2"
                  />
                  {/* {
                    imgs.map((item, index) => {
                      return <img key={index} src={BASE_IMG + item} alt="productPhoto" />
                    })
                  } */}
                </span>
              </div>
            </Item>
            <Item>
              <div>
                <span className="detail-title">商品详情 : </span>
                <div className="detail-content" dangerouslySetInnerHTML={{__html: detail}}></div>
              </div>
            </Item>
          </List>
        </Card>
      </div>
    );
  }
}

export default Detail;
