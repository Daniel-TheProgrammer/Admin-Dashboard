import React from 'react';
import './main.css';

import LoginPage from './Containers/LoginPage/LoginPage';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import DashboardPage from './Containers/DashboardPage/DashboardPage';
import ProductPage from './Containers/ProductPage/ProductPage';
import AddProductPage from './Components/ProductPage/ProductBlock/AddProductPage/AddProductPage';
import AccountsPage from './Containers/AccountsPage/AccountsPage';

import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
          <div className="App">
            <Header />
  
              <main>
                <Switch>

                  <Route exact path="/" render={() => (
                    this.props.userLoggedInStatus ?
                    <Redirect to="/dashboard"/>
                    :
                    <Redirect to="/login" />
                  )}/>

                  <Route exact path="/login" render={(props) => (
                    !this.props.userLoggedInStatus ?
                    <LoginPage {...props} />
                    :
                    <Redirect to="/dashboard" />
                  )} />

                  <Route exact path="/dashboard" render={(props) => (
                    this.props.userLoggedInStatus ?
                    <DashboardPage {...props} />
                    :
                    <Redirect to="/login" />
                  )} />

                  <Route exact path="/products" render={(props) => (
                    this.props.userLoggedInStatus ?
                    <ProductPage {...props} />
                    :
                    <Redirect to="/login" />
                  )} />

                  <Route exact path="/products/add" render={(props) => (
                    this.props.userLoggedInStatus ?
                    <AddProductPage {...props} />
                    :
                    <Redirect to="/login" />
                  )} />

                  <Route exact path="/accounts" render={(props) => (
                    this.props.userLoggedInStatus ?
                    <AccountsPage {...props} />
                    :
                    <Redirect to="/login" />
                  )} />

                </Switch>
              </main>
  
            <Footer />
          </div>
      </BrowserRouter>
    );
  }
}

const mapGlobalStateToProps = (globalState) => {
  return {
      userLoggedInStatus: globalState.loggedInStatus
  }
}

export default connect(mapGlobalStateToProps)(App);
