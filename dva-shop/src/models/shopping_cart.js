import service_shop from "../services/service_shop";
import { message } from "antd";
const initialState = {
  cart_total_goods: [],  //购物车全部商品
  cart_good_number: {},  //购物车每件商品数量
  total_goods_number: 0, //购物车商品总量
};
const shopping_cart = {
  namespace: "shopping_cart",
  state: initialState,
  effects: {
    //结算操作
    * checkout(action, {
      call,
      put,
      select
    }) {
      const {
        shopping_cart
      } = yield select(); //获取当前购物车数据
      const res = yield call(service_shop.buyProducts, shopping_cart); //调用services中的buyProducts方法
      yield put({
        type: "checkoutCompleted",
        payload: res,
      });
      message.success("结算成功", [2]);
      localStorage.clear();//清空缓存
    },
  },
  reducers: {
    //初始化购物车：从localStorage中获取购物车当前数据, 使用JSON.parse序列化数据
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
    //添加商品：从localstorage中读取数据,使用JSON.stringify反序列化数据，实现刷新保持
    addToCart: (state, { payload: { id, size } }) => {
      message.success("添加成功", [2]);
      const cart_total_goods =
        state.cart_total_goods.findIndex((v) => {
          return v.id === id && v.size === size;
        }) === -1 ?
        [...state.cart_total_goods, {
          id,
          size
        }] :
        [...state.cart_total_goods];
      const cart_good_number = {
        ...state.cart_good_number,
        [id + size]: (state.cart_good_number[id + size] || 0) + 1,
      };
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
    minusOne: (state, {
      payload: {
        id,
        size
      }
    }) => {
      //message.success("减少成功", [2]);
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
    removeProduct: (state, {
      payload: {
        id,
        size,
        goods_number
      }
    }) => {
      state.cart_total_goods.splice(
        state.cart_total_goods.findIndex((v) => {
          return v.id === id && v.size === size;
        }),
        1
      );
      //message.success("移除成功", [2]);
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
