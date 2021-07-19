import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from './components/layout/Layout';
import Login from './components/forms/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import RefactoringPage from './components/pages/Refactorings';
import "./components/utils/css/prism.css";
import PrivateRoute from './components/utils/PrivateRoute';


ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Layout} />
          <Route path="/user" component={Layout} />
          <Route path="/login" component={Login} />
          </Switch>
          <PrivateRoute path="/refactorings" component={RefactoringPage} />
      </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
