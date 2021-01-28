import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import Status from '../../Status/Status';
// import edit from '../../assets/img/icons/common/edit.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';
import OptionTag from '../../OptionTag';
import Popup from '../../Popup/Popup';
import TransactionDetail from './TransactionDetail';


export default function Account({ user }) {

    const [availableService, setAvailableService] = useState(["Home Cleaning", "Babysister", "Cooking", "Air-Conditioner Cleaning", "Laundry"]);
    const [service, setService] = useState(["Home Cleaning", "Babysister", "Cooking"]);
    const [homeCity, setHomeCity] = useState("Ho Chi Minh");
    const [district, setDistrict] = useState(["Dist. 02", "Binh Thanh"]);
    const [availableDistrict, setavailableDistrict] = useState(["Dist. 01", "Dist. 02", "Dist. 03", "Dist. 04", "Dist. 05", "Dist. 06", "Dist. 07", "Binh Thanh", "Binh Tan", "Binh Chanh", "Tan Binh", "Tan Phu", "Phu Nhuan", "Go Vap"])
    const [statusOption, setStatusOption] = useState(["Block", "Verify", "In-Probation", "Unverify"])
    const [currentStatus, setCurrentStatus] = useState(user.status)
    const history = useHistory();
    const edit = "../../../../../img/icons/common/edit.svg";
    // Set available status option
    const availableStatus = () => {
   

        let available = ["Block", "Verify", "In-Probation", "Unverify"];
        let status = "";
        switch (currentStatus) {
            case "Unverified":
                status = "Unverify"
                break;
            case "Blocked":
                status = "Block"
                break;
            case "Active":
                status = "Verify";
                break;
            case "Inactive":
                status = "In-Probation";
                break;
            default:
                break;
        }
        let newAvailable = available.filter((item) => item !== status)
        setStatusOption(newAvailable);
    }

    useEffect(() => {
        availableStatus();
    }, [])

    useEffect(() => {
        availableStatus();
    }, [currentStatus])

    const updateServiceTag = (option) => {
        setService(option);
    }

    const updateDistrictTag = (option) => {
        setDistrict(option);
    }

    const updateStatus = (option) => {
        let status = ""
        console.log(option[0] === "Block");
        switch (option[0]) {
            case "Unverify":
                status = "Unverified"
                break;
            case "Block":
                status = "Blocked"
                break;
            case "Verify":
                status = "Active";
                break;
            case "In-Probation":
                status = "Inactive";
                break;
            default:
                break;
        }
        setCurrentStatus(status);
       

    }

    const OptionCard = () => {
        return (
            <Card className="option__card">
                <CardHeader>
                    <h3>bTasker's Option</h3>
                </CardHeader>
                <CardBody>
                    <div className="option__item">
                        <div className="option__item-header">
                            <p>Service</p>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <Popup type="service" current={service} option={availableService} updateOptionTag={updateServiceTag} />
                        </div>
                        <div className="option__item-content tag-wrapper">
                            <OptionTag tag={service} updateOptionTag={updateServiceTag} />
                        </div>
                    </div>
                    <hr />
                    <div className="option__item">
                        <div className="option__item-header">
                            <p>Work Location</p>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <Popup type="location" current={district} option={availableDistrict} updateOptionTag={updateDistrictTag} />
                        </div>
                        <div className="option__item-content tag-wrapper">
                            <h2 className="font-weight-bold text-gray w-100">{homeCity}</h2>
                            <OptionTag tag={district} updateOptionTag={updateDistrictTag} />
                        </div>

                    </div>
                </CardBody>
            </Card>)
    }

    const StatusCard = () => {
        return (
            <Card className="status__card">
                <CardHeader>
                    <h3>Account Status</h3>
                </CardHeader>
                <CardBody>
                    <p>Status</p>
                    <Status status={currentStatus} />
                    <i>
                        <img src={edit} alt="" />
                    </i>
                    <Popup type="status" option={statusOption} updateOptionTag={updateStatus} />
                </CardBody>
            </Card>
        )
    }

    const FinanceCard = () => {
        return (
            <Card className="finance__card">
                <CardHeader>
                    <h3>bTasker's Finance</h3>
                </CardHeader>
                <CardBody>
                    <div className="finance__card-item">
                        <p>Income</p>
                        <b>295,877,000 VND</b>
                    </div>
                    <hr />
                    <div className="finance__card-item">
                        <p>Main Account Balance</p>
                        <b className="text-green">625,000 VND</b>
                    </div>
                    <hr />
                    <div className="finance__card-item">

                        <p>2nd Account Balance</p>
                        <b className="text-yellow">121,000  VND</b>
                    </div>
                </CardBody>
                <CardFooter>
                    {/* <a href="#" >See Transaction History</a> */}
                    <TransactionDetail/>
                </CardFooter>
            </Card>
        )
    }


    return (
        <div className="info__account">
            <div className="info__account-body">
                <OptionCard />
                <StatusCard />
                <FinanceCard />
            </div>
            <div className="info-footer d-none d-sm-flex">
                <div className="status" onClick={history.goBack}>Back to list</div>
            </div>
        </div>
    )
}
