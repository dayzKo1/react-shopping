import React from "react";
import { connect } from "dva";
import { Card, Button, Popover, List, Divider, Col ,message} from "antd";
import styles from './ProductCard.css'
@connect(({ products }) => ({
  products: products.data,
}))
export default class ProductCard extends React.Component {
  addToCart = (id, size) => {
    const { dispatch } = this.props;
    dispatch({
      type: "shoppingCart/addToCart",
      payload: {
        id,
        size,
      },
    });
    message.success("添加成功");
  };
  render() {
    const { products = [] } = this.props;

    return products.map((item, key) => (

      <Col key={key}
        style={{ marginTop: 15, marginBottom: 10 }} title={item.availableSizes}>
        <Card
          className={styles.NewCard}
          hoverable
          style={{
            width: 300,
            cursor: 'default',
            marginRight: 45,
            marginLeft: 45
          }}
          key={key}
          cover={
            <img
              style={{ padding: 10, backgroundColor: '#f8f8f8' }}
              alt={item.title + "_1.jpg"}
              src={"./assets/products_img/" + item.sku + "_1.jpg"}
            ></img>
          }
        >
          <h2 style={{ textAlign: "center", fontFamily: "Arial" }}>{item.title}</h2>
          <Divider />
          <h3 style={{ textAlign: "center", fontSize: 25, fontFamily: "Arial" }}>
            {item.currencyFormat} {item.price.toFixed(2)}
          </h3>
          <Popover
            content={
              <List
                size="small"
                dataSource={item.availableSizes}
                renderItem={(item_size) => (
                  <List.Item >
                    <Button
                      size="middle"
                      style={{ width: '100%', fontFamily: "Arial" }}
                      onClick={() => this.addToCart(item.id, item_size)}
                    >
                      <span style={{ fontWeight: 800, fontFamily: "Arial" }}>{item_size}</span>
                    </Button>
                  </List.Item>
                )}
              />
            }
            title="选择所需商品的尺码"
            trigger="click"
          >
            <Button
              size="large"
              style={{ width: '100%', color: 'white', backgroundColor: 'black', letterSpacing: 5, fontWeight: 700, fontSize: 16 }}
            >
              ADD TO CART
            </Button>
          </Popover>
        </Card>
      </Col>


    ));
  }
}
