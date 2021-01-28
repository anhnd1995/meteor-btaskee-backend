/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "../views/Index.js";
import Profile from "../views/examples/Profile.js";
import Maps from "../views/examples/Maps.js";
import Register from "../views/examples/Register.js";
import Login from "../views/examples/Login.js";
import Tables from "../views/examples/Tables.js";
import Icons from "../views/examples/Icons.js";

import {
  faTasks,
  faUserMinus,
  faUserCog,
  faInfoCircle,
  faChartBar,
  faCommentDollar,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

var routes = [
  {
    path: "/index",
    name: "Task",
    icon: faTasks,
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Asker",
    icon: faUserMinus,
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/bTasker",
    name: "bTasker",
    icon: faUserCog,
    component: Tables,
    layout: "/admin",
    submenu: [
      {
        path: "/bTasker/bTasker",
        name: "bTasker",
        component: Tables,
        layout: "/admin",
      },

      {
        path: "/bTasker/report",
        name: "bTasker Report",
        component: Tables,
        layout: "/admin",
      },

      {
        path: "/bTasker/1",
        name: "Blocked Tasker History",
        component: Tables,
        layout: "/admin",
      },

      {
        path: "/bTasker/2",
        name: "Blocked bTasker for Cancelation",
        component: Tables,
        layout: "/admin",
      },

      {
        path: "/bTasker/3",
        name: "Blocked bTasker for Cancelation History",
        component: Tables,
        layout: "/admin",
      },
      {
        path: "/bTasker/4",
        name: "Company List",
        component: Tables,
        layout: "/admin",
      },
      {
        path: "/bTasker/5",
        name: "bTasker Inactive",
        component: Tables,
        layout: "/admin",
      },
      {
        path: "/bTasker/6",
        name: "bTasker Monthly Reward",
        component: Tables,
        layout: "/admin",
      },
      {
        path: "/bTasker/7",
        name: "bTasker Daily Report",
        component: Tables,
        layout: "/admin",
      },
      {
        path: "/bTasker/8",
        name: "bTasker Low Finance",
        component: Tables,
        layout: "/admin",
      },
      {
        path: "/bTasker/9",
        name: "bTasker Register from Website",
        component: Tables,
        layout: "/admin",
      },
      {
        path: "/bTasker/10",
        name: "Referrals bTasker",
        component: Tables,
        layout: "/admin",
      },
      {
        path: "/bTasker/11",
        name: "Low Rated bTasker",
        component: Tables,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/user-profile",
    name: "Service",
    icon: faInfoCircle,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Subcription",
    icon: faChartBar,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Report",
    icon: faCommentDollar,
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Others",
    icon: faEllipsisH,
    component: Register,
    layout: "/auth",
  },
];

export default routes;
