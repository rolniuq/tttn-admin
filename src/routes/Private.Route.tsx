import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getTokenLocal } from '../utils/Common';

//@ts-ignore
function PrivateRoute({ component:  Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => getTokenLocal() ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  )
}

export default PrivateRoute;