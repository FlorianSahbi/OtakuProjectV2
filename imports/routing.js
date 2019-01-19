import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import NendoroidListView from './bundles/ListBundle/Views/NendoroidListView';
import NendoroidPage from './bundles/ListBundle/Components/NendoroidPageComponent';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={NendoroidListView} />
            <Route exact path="/information/:nendoroidId" component={NendoroidPage} />
        </Switch>
    </Router>
);