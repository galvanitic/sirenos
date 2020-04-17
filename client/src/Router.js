import React from 'react';
import { Switch, Route, Redirect } from "react-router";
import cookie from 'cookie';
import Landing from './containers/Landing';
import Hi from './containers/Hi';
import Tracker from './containers/Tracker';



const Router = (props) => {
  const cookies = cookie.parse(document.cookie);
  const checkAuth = () => {
    if ( cookies["lang_id"] >= 0 || props.language !== null) {
      return true;
    }else {
      return false;
    }
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
  return(
    <Switch>
      <Route exact path='/' component={Landing} />
      <ProtectedRoute path='/hi' component={Hi} />
      <ProtectedRoute path='/track' component={Tracker} />
    </Switch>
  )
}

export default Router;