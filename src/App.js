import React from "react";
import 'antd/dist/antd.css';
import {StartPage} from "./components/startPage/StartPage";
import {Route, Switch} from "react-router-dom";

const App = () => {
  return <Switch>
    <Route
      exact
      path="/NeedForDrive"
      render={() =>
        <StartPage/>
      }
    />
  </Switch>
}

export default App;
