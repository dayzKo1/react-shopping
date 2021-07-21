import serviceShop from "../services/serviceShop";
import {
  message
} from "antd";
const initialState = {
  cart_total_goods: [], //购物车全部商品
  cart_good_number: {}, //购物车每件商品数量
  total_goods_number: 0, //购物车商品总量
  productsTotal: []
};
const shoppingCart = {
  namespace: "shoppingCart",
  state: initialState,
  effects: {
    //结算
    * checkout(action, {
      call,
      put,
      select
    }) {
      const {
        shoppingCart
      } = yield select();
      const res = yield call(serviceShop.buyProducts, shoppingCart); //调用services中的buyProducts方法
      yield put({
        type: "checkoutCompleted",
        payload: res,
      });
      message.success("结算成功", [2]);
      localStorage.clear();
    },
    //购物车数据
    * getCart(action, {
      call,
      put
    }) {
      const res = yield call(serviceShop.getProducts);
      const cart_total_goods = localStorage.getItem("Cart_Total_Goods");
      const cart_good_number = localStorage.getItem("Cart_Good_Number");
      const total_goods_number = localStorage.getItem("Total_Goods_Number");
      if (cart_total_goods) {
        yield put({
          type: "save",
          payload: res.data.products,
          cart_total_goods: JSON.parse(cart_total_goods),
          cart_good_number: JSON.parse(cart_good_number),
          total_goods_number: JSON.parse(total_goods_number),
        })
      } else {
        yield put({
          type: "save",
          cart_total_goods: [],
        })
      }
    },
    //增加商品
    * addToCart({
      payload
    }, {
      select,
      call,
      put
    }) {
      const res = yield call(serviceShop.getProducts);
      const id = payload.id;
      const size = payload.size;
      const {
        shoppingCart
      } = yield select();
      const cart_total_goods =
        shoppingCart.cart_total_goods.findIndex((v) => {
          return v.id === id && v.size === size;
        }) === -1 ? [...shoppingCart.cart_total_goods, {
          id,
          size
        }] : [...shoppingCart.cart_total_goods];
      const cart_good_number = {
        ...shoppingCart.cart_good_number,
        [id + size]: (shoppingCart.cart_good_number[id + size] || 0) + 1,
      };
      const total_goods_number = shoppingCart.total_goods_number + 1;
      const json_cart_total_goods = JSON.stringify(cart_total_goods);
      const json_cart_good_number = JSON.stringify(cart_good_number);
      localStorage.setItem("Cart_Total_Goods", json_cart_total_goods);
      localStorage.setItem("Cart_Good_Number", json_cart_good_number);
      localStorage.setItem("Total_Goods_Number", total_goods_number);
      yield put({
        type: "save",
        payload: res.data.products,
        cart_total_goods: cart_total_goods,
        cart_good_number: cart_good_number,
        total_goods_number: total_goods_number,
      })
    },
    //减少商品
    * minusOne({
      payload
    }, {
      select,
      call,
      put
    }) {
      const res = yield call(serviceShop.getProducts);
      const id = payload.id;
      const size = payload.size;
      const {
        shoppingCart
      } = yield select();
      const cart_good_number = {
        ...shoppingCart.cart_good_number,
        [id + size]: shoppingCart.cart_good_number[id + size] - 1,
      };
      const total_goods_number = shoppingCart.total_goods_number - 1;
      const json_cart_good_number = JSON.stringify(cart_good_number);
      localStorage.setItem("Cart_Good_Number", json_cart_good_number);
      localStorage.setItem("Total_Goods_Number", total_goods_number);
      yield put({
        type: "save",
        payload: res.data.products,
        cart_total_goods: shoppingCart.cart_total_goods,
        cart_good_number: cart_good_number,
        total_goods_number: total_goods_number,
      })
    },
    //删除商品
    * removeProduct({
      payload
    }, {
      select,
      call,
      put
    }) {
      const res = yield call(serviceShop.getProducts);
      const id = payload.id;
      const size = payload.size;
      const goods_number = payload.goods_number;
      const {
        shoppingCart
      } = yield select();
      shoppingCart.cart_total_goods.splice(
        shoppingCart.cart_total_goods.findIndex((v) => {
          return v.id === id && v.size === size;
        }),
        1
      );
      const cart_good_number = {
        ...shoppingCart.cart_good_number,
        [id + size]: 0,
      };
      const total_goods_number = shoppingCart.total_goods_number - goods_number;
      const json_cart_total_goods = JSON.stringify(shoppingCart.cart_total_goods);
      const json_cart_good_number = JSON.stringify(cart_good_number);
      localStorage.setItem("Cart_Total_Goods", json_cart_total_goods);
      localStorage.setItem("Cart_Good_Number", json_cart_good_number);
      localStorage.setItem("Total_Goods_Number", total_goods_number);
      yield put({
        type: "save",
        payload: res.data.products,
        cart_total_goods: shoppingCart.cart_total_goods,
        cart_good_number: cart_good_number,
        total_goods_number: total_goods_number,
      })
    }
  },
  reducers: {
    //保存信息
    save: (state, {
      payload,
      cart_total_goods,
      cart_good_number,
      total_goods_number,
    }) => {
      return {
        ...state,
        productsTotal: payload,
        cart_total_goods: cart_total_goods,
        cart_good_number: cart_good_number,
        total_goods_number: total_goods_number
      };
    },
    checkoutCompleted: () => initialState,
  },
};
export default shoppingCart;
