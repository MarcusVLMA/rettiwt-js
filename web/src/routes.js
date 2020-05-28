import React from 'react';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import { isAuthenticated } from './utils';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route 
        {...rest}
        render={props => isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )}
    />
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <PrivateRoute path='/home' component={Home} />
        </Switch>
    </BrowserRouter>
)

export default Routes;