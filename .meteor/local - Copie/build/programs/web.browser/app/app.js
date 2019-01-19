var require = meteorInstall({"client":{"bundles":{"ListBundle":{"Components":{"NendoroidCardComponent.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// client/bundles/ListBundle/Components/NendoroidCardComponent.js          //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
module.export({
  default: () => Nendoroid
});
let React, Component;
module.link("react", {
  default(v) {
    React = v;
  },

  Component(v) {
    Component = v;
  }

}, 0);

class Nendoroid extends Component {
  render() {
    return React.createElement("li", null, this.props.nendoroid.name);
  }

}
/////////////////////////////////////////////////////////////////////////////

}}},"AuthBundle":{"accountsConfig.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// client/bundles/AuthBundle/accountsConfig.js                             //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
let Accounts;
module.link("meteor/accounts-base", {
  Accounts(v) {
    Accounts = v;
  }

}, 0);
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
/////////////////////////////////////////////////////////////////////////////

}}},"routing.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// client/routing.js                                                       //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
module.export({
  renderRoutes: () => renderRoutes
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Router, Route, Switch;
module.link("react-router", {
  Router(v) {
    Router = v;
  },

  Route(v) {
    Route = v;
  },

  Switch(v) {
    Switch = v;
  }

}, 1);
let createBrowserHistory;
module.link("history/createBrowserHistory", {
  default(v) {
    createBrowserHistory = v;
  }

}, 2);
let NendoroidCardComponent;
module.link("./bundles/ListBundle/Components/NendoroidCardComponent.js", {
  default(v) {
    NendoroidCardComponent = v;
  }

}, 3);
const browserHistory = createBrowserHistory();

const renderRoutes = () => React.createElement(Router, {
  history: browserHistory
}, React.createElement(Switch, null, React.createElement(Route, {
  exact: true,
  path: "/",
  component: NendoroidCardComponent
})));
/////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// client/main.js                                                          //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let render;
module.link("react-dom", {
  render(v) {
    render = v;
  }

}, 1);
let renderRoutes;
module.link("./routing.js", {
  renderRoutes(v) {
    renderRoutes = v;
  }

}, 2);
module.link("./bundles/AuthBundle/accountsConfig.js");
Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('NendoApp'));
});
/////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css"
  ]
});

var exports = require("/client/main.js");