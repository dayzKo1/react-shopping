import React from "react";
import { connect } from "dva";
import ProductsList from "../pages/ProductsList";
import ShoppingCart from "../pages/ShoppingCart";
import { Layout, Button, Drawer, Badge, Row, Col, BackTop } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/font_2677016_exz15j3jnxg.js",
  ],
});
@connect(({ shoppingCart }) => ({
  total_goods_number: shoppingCart.total_goods_number,
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
      type: "shoppingCart/getCart",
    });
  }
  render() {
    const { total_goods_number } = this.props;
    return (
      <div>
        <Layout>

          <Header>
            <Row style={{ textAlign: 'center' }}>
              <Col span={8}>
                <IconFont style={{ fontSize: 50, verticalAlign: 'middle' }} type="icon-store" />
              </Col>
              <Col span={8} style={{ color: 'white', fontWeight: 600, fontSize: 20,fontFamily: "Arial"  }}>
                D.V.A
              </Col>
              <Col span={8}>
                <Badge count={total_goods_number} showZero>
                  <Button size="large" onClick={this.showDrawer} shape="round">
                    <IconFont style={{ color: 'red', fontSize: 30, verticalAlign: 'middle' }} type="icon-shoppingcart" />
                  </Button>
                </Badge>
              </Col>
            </Row>
          </Header>

          <Content>
            <ProductsList />
          </Content>

          <BackTop>
            <IconFont style={{ fontSize: 40 }} type="icon-dingbu" />
          </BackTop>

          <Footer
            style={{ textAlign: "center", fontWeight: 200, fontSize: 30, backgroundColor: '#001529' }}
          >
            <span style={{ color: 'white' }}>
              &copy;Shop By Dva
            </span>
          </Footer>
        </Layout>

        <Drawer
          title="DVA购物车"
          width="390"
          onClose={this.closeDrawer}
          visible={this.state.visible}
        >
          <ShoppingCart />
        </Drawer>
      </div>
    );
  }
}
