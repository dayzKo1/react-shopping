import service_shop from "../services/service_shop";

const products = {
  namespace: "products",
  state: {
    productsTotal: [], //全部商品
    result: [], //存放尺寸筛选后的结果
    now_size: "", //当前尺寸
    now_sort: "default", //排序默认default
  },
  effects: {
    * query(action, {
      call,
      put,
    }) {
      const res = yield call(service_shop.getProducts);
      yield put({
        type: "getAllProducts",
        payload: res.data.products,
      });
      yield put({
        type: "getProducts",
        payload: res.data.products
      })
      //console.log(res.data.products)
    },
    * sort({
      payload
    }, {
      put,
      select
    }) {
      yield put({
        type: "changeSort",
        payload: payload.sort
      })
      yield put({
        type: "changeSize",
        payload: payload.size,
      })
      const {
        products
      } = yield select();
      if (payload.sort === "upper") {
        products.result = products.result.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (payload.sort === "lower") {
        products.result = products.result.sort((a, b) => {
          return b.price - a.price;
        });
      }
      let newResult = []
      if (products.now_size !== "") {
        products.result.forEach(item => {
          if (item.availableSizes.indexOf(payload.size) !== -1) {
            newResult.push(item)
          }
        })
      }
      //console.log(newResult)
      yield put({
        type: "getProducts",
        result: newResult
      })
    }
  },
  reducers: {
    getAllProducts: (state, {
      payload
    }) => {
      return {
        ...state,
        productsTotal: payload,
      };
    },
    getProducts: (state, {
      payload
    }) => {
      return {
        ...state,
        result: payload,
      };
    },
    changeSize: (state, {
      payload
    }) => {
      return {
        ...state,
        now_size: payload,
      };
    },
    changeSort: (state, {
      payload
    }) => {
      return {
        ...state,
        now_sort: payload,
      };
    },
  },
};

export default products;

// function deepClone(arr){
//   let _obj = JSON.stringify(arr),
//     objClone = JSON.parse(_obj);
//   return objClone; 
// }
