import React from "react";
import { connect } from "dva";
import { Button, List } from "antd";
@connect(({ shoppingCart, loading }) => ({
  products: shoppingCart.cart_total_goods.map(({ id, size }) => {
    return {
      ...shoppingCart.productsTotal.filter((item) => item.id === id)[0],
      size: size,
      goods_number: shoppingCart.cart_good_number[id + size],
    };
  }),
  subtotal: shoppingCart.cart_total_goods
    .reduce((total, { id, size }) => {
      return (
        total +
        shoppingCart.productsTotal.filter((item) => item.id === id)[0].price *
        shoppingCart.cart_good_number[id + size]
      );
    }, 0)
    .toFixed(2),
  checkingOut: loading.effects["shoppingCart/checkout"],
}))
export default class ShoppingCart extends React.Component {
  render() {
    const { products, subtotal, checkingOut, dispatch } = this.props;
    const checkOut = () => {
      dispatch({
        type: "shoppingCart/checkout",
      });
    };
    const addToCart = (id, size) => {
      dispatch({
        type: "shoppingCart/addToCart",
        payload: {
          id,
          size,
        },
      });
    };
    const minusOne = (id, size) => {
      dispatch({
        type: "shoppingCart/minusOne",
        payload: {
          id,
          size,
        },
      });
    };
    const removeProduct = (id, size, goods_number) => {
      dispatch({
        type: "shoppingCart/removeProduct",
        payload: {
          id,
          size,
          goods_number,
        },
      });
    };
    return (
      <div>
        <div>
          <List
            itemLayout="horizontal"
            pagination={{ defaultPageSize: "5" }}
            dataSource={products}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button.Group>
                    <Button
                      style={{ marginRight: 10, verticalAlign: 'middle',width:24 }}
                      size="small"
                      onClick={() => minusOne(item.id, item.size)}
                      type="primary"
                      disabled={item.goods_number === 1}
                    >
                      -
                    </Button>
                    <Button
                      style={{ marginRight: 10, verticalAlign: 'middle',width:25 }}
                      size="small"
                      onClick={() => addToCart(item.id, item.size)}
                      type="primary"
                    >
                      +
                    </Button>
                    <Button
                      style={{ verticalAlign: 'middle'}}
                      size="small"
                      onClick={() => removeProduct(item.id, item.size, item.goods_number)
                      }
                      type="danger"
                    >
                      X
                    </Button>
                  </Button.Group>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      style={{ height: 80 }}
                      src={"./assets/products_img/" + item.sku + "_2.jpg"}
                      alt={item.title + "_2.jpg"}
                    />
                  }
                  title={item.title}
                  description={
                    item.size + '|$'+
                    item.price.toFixed(2)
                  }
                />
                <div>Num: {item.goods_number}</div>
              </List.Item>
            )}
          />
        </div>
        <div>
          <h3 style={{ textAlign: "center" }}>Subtotal:${subtotal}</h3>
          <Button
            onClick={checkOut}
            disabled={subtotal <= 0.0 || checkingOut}
            size="large"
            block
          >
            {checkingOut ? (
              <div>CHECKOUT...</div>
            ) : (
              <div>CHECKOUT</div>
            )}
          </Button>
        </div>
      </div >
    );
  }
}
