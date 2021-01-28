// Notification Component
// Anh Nguyen
// Create bell notification


import React, { useState, useRef, useEffect } from 'react'
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
// Import mock notification
import notification from '../../data/notification'

// Import utils
import changeDateFormat from '../../utils/changeDateFormat'

// Import hooks
import useOuterClick from '../../utils/customHooks/useOuterClick'


export default function Notification() {

    
    const [isEmpty, setisEmpty] = useState(false); //Check notification empty
    const [isHidden, setisHidden] = useState(true) // Toggle Noti
    const [noti, setNoti] = useState([...notification]);

    const notiRef = useOuterClick(e => {
        // Close notifiction when click outside
        setisHidden(!isHidden);
      });

    //render date time 
    const renderDateTime = (date) => {
        const [getDate, getTime] = changeDateFormat(date);
        return(
            <p className="noti__times position-absolute text-primary pr-3 pb-2">{getDate} {getTime}</p>
        )
    }

    // Render notification content
    const renderNotification = () => {
       if(!isEmpty) {return (
            <div ref={notiRef} className="bell__content">
            <Card>
                <Card.Header> <a href="#" onClick={handleClearAllNoti}>Clear All</a> </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        {noti.map((item, index) => (
                        <ListGroup.Item key={index} >
                            <div className="noti__message">
                            <p>{item.message}</p>
                            <p>Khách hàng: {item.client} - {item.clientPhone}</p>
                            <p>Tasker hủy: {item.tasker} - {item.taskerPhone}</p>
                            </div>
                            {isEmpty ? "" : <FontAwesomeIcon icon={faTimesCircle} style={{opacity: 0.5}} onClick={()=>handleDeleteNoti(index)}/>}
                            {renderDateTime(item.createAt)}
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
            </div>)}

        else{
            return (
                <div ref={notiRef} className="bell__content">
                <Card>
                    <Card.Header> <a href="#" onClick={handleClearAllNoti}>Clear All</a> </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="pb-3">
                                <div className="noti__message">
                                <p>{noti[0]}</p>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
                </div>)
        }
    }

    // Handling toggle event
    const toggleNoti = () => {
        setisHidden(!isHidden);
    }

    // Handling clear all noti
    const handleClearAllNoti = () => {
        setNoti(["No more notification"]);
        setisEmpty(true);
    }

    // Handling delete notification
    const handleDeleteNoti = (index) => {
        let notiList = [...noti];
        
        // Delete selected noti
        if(index !== -1){
            notiList.splice(index,1);
            setNoti([...notiList]);
        }

        // No noti left
        if(notiList.length === 0){
            handleClearAllNoti();
        }
    }

    return (
        <div className="bell nav-link-icon">
            <FontAwesomeIcon icon={faBell} onClick={toggleNoti}/>
            {isEmpty ? "" : <span className="notification"></span>}
            <p className="d-none">Notification</p>
            {isHidden ? "" : 
            renderNotification()
            }
        </div>
    )
}
