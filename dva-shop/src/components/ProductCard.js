import React from "react";
import { connect } from "dva";
import { Card, Button, Popover, List, Divider, Col } from "antd";
import styles from './ProductCard.css'
@connect(({ products }) => ({
  products: products.result,
}))
export default class ProductCard extends React.Component {
  render() {
    const { products, dispatch } = this.props;
    const addToCart = (id, size) => {
      dispatch({
        type: "shopping_cart/addToCart",
        payload: {
          id,
          size,
        },
      });
    };
    return products.map((item, key) => (

      <Col style={{marginTop:20,marginBottom:20}} title={item.availableSizes}>
        <Card
          className={styles.NewCard}
          hoverable
          style={{
            width: 300,
            cursor: 'default',
            marginRight:50,
            marginLeft:50
          }}
          key={key}
          cover={
            <img
              style={{padding:10,backgroundColor:'#f8f8f8'}}
              alt={item.title + "_1.jpg"}
              src={"./assets/products_img/" + item.sku + "_1.jpg"}
            ></img>
          }
        >
          <h2 style={{ textAlign: "center" }}>{item.title}</h2>
          <Divider />
          <h3 style={{ textAlign: "center" }}>
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
                      style={{ width: '100%' }}
                      onClick={() => addToCart(item.id, item_size)}
                    >
                      <span style={{ fontWeight: 700 }}>{item_size}</span>
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
