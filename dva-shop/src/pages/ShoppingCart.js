import React from "react";
import { connect } from "dva";
import { Button, List } from "antd";
@connect(({ shopping_cart, products, loading }) => ({
  products: shopping_cart.cart_total_goods.map(({ id, size }) => {
    return {
      ...products.productsTotal.filter((item) => item.id === id)[0],
      size: size,
      goods_number: shopping_cart.cart_good_number[id + size],
    };
  }),
  subtotal: shopping_cart.cart_total_goods
    .reduce((total, { id, size }) => {
      return (
        total +
        products.productsTotal.filter((item) => item.id === id)[0].price *
          shopping_cart.cart_good_number[id + size]
      );
    }, 0)
    .toFixed(2),
  checkingOut: loading.effects["shopping_cart/checkout"],
}))
export default class ShoppingCart extends React.Component {
  render() {
    const { products, subtotal, checkingOut, dispatch } = this.props;
    const checkOut = () => {
      dispatch({
        type: "shopping_cart/checkout",
      });
    };
    const addToCart = (id, size) => {
      dispatch({
        type: "shopping_cart/addToCart",
        payload: {
          id,
          size,
        },
      });
    };
    const minusOne = (id, size) => {
      dispatch({
        type: "shopping_cart/minusOne",
        payload: {
          id,
          size,
        },
      });
    };
    const removeProduct = (id, size, goods_number) => {
      dispatch({
        type: "shopping_cart/removeProduct",
        payload: {
          id,
          size,
          goods_number,
        },
      });
    };
    return (
      <div style={{ }}>
        <div style={{ }}>
          <List
            itemLayout="horizontal"
            pagination={{ defaultPageSize: "5" }}
            dataSource={products}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button.Group size="small">
                    <Button
                      onClick={() => minusOne(item.id, item.size)}
                      disabled={item.goods_number === 1}
                      type="primary"
                      size="middle"
                      shape=""
                      style={{}}
                    >
                      -
                    </Button>
                    <Button
                      onClick={() => addToCart(item.id, item.size)}
                      type="primary"
                      size="middle"
                      shape="round"
                    >
                      +
                    </Button>
                  </Button.Group>,
                  <Button
                    onClick={() =>
                      removeProduct(item.id, item.size, item.goods_number)
                    }
                    shape=""
                    type="danger"
                    size="middle"
                  >
                    X
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={"./assets/products_img/" + item.sku + "_2.jpg"}
                      alt={item.title + "_2.jpg"}
                      style={{}}
                    />
                  }
                  title={item.title}
                  description={
                    item.size +
                    " | " +
                    item.description +
                    " | " +
                    item.currencyFormat +
                    item.price.toFixed(2)
                  }
                />
                <div>件数: {item.goods_number}</div>
              </List.Item>
            )}
          />
        </div>
        <div style={{}}>
          <h3 style={{ textAlign: "center" }}>Subtotal: ${subtotal}</h3>
          <Button
            onClick={checkOut}
            disabled={subtotal <= 0.0 || checkingOut}
            size="large"
            block
          >
            {checkingOut ? (
              <div style={{ }}>结账中...</div>
            ) : (
              <div>结账</div>
            )}
          </Button>
        </div>
      </div>
    );
  }
}
