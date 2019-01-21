import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import NendoroidListView from './bundles/ListBundle/Views/NendoroidListView';
import NendoroidPage from './bundles/ListBundle/Components/NendoroidPageComponent';
import SignupView from './bundles/AuthBundle/Views/SignupView';
import SigninView from './bundles/AuthBundle/Views/SigninView';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={NendoroidListView} />
            <Route exact path="/product/:nendoroid" component={NendoroidPage} />
            <Route exact path="/signup" component={SignupView} />
            <Route exact path="/signin" component={SigninView} />
        </Switch>
    </Router>
);