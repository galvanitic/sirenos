import React from 'react';
import { Switch, Route, Redirect } from "react-router";
import Landing from './containers/Landing';
import cookie from 'cookie';
import Hi from './containers/Hi';
import Tracker from './containers/Tracker';


const checkAuth = () => {
  const cookies = cookie.parse(document.cookie);
  return cookies["lang_id"] ? true : false;
}

const ProtectedRoute = ({component: Component, ...rest}) => {
    return(
    <Route
    {...rest}
    render={(props)=> checkAuth()
        ? <Component {...props} />
        : <Redirect to='/' />
    }
    />
    )
}
const Router = () => {
    return(
      <Switch>
        <Route exact path='/' component={Landing} />
        <ProtectedRoute path='/hi' component={Hi} />
        <ProtectedRoute path='/track' component={Tracker} />
      </Switch>
    )
  }
  
  export default Router;