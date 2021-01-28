import LocationModal from '../bTaskerDetail/Account/LocationModal'
import ServiceModal from '../bTaskerDetail/Account/ServiceModal'
import StatusModal from '../bTaskerDetail/Account/StatusModal'
import React, { useEffect, useState } from 'react'
import useViewport from '../../utils/customHooks/useViewport';

export default function Popup({ type, current = [], option, updateOptionTag }) {

    const { width } = useViewport();
    const breakpoint = 769;
    const [showModal, setShowModal] = useState(false);

    const renderPopupHeader = (type) => {
        switch (type) {
            case "status":
                return <h3 className="modal-title" id="exampleModalLabel">Change Status</h3>

            case "service":
                return <h3 className="modal-title" id="exampleModalLabel">Edit Service</h3>

            case "location":
                return <h3 className="modal-title" id="exampleModalLabel">Edit Work Location</h3>

            default:
                break;
        }
    }

    useEffect(() => {
        renderPopupContent()
    }, [showModal])


    const renderPopupContent = (type, current, option) => {
        switch (type) {
            case "status":
                return <StatusModal option={option} />
            case "service":
                return <ServiceModal current={current} option={option} />
            case "location":
                return <LocationModal current={current} option={option} />
            default:
                break;
        }
    }

    useEffect(() => {
        // $('#myModal').appendTo("body");
        if (width < breakpoint) {
            let modal = document.querySelector(`#${type}`)
            document.body.appendChild(modal);
        }
    }, [])


    const handleSaveSelected = (e) => {
        // updateOptionTag
        let selected = [];
        let selectNewService = [];

        // select new services
        if (document.querySelector(".show .service-modal") !== null) {
            selectNewService = document.querySelectorAll('input[id*="normal"]:checked');
            selectNewService.forEach((item) => {
                let select = item.parentElement.parentElement.parentElement.textContent;
                selected.push(select);
            })
        }

        //select new work locations
        else if (document.querySelector(".show .location-modal") !== null) {
            selectNewService = document.querySelectorAll("label .location_update:checked")
            selectNewService.forEach((item) => {
                let select = item.parentElement.lastChild.textContent;
                selected.push(select);
            })
        }
        // select new status
        else {
            if (document.querySelector("label .status_update:checked") !== null) {
                selectNewService = document.querySelector("label .status_update:checked").parentElement.lastChild.textContent;
                selected.push(selectNewService);
            }
            else {
                return;
            }
        }
        updateOptionTag(selected);
    }

    return (<div className="pop-up">
        {/* Button trigger modal */}
        {width > breakpoint ? <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#${type}`} data-backdrop="false" ></button> : <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#${type}`} onClick={() => { setShowModal(true) }}></button>}
        {/* Modal */}
        <div className="modal fade" id={type} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        {renderPopupHeader(type)}
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {renderPopupContent(type, current, option)}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSaveSelected}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}
