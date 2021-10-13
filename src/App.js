import React from "react";
import 'antd/dist/antd.css';
import {StartPage} from "./components/startPage/StartPage";
import {Redirect, Route, Switch} from "react-router-dom";
import {OrderPage} from "./components/orderPage/OrderPage";

const App = () => {
  return <Switch>
    <Route exact path="/" render={() => <Redirect to="/startPage"/>}/>
    <Route
      path="/startPage"
      render={() =>
        <StartPage/>
      }
    />
    <Route
      path="/orderPage"
      render={() =>
        <OrderPage/>
      }
    />
  </Switch>

}

export default App;
