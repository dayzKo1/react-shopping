import React from "react";
import { connect } from "dva";
import { Card, Button, Popover, List } from "antd";
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
      <Card
        className="card"
        key={key}
        cover={
          <img
            alt={item.title + "_1.jpg"}
            src={"./assets/products_img/" + item.sku + "_1.jpg"}
          ></img>
        }
      >
        <h2 style={{ textAlign: "center" }}>{item.title}</h2>
        <hr
          style={{
            width: "20%",
            backgroundColor: "orange",
            height: "2px",
            border: "none",
          }}
        />
        <h3 style={{ textAlign: "center" }}>
          {item.currencyFormat} <strong>{item.price.toFixed(2)}</strong>
        </h3>
        <Popover
          content={
            <List
              size="small"
              dataSource={item.availableSizes}
              renderItem={(item_size) => (
                <List.Item>
                  <Button
                    onClick={() => addToCart(item.id, item_size)}
                    block
                    style={{
                      background: "black",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    {item_size}
                  </Button>
                </List.Item>
              )}
            />
          }
          title="Please to select your size"
          trigger="click"
        >
          <Button
            size="large"
            block
            style={{ background: "black", color: "white", fontWeight: "600" }}
          >
            Add to cart
          </Button>
        </Popover>
      </Card>
    ));
  }
}
