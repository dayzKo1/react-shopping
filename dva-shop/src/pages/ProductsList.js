import React from "react";
import { connect } from "dva";
import { Button, Row, Col, Select } from "antd";
import ProductCard from "../components/ProductCard";
const { Option } = Select;

@connect(({ products }) => ({
  products: products.result,
  now_size: products.now_size,
}))
export default class ProductsList extends React.Component {
  render() {
    const { products, now_size, dispatch } = this.props;
    const changeSize = (size) => {
      dispatch({
        type: "products/changeSize",
        payload: size,
      });
      dispatch({
        type: "products/query",
      });
    };
    const changeSort = (sort) => {
      dispatch({
        type: "products/changeSort",
        payload: sort,
      });
      dispatch({
        type: "products/query",
      });
    };
    const sizeTotal = ["XS", "S", "M", "ML", "L", "XL", "XXL"];
    const sizeList = sizeTotal.map((item, key) => (
      <Button
        size="large"
        onClick={() => changeSize(item)}
        style={{}}
        shape=""
        key={key}
        type={now_size.includes(item) ? "primary" : "default"}
      >
        {item}
      </Button>
    ));
    return (
      <Row>
        <Col span={24}>
          <div
            style={{}}
          >
            <div>
              <h3 style={{}}>
                {products.length + " Product(s) found."}
              </h3>
            </div>
            <div style={{}}>
              <span
                style={{}}
              >
                Order by
              </span>
              <Select
                defaultValue="default"
                style={{}}
                onChange={(value) => changeSort(value)}
              >
                <Option value="default">default</Option>
                <Option value="upper">toUpper</Option>
                <Option value="lower">toLower</Option>
              </Select>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div
            style={{}}
          >
            <h2>Sizes:</h2>
          </div>
          <div
            style={{}}
          >
            {sizeList}
          </div>
        </Col>
        <Col span={24}>
          <div className={{}}>
            <ProductCard />
          </div>
        </Col>
      </Row>
    );
  }
}
