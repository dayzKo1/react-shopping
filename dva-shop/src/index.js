import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import products from './models/products';
import shopping_cart from './models/shopping_cart'

// 1. Initialize（通过函数生成一个 app 对象
const app = dva();

// 2. Plugins（加载插件
// app.use({});
app.use(createLoading());

// 3. Model（注入 model
// app.model(require('./models/example').default);
app.model(products);
app.model(shopping_cart)

// 4. Router添加路由
app.router(require('./router').default);

// 5. Start启动
app.start('#root');

//使用 React 解决 view 层
//redux 管理 model
//saga 解决异步
