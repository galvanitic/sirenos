import React from 'react';
import './css/App.css';
import './css/lang-roll.css';
import './css/main.css';
import Router from './containers/Router';
import NavBar from './containers/NavBar';
import Footer from './components/Footer';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store'


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Router />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
