import * as api from '../services'
export default {

    namespace: 'product',

    state: {
        products: [],
        initData: [],
        filtedData: []
    },
    
    effects: {
        *initProduct({ payload }, { call, put }) {
            const res = yield call(api.getProducts, payload);
            const data = res.data.products
            if (data) {
                yield put({
                    type: 'updateProduct',
                    data: data
                    // products
                });
                yield put({
                    type: 'initData',
                    data: data
                })
            }
        },
    },

    reducers: {
        updateProduct(state, payload) {
            return { ...state, products: payload.data };
        },
        //尺码
        filtData(state, { payload: { key } }) {
            const data = state.initData
            const size = key.key;
            let newList = []
            if (size === 'ALL') {
                newList = data
            }
            if (size && data) {
                data.forEach(item => {
                    if (item.availableSizes.indexOf(size) !== -1) {
                        newList.push(item)
                    }
                })
            }
            return {
                ...state,
                products: newList,
                filtedData: newList
            }
        },
        //价格
        sortData(state, { payload: { key } }) {
            const data = state.filtedData

            let sortList = []
            if (key === '1' && data) {
                sortList = data.sort((a, b) => (a.id - b.id))
            }
            if (key === '2' && data) {
                sortList = data.sort((a, b) => (a.price - b.price))
            }
            if (key === '3' && data) {
                sortList = data.sort((a, b) => (b.price - a.price))
            }
            console.log("排序的", sortList)
            return {
                ...state,
                products: [...sortList],
            }
        },
        initData(state, payload) {
            return {
                ...state,
                initData: payload.data,
                filtedData: payload.data
            }
        },

    },


};

  // function deepClone(arr){
  //   let _obj = JSON.stringify(arr),
  //     objClone = JSON.parse(_obj);
  //   return objClone; 
  // }