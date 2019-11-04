import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import {hot} from 'react-hot-loader';
import GlobalStyles from "./components/GlobalStyles";
import Layout from "./hoc/Layout/Layout";
import Menu from "./pages/Menu/Menu";
import Restaurant from "./pages/Restaurant/Restaurant";
import Order from "./pages/Order/Order";
import PaymentCompleted from './pages/PaymentCompleted/PaymentCompleted';
import CssBaseline from "@material-ui/core/CssBaseline";
import {SnackbarProvider} from 'notistack';

/// stores
import RootStore from "./stores/RootStore";
import { Provider } from "mobx-react";
import { BrowserRouter } from "react-router-dom";

const env = process.env.NODE_ENV;

class App extends Component {
  render() {

    return (
      <Provider {...RootStore}>
        <BrowserRouter>
          <CssBaseline />
          <GlobalStyles />
          <Layout>
          <SnackbarProvider autoHideDuration={2000}>
            <Switch>
              <Route path="/" exact component={Menu}></Route>
              <Route path="/restaurant" component={Restaurant}></Route>
              <Route path="/order" component={Order}></Route>
              <Route path="/paymentcompleted"  component={PaymentCompleted}></Route>
            </Switch>
            </SnackbarProvider>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default (env === 'development' ? hot(module)(App) : App);;
