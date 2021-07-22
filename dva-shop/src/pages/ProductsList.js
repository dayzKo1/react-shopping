import React from 'react';
import { connect } from "dva";
import { Button, Row, Col, Select, Affix } from "antd";
import ProductCard from "../components/ProductCard";
const { Option } = Select;
@connect(({ products }) => ({
  products: products.data,
  state_size: products.size,
  state_sort: products.sort,
}))
export default class ProductsList extends React.Component {
  state = {
    sizeTotal: ["XS", "S", "M", "ML", "L", "XL", "XXL"]
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "products/query",
    });
  }
  changeSize = (size) => {
    const { dispatch, state_sort } = this.props;
    dispatch({
      type: "products/sort",
      payload: {
        size: size,
        sort: state_sort,
      }
    })
  };
  changeSort = (sort) => {
    const { dispatch, state_size } = this.props;
    dispatch({
      type: "products/sort",
      payload: {
        size: state_size,
        sort: sort,
      },
    })
  };
  render() {

    const { products, state_size } = this.props;
    const { sizeTotal } = this.state;

    const sizeList = sizeTotal.map((item, key) => (
      <Button
        size="middle"
        onClick={() => this.changeSize(item)}
        style={{ marginRight: 5, color: 'white', backgroundColor: 'red', borderColor: 'red',fontFamily: "Arial" ,fontWeight:500}}
        shape={state_size === item ? "round" : "circle"}
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
              <span style={{ fontWeight: 600, fontSize: 20 ,fontFamily: "Arial" }}>Order:</span>
              <Select
                bordered={false}
                defaultValue="default"
                onChange={(value) => this.changeSort(value)}
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
              <span style={{ fontWeight: 600, fontSize: 20,fontFamily: "Arial"  }}> Product(s) Found</span></Col>
          </Row>
        </Affix>
        <Row justify="center">
          <ProductCard />
        </Row>
      </div>
    );
  }
}
