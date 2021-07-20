import React from 'react';
import { connect } from "dva";
import { Button, Row, Col, Select, Affix } from "antd";
import ProductCard from "../components/ProductCard";
const { Option } = Select;
@connect(({ products }) => ({
  products: products.result,
  now_size: products.now_size,
  now_sort: products.now_sort
}))
export default class ProductsList extends React.Component {
  state = {
    sizeTotal: ["XS", "S", "M", "ML", "L", "XL", "XXL"]
  }
  // componentDidMount = () => {
  //   this.props.dispatch({
  //     type: 'product/query'
  //   })
  // }
  render() {
    const { products, now_size, now_sort, dispatch } = this.props;
    const changeSize = (size) => {
      dispatch({
        type: "products/sort",
        payload: {
          size: size,
          sort: now_sort
        }
      })
    };
    const changeSort = (sort) => {
      dispatch({
        type: "products/sort",
        payload: {
          size: now_size,
          sort: sort
        }
      })
    };
    const { sizeTotal } = this.state;
    const sizeList = sizeTotal.map((item, key) => (
      <Button
        size="middle"
        onClick={() => changeSize(item)}
        style={{ marginRight: 5, color: 'white', backgroundColor: 'red', borderColor: 'red' }}
        shape={now_size===item ? "round" : "circle"}
        key={key}
      >
        {item}
      </Button>
    ));
    return (
      <div>
        <Affix>
          <Row justify="center" align="bottom" style={{ backgroundColor: '#001529', color: 'white', padding: 10 }}>
            <Col style={{ marginRight: 30 }}>
              <span style={{ fontWeight: 600, fontSize: 20 }}>Order:</span>
              <Select
                bordered={false}
                defaultValue="default"
                onChange={(value) => changeSort(value)}
                loading="false"
                style={{ color: 'white', fontWeight: 400, fontSize: 17 }}
              >
                <Option value="default">默认排序</Option>
                <Option value="upper">价格升序</Option>
                <Option value="lower">价格降序</Option>
              </Select>
            </Col>
            <Col style={{ marginRight: 30 }}>
              {/* <span style={{ fontWeight: 600, fontSize: 20, marginRight:10 }}>Sizes:</span> */}
              {sizeList}
            </Col>
            <Col>
              <span style={{ fontSize: 20, color: 'red' }}>{products?.length}</span>
              <span style={{ fontWeight: 600, fontSize: 20 }}> Product(s) Found</span></Col>
          </Row>
        </Affix>
        <Row justify="center">
          <ProductCard />
        </Row>
      </div>
    );
  }
}
