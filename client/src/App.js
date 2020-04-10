import React from 'react';
import './css/App.css';
import './css/lang-roll.css';
import './css/main.css';
import Router from './Router';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import store from './redux/store'
import { StateProvider } from "./context/store";


function App() {
  return (
    // <Provider store={store}>
    <StateProvider>
      <BrowserRouter>
        <NavBar />
        <Router />
        <Footer />
      </BrowserRouter>
    </StateProvider>
    // </Provider>
  );
}

export default App;
