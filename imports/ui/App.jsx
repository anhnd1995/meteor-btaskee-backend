import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout/Admin";

// import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";


// import "./assets/scss/argon-dashboard-react.scss";

function App() {
  return (
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/index" />
    </Switch>
  );
}

export default App;
