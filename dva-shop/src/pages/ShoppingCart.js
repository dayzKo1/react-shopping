import React from "react";
import { connect } from "dva";
import { Button, List } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import {
  message
} from "antd";
const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/font_2677016_exz15j3jnxg.js",
  ],
});
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
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "shoppingCart/getCart",
    });
  }
  checkOut = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "shoppingCart/checkout",
    });
    message.success("结算成功");
  };
  addToCart = (id, size) => {
    const { dispatch } = this.props;
    dispatch({
      type: "shoppingCart/addToCart",
      payload: {
        id: id,
        size: size
      },
    });
  };
  minusOne = (id, size) => {
    const { dispatch } = this.props;
    dispatch({
      type: "shoppingCart/minusOne",
      payload: {
        id,
        size,
      },
    });
  };
  removeProduct = (id, size, goods_number) => {
    const { dispatch } = this.props;
    dispatch({
      type: "shoppingCart/removeProduct",
      payload: {
        id,
        size,
        goods_number,
      },
    });
  };
  render() {
    const { products, subtotal, checkingOut

    } = this.props;

    return (
      <div>
        <div>
          <List
            itemLayout="horizontal"
            pagination={{ defaultPageSize: "4" }}
            dataSource={products}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button.Group style={{ marginTop: 115 }}>
                    <Button
                      style={{ marginRight: 10, verticalAlign: 'middle' }}
                      size="small"
                      onClick={() => this.minusOne(item.id, item.size)}
                      type="primary"
                      disabled={item.goods_number === 1}
                    >
                      <IconFont style={{ fontSize: 10, color: 'black' }} type="icon-jiajianchengchu-1" />
                    </Button>
                    <Button
                      style={{ marginRight: 10, verticalAlign: 'middle' }}
                      size="small"
                      onClick={() => this.addToCart(item.id, item.size)}
                      type="primary"
                    >
                      <IconFont style={{ fontSize: 10, color: 'black' }} type="icon-jiajianchengchu-2" />
                    </Button>
                    <Button
                      style={{ verticalAlign: 'middle' }}
                      size="small"
                      onClick={() => this.removeProduct(item.id, item.size, item.goods_number)
                      }
                      type="danger"
                    >
                      <IconFont style={{ fontSize: 10, color: 'black' }} type="icon-jiajianchengchu-3" />
                    </Button>
                  </Button.Group>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      style={{ height: 140, backgroundColor: "#f8f8f8", padding: 1 }}
                      src={"./assets/products_img/" + item.sku + "_2.jpg"}
                      alt={item.title + "_2.jpg"}
                    />
                  }
                  title={<div style={{ fontSize: 15 }}>{item.title}</div>}
                  description=
                  {
                    <div style={{ fontSize: 17 }}>

                      {item.size + '|$' +
                        item.price.toFixed(2)
                      }

                      <div>
                        NUM:<span style={{ color: 'red', fontWeight: 600 }}>{
                          item.goods_number}</span>
                      </div>

                    </div>

                  }
                />

                {/* <div style={{ marginTop: 50 }}>Num: {}</div> */}

              </List.Item>
            )}
          />
        </div>
        <div>
          <h3 style={{ textAlign: "center" }}>Subtotal:${subtotal}</h3>
          <Button
            onClick={this.checkOut}
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
