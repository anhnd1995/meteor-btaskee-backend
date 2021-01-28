import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import  App  from '../imports/ui/App';
import { BrowserRouter } from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all.js'

import "jquery/dist/jquery.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

// import "../public/fonts/all.min.css";
import "../imports/ui/stylesheet/plugins/nucleo/css/nucleo.css";


Meteor.startup(() => {
  render(<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>, document.getElementById('react-target'));
});
