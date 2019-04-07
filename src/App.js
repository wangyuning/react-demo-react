import React, { Component } from 'react';
import  Header from './common/header';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail';
import  { GlobalStyle } from './style.js';
import { GlobalStyleIcon } from './statics/icon-font/iconfont';


class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <GlobalStyle />
            <GlobalStyleIcon />
            <Header />
            <BrowserRouter>
                <div>
                    <Route path='/' exact component={Home}></Route>
                    <Route path='/detail' exact component={Detail}></Route>
                </div>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
