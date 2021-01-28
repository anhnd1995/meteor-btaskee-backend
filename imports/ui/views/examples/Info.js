import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CardHeader } from 'reactstrap';
import classnames from 'classnames';
import General from '../../components/bTaskerDetail/General';
import Account from '../../components/bTaskerDetail/Account';

export default function Info() {

    const location = useLocation();
    const history = useHistory();

    // State variables
    const [activeTab, setActiveTab] = useState('1');
    const [userSelected, setUserSelected] = useState(null);

    // Set tab
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    useEffect(() => {
        // console.log(location.pathname); // result: '/secondpage'
        // console.log(location.bTasker); // result: 'some_value'
        setUserSelected(location.bTasker);
    }, [location]);

    return (
        <div className="info__wrapper">
            <Card className="info__wrapper-content">
                <CardHeader className="--mobile-center">
                    <i className="ni ni-bold-left d-inline d-lg-none" onClick={history.goBack}></i>
                    <span>bTasker's Info</span>
                    </CardHeader>
                <div className="nav-container">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            General
          </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Account
          </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >
                            History
          </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { toggle('4'); }}
                        >
                            Waiting Task
          </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '5' })}
                            onClick={() => { toggle('5'); }}
                        >
                            Schedule
          </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '6' })}
                            onClick={() => { toggle('6'); }}
                        >
                            Favorite Askers
          </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '7' })}
                            onClick={() => { toggle('7'); }}
                        >
                            Weekly Report
          </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '8' })}
                            onClick={() => { toggle('8'); }}
                        >
                            Others
          </NavLink>
                    </NavItem>
                </Nav>
                </div>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        {userSelected && <General user={userSelected} />}
                    </TabPane>
                </TabContent>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="2">
                        {userSelected && <Account user={userSelected}/>}
                    </TabPane>
                </TabContent>
            </Card>
        </div>
    )
};
