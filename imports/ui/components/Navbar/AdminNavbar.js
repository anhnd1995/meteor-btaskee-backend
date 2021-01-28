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
import React, {useState} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

// import avatar from "../../assets/img/theme/team-4-800x800.jpg"
import Notification from "../Notification/Notification";

function AdminNavbar() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const ToggleSidebar = () => {
    const sidebar = document.getElementById('sidenav-main');
    const sidebarIcon = document.querySelector('.sidebar-icon');
    const mainContent = document.querySelector('.main-content');
    if(!isSidebarOpen){
      sidebar.style.transform = "translateX(-100%)";
      mainContent.style.marginLeft = "0";
      sidebarIcon.style.transform = "rotate(180deg)";
    } else {
      sidebar.style.transform = "translateX(0)";
      mainContent.style.marginLeft = "250px";
      sidebarIcon.style.transform = "rotate(0)";
    }
    setIsSidebarOpen(!isSidebarOpen);
  }
  const avatar = "/img/theme/team-4-800x800.jpg";

  return (
    <>
      <Navbar className="navbar-top navbar-dark bg-white text-black" expand="md" id="navbar-main">
        <Container fluid>
          <i className="sidebar-icon" onClick={ToggleSidebar}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 901.000000 721.000000"
              preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,721.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                <path d="M4351 6904 c-135 -36 -267 -147 -331 -278 -155 -313 13 -684 347
-771 86 -23 3390 -23 3476 0 151 39 284 148 351 287 103 215 58 470 -112 629
-77 73 -143 112 -227 134 -87 22 -3420 22 -3504 -1z"/>
                <path d="M2295 5849 c-114 -14 -254 -84 -321 -161 -17 -20 -278 -404 -579
-854 -637 -953 -628 -936 -627 -1129 1 -179 -3 -173 639 -1136 582 -872 584
-875 703 -938 88 -47 170 -64 285 -59 115 5 189 28 274 84 165 110 249 280
238 484 -7 150 -21 177 -320 625 l-267 400 2757 5 c2528 5 2761 6 2799 21 152
62 257 155 317 279 147 310 -3 656 -333 767 -53 17 -162 18 -2792 21 -1506 1
-2738 4 -2738 6 0 2 119 181 263 398 160 238 273 417 287 453 28 75 39 239 20
324 -59 270 -320 447 -605 410z"/>
                <path d="M4395 1580 c-263 -53 -450 -296 -432 -565 12 -189 111 -350 272 -440
123 -69 -1 -65 1870 -65 1487 0 1698 2 1750 15 198 52 357 234 387 443 42 288
-148 561 -426 611 -71 13 -3357 14 -3421 1z"/>
              </g>
            </svg>
          </i>

          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
          </Link>

          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={avatar}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-md font-weight-bold text-gray" >
                      Jessica Jones
                      </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0 text-primary">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Account</span>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Notification />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}


export default AdminNavbar;
