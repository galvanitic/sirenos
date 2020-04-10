import React from 'react';
import { Switch, Route, Redirect } from "react-router";
import { connect } from "react-redux";
import cookie from 'cookie';
import Landing from './components/Landing';
import Hi from './components/Hi';
import Tracker from './components/Tracker';


const Router = (props) => {
  const checkAuth = (lang) => {
    // const cookies = cookie.parse(document.cookie);
    // return cookies["lang_id"] ? true : false;
    // debugger
    if ( lang !== null) {
      return true;
    }else {
      return false;
    }
  }
  
  const ProtectedRoute = ({component: Component, ...rest}) => {
      return(
      <Route
      {...rest}
      render={(props)=> checkAuth(props.lang)
          ? <Component {...props} />
          : <Redirect to='/' />
      }
      />
      )
  }
  return(
    <Switch>
      <Route exact path='/' component={Landing} />
      <ProtectedRoute path='/hi' component={Hi} />
      <ProtectedRoute path='/track' component={Tracker} />
    </Switch>
  )
}

export default Router;