import React from 'react';
import { connect } from "dva";
import { Button, Row, Col, Select, Affix} from "antd";
import ProductCard from "../components/ProductCard";
const { Option } = Select;@connect(({ products }) => ({
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
        style={{ marginRight: 5, color:'white' }}
        shape="circle"
        key={key}
        type={now_size.includes(item) ? "primary" : "ghost"}

      >
        {item}
      </Button>
    ));
    return (
      <div>
        <Affix>
          <Row justify="center" align="bottom" style={{ backgroundColor: '#001529', color: 'white',padding:10}}>

            <Col style={{ marginRight: 30 }}>
              <span style={{ fontWeight: 600, fontSize: 20 }}>Order by:</span>
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
              <span style={{ fontWeight: 600, fontSize: 20 }}>Sizes:</span>
              {sizeList}
            </Col>

            <Col>
              <span style={{ fontSize: 20 }}>{products.length}</span>
              <span style={{ fontWeight: 600, fontSize: 20 }}> Product(s) found</span></Col>
          </Row>
        </Affix>

        <Row justify="space-around" gutter="4" style={{marginLeft:160,marginRight:160}}>
          <ProductCard />
        </Row>

      </div>
    );
  }
}
