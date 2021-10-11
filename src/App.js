import React from "react";
import 'antd/dist/antd.css';
import {StartPage} from "./components/startPage/StartPage";
import {Route, Switch} from "react-router-dom";
import {OrderPage} from "./components/orderPage/OrderPage";

const App = () => {
  return <Switch>
    <Route
      exact
      path="/NeedForDrive"
      render={() =>
        <StartPage/>
      }
    />
    <Route
      exact
      path="/orderPage"
      render={() =>
        <OrderPage/>
      }
    />
  </Switch>
}

export default App;
