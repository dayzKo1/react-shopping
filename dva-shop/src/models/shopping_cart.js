import service_shop from "../services/service_shop";
import { message } from "antd";

const initialState = {
  cart_total_goods: [], //购物车商品
  //购物车内每件商品的数量
  cart_good_number: {},
  total_goods_number: 0, //购物车内商品总量
};

const shopping_cart = {
  namespace: "shopping_cart",
  state: initialState,
  effects: {
    *checkout(action, { call, put, select }) {
      const { shopping_cart } = yield select();
      const res = yield call(service_shop.buyProducts, shopping_cart);
      yield put({
        type: "checkoutCompleted",
        payload: res,
      });
      message.success("结算成功", [2]);
      localStorage.clear();
    },
  },
  reducers: {
    //localStorage存储数据
    getCart: (state, { payload }) => {
      const cart_total_goods = localStorage.getItem("Cart_Total_Goods");
      const cart_good_number = localStorage.getItem("Cart_Good_Number");
      const total_goods_number = localStorage.getItem("Total_Goods_Number");
      if (cart_total_goods) {
        return {
          ...state,
          cart_total_goods: JSON.parse(cart_total_goods),
          cart_good_number: JSON.parse(cart_good_number),
          total_goods_number: JSON.parse(total_goods_number),
        };
      }
      return {
        ...state,
        cart_total_goods: [],
      };
    },
    //添加商品
    addToCart: (state, { payload: { id, size } }) => {
      message.success("添加物品成功", [2]);
      const cart_total_goods =
        state.cart_total_goods.findIndex((v) => {
          return v.id === id && v.size === size;
        }) === -1
          ? [...state.cart_total_goods, { id, size }]
          : [...state.cart_total_goods];
      const cart_good_number = {
        ...state.cart_good_number,
        [id + size]: (state.cart_good_number[id + size] || 0) + 1,
      };
      // const total_goods_number = Math.round(state.total_goods_number) + 1;
      const total_goods_number = state.total_goods_number + 1;
      const json_cart_total_goods = JSON.stringify(cart_total_goods);
      const json_cart_good_number = JSON.stringify(cart_good_number);
      localStorage.setItem("Cart_Total_Goods", json_cart_total_goods);
      localStorage.setItem("Cart_Good_Number", json_cart_good_number);
      localStorage.setItem("Total_Goods_Number", total_goods_number);
      return {
        ...state,
        cart_total_goods,
        cart_good_number,
        total_goods_number,
      };
    },
    //商品数量减一
    minusOne: (state, { payload: { id, size } }) => {
      message.success("成功减少该商品购买数量", [2]);
      const cart_good_number = {
        ...state.cart_good_number,
        [id + size]: state.cart_good_number[id + size] - 1,
      };
      const total_goods_number = state.total_goods_number - 1;
      const json_cart_good_number = JSON.stringify(cart_good_number);
      localStorage.setItem("Cart_Good_Number", json_cart_good_number);
      localStorage.setItem("Total_Goods_Number", total_goods_number);
      return {
        ...state,
        cart_good_number,
        total_goods_number,
      };
    },
    //移除商品
    removeProduct: (state, { payload: { id, size, goods_number } }) => {
      state.cart_total_goods.splice(
        state.cart_total_goods.findIndex((v) => {
          return v.id === id && v.size === size;
        }),
        1
      );
      message.success("移除物品成功", [2]);
      const cart_good_number = {
        ...state.cart_good_number,
        [id + size]: 0,
      };
      const total_goods_number = state.total_goods_number - goods_number;
      const json_cart_total_goods = JSON.stringify(state.cart_total_goods);
      const json_cart_good_number = JSON.stringify(cart_good_number);
      localStorage.setItem("Cart_Total_Goods", json_cart_total_goods);
      localStorage.setItem("Cart_Good_Number", json_cart_good_number);
      localStorage.setItem("Total_Goods_Number", total_goods_number);
      return {
        ...state,
        cart_good_number,
        total_goods_number,
      };
    },
    checkoutCompleted: () => initialState,
  },
};
export default shopping_cart;
