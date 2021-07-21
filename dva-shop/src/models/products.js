import serviceShop from "../services/serviceShop";

const products = {
  namespace: "products",
  state: {
    data: [],
    size: "",
    sort: "",
  },
  effects: {
    //初始化数据
    * query(action, {
      call,
      put,
    }) {
      // 获取数据
      const res = yield call(serviceShop.getProducts);
      // 处理数据
      const data = res.data.products;
      // 保存数据
      yield put({
        type: "save",
        payload: data, //state:data[]
      })
    },
    //更新数据
    * sort({
      payload
    }, {
      call,
      put,
      select
    }) {
      //console.log(payload)
      // 获取数据
      const res = yield call(serviceShop.getProducts);
      // 处理数据
      const sort = payload.sort;
      let size = payload.size;
      const newData = res.data.products;
      let newResultSorted = []; //排序
      if (sort === "upper") {
        newResultSorted = newData.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (sort === "lower") {
        newResultSorted = newData.sort((a, b) => {
          return b.price - a.price;
        });
      } else {
        newResultSorted = deepClone(newData)
      }
      let newResultSized = []; //尺寸筛选
      const {
        products
      } = yield select();
      if (size === products.size) { //重复选择相同尺寸时，取消选择，显示全部
        size = "undefined";
        newResultSized = deepClone(newResultSorted)
      } else if (typeof (size) !== "undefined") {
        newResultSorted.forEach(item => {
          if (item.availableSizes.indexOf(payload.size) !== -1) {
            newResultSized.push(item)
          }
        })
      } else {
        newResultSized = deepClone(newResultSorted)
      }
      //保存数据
      yield put({
        type: "save",
        payload: newResultSized, //state:data[]
        size: size,
        sort: sort,
      })
    }
  },
  reducers: {
    save: (state, {
      payload,
      size,
      sort
    }) => {
      return {
        ...state,
        data: payload,
        size: size,
        sort: sort,
      };
    },
    changeSize: (state, {
      payload
    }) => {
      return {
        ...state,
        size: payload,
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
