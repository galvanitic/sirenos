import React from 'react';
import './css/App.css';
import './css/lang-roll.css';
import './css/main.css';
import Router from './Router';
import NavBar from './containers/NavBar';
import Footer from './components/Footer';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store'


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <NavBar />
        <Router />
        <Footer />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
