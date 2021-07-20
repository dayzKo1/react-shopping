import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Shop from './routes/Shopping'
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Shop} />
      </Switch>
    </Router>
  );
}
export default RouterConfig;
