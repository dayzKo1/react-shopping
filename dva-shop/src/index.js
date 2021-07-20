import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import products from './models/products';
import shopping_cart from './models/shopping_cart'
const app = dva();// 1. Initialize（通过函数生成一个 app 对象
app.use(createLoading());// 2. Plugins（加载插件
app.model(products);// 3. Model（注入 model
app.model(shopping_cart)
app.router(require('./router').default);// 4. Router添加路由
app.start('#root');// 5. Start启动
//使用 React 解决 view 层
//redux 管理 model
//saga 解决异步
//loading监听异步
