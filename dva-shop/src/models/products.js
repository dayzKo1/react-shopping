import service_shop from "../services/service_shop";

const products = {
  namespace: "products",
  state: {
    productsTotal: [], //全部商品
    result: [], //存放尺寸筛选后的结果
    now_size: "none", //尺寸默认none
    now_sort: "default", //排序默认default
  },
  effects: {
    //初始化数据
    * query(action, {
      call,
      put,
    }) {
      const res = yield call(service_shop.getProducts);
      yield put({
        type: "getAllProducts",
        payload: res.data.products,//state:productsTotal[]
      });
      yield put({
        type: "getProducts",
        payload: res.data.products,//state:result[]
      })
      //console.log("initdata", res.data.products)
    },
    //更新数据
    * sort({
      payload
    }, {
      put,
      select
    }) {
      //改变尺寸、排序状态
      yield put({
        type: "changeSort",
        payload: payload.sort,//state:now_sort
      })
      yield put({
        type: "changeSize",
        payload: payload.size,//state:now_size
      })
      //console.log(payload)
      //获取全部商品
      const {
        products
      } = yield select();
      //根据当前排序方式进行排序
      let newResultSorted = [];
      if (payload.sort === "upper") {
        newResultSorted = products.productsTotal.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (payload.sort === "lower") {
        newResultSorted = products.productsTotal.sort((a, b) => {
          return b.price - a.price;
        });
      } else {
        newResultSorted = deepClone(products.productsTotal)
      }
      //console.log("sorted:", newResultSorted)
      //根据当前尺寸进行筛选
      let newResultSized = []
      if (products.now_size !== "none") {
        newResultSorted.forEach(item => {
          if (item.availableSizes.indexOf(payload.size) !== -1) {
            newResultSized.push(item)
          }
        })
      } else {
        newResultSized = deepClone(newResultSorted)
      }
      //console.log("sized:", newResultSized)
      //将筛选结果传给result
      yield put({
        type: "getProducts",
        payload: newResultSized
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
    changeSize: (state, { payload }) => {
      return {
        ...state,
        now_size: payload,
      };
    },
    changeSort: (state, { payload }) => {
      return {
        ...state,
        now_sort: payload,
      };
    },
  },
};
export default products;

function deepClone(arr) {
  let _obj = JSON.stringify(arr),
    objClone = JSON.parse(_obj);
  return objClone;
}
