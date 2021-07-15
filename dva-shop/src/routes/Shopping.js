import React from "react";
import { connect } from "dva";
// import ProductsList from "../components/ProductsList";
import ProductsList from "../pages/ProductsList";
import ShoppingCart from "../pages/ShoppingCart";
import { Layout, Button, Drawer, Badge, Row, Col } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js", // icon-shoppingcart, icon-python
  ],
});
@connect(({ shopping_cart }) => ({
  total_goods_number: shopping_cart.total_goods_number,
}))
export default class Shopping extends React.Component {
  state = { visible: false };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  closeDrawer = () => {
    this.setState({
      visible: false,
    });
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "products/query",
    });
    dispatch({
      type: "shopping_cart/getCart",
    });
  }
  render() {
    const { total_goods_number } = this.props;
    return (
      <div>
        <Layout>

          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Row>

              <Col>

                <IconFont type="icon-python" />

              </Col>

              <Col>

              </Col>

              <Col>

              </Col>

              <Col>
                <Badge count={total_goods_number} showZero>
                  <Button size="" onClick={this.showDrawer} shape="">
                    <IconFont type="icon-shoppingcart" />
                  </Button>
                </Badge>
              </Col>

            </Row>
          </Header>

          <Content style={{ marginTop: 80 }}>
            <Row>
              <Col span={20} offset={2}>
                <ProductsList />
              </Col>
            </Row>
          </Content>

          <Footer
            style={{ textAlign: "center", fontWeight: 200, fontSize: 30 }}
          >
            &copy;Shop By Dva
          </Footer>

        </Layout>


        <Drawer
          title="购物车"
          width="600"
          onClose={this.closeDrawer}
          visible={this.state.visible}
        >
          <ShoppingCart />
        </Drawer>

      </div>
    );
  }
}
