import Rating from '../../Rating/Rating'
import Status from '../../Status/Status';
import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap';
// import edit from '../../assets/img/icons/common/edit.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { useHistory } from "react-router-dom";
import useViewport from '../../../utils/customHooks/useViewport';

export default function General({ user }) {

    const edit = "../../../../../img/icons/common/edit.svg";
    const history = useHistory();
    // custom hook viewport
    const { width } = useViewport();
    const breakpoint = 991.5;

    const AvatarCard = () => {
        if (user) {
            return (
                <Card className="profile__card">
                    <CardBody >
                        <div className="profile__card-content">
                            <div className="avatar avatar-lg"></div>
                            <div className="name pt-2">{user.name}</div>
                            <div className="rating py-2"><Rating rating={user.rating} /> ({user.rating}.00)</div>
                            <div className="points">234 points</div>
                        </div>
                    </CardBody>
                </Card>
            )
        }
    }
    const StatusCard = () => {
        if (user) return (
            <Card className="status__card">
                <CardBody>
                    <p>Status:</p>
                    <Status status={user.status} />
                </CardBody>
            </Card>
        )
    }
    const ProfileCard = () => {
        return (
            <Card className="info__card">
                <CardHeader>
                    <h3>Profile</h3>
                    <i>
                        <img src={edit} alt="" />
                    </i>
                </CardHeader>
                <CardBody>
                    <p><span>ID number:</span> <span>{user.id}</span></p>
                    <p><span>Phone number:</span> <span>{user.phone}</span></p>
                    <p><span>Birthday:</span> <span>{new Date(user.birth).toLocaleDateString('en-GB')}</span></p>
                    <p><span>Credit card number:</span> <span>{user.creaditCard}</span></p>
                    <p><span>Created at:</span> <span>{new Date(user.createAt).toLocaleDateString('en-GB')}</span></p>
                    <p className="d-flex"><span>Address:</span> <span>{user.address}
                        {width > breakpoint ? <a href="#" className="d-block map">
                            <FontAwesomeIcon icon={faMap} />
                            Xem trên bản đô
                        </a>
                            :
                            <FontAwesomeIcon className="mt-1 d-block  map map-mobile" icon={faMap} />
                        }
                    </span>

                    </p>
                    <p><span>Email:</span> <span>{user.email}</span></p>
                    <p><span>Note:</span><span></span></p>
                </CardBody>
            </Card>
        )
    }

    // render status button at footer
    const renderStatusChange = () => {
        let status = ["Active", "Blocked", "Inactive", "Unverified"];
        if (user) {
            let filteredStatus = status.filter(function (e) { return e !== user.status })
            return (
                <>
                    {filteredStatus.map((item, key) => {
                        switch (item) {
                            case "Active":
                                item = 'Verify';
                                break;
                            case "Inactive":
                                item = 'In-Probation';
                                break;
                            case "Unverified":
                                item = 'Unverify';
                                break;
                            case "Blocked":
                                item = 'Block';
                                break;
                            default:
                                break;
                        }
                        return (
                            <Status status={item} key={key} />
                        )
                    })}
                    <div className="status" onClick={history.goBack}>Back to list</div>
                </>
            )
        }
    }


    return (
        <div className="info__general bTasker__user">
            <div className="info__general-body">
                <AvatarCard />
                <StatusCard />
                <ProfileCard />
            </div>
            <div className="info-footer d-none d-lg-flex">
                {renderStatusChange()}
            </div>
        </div>
    )
}
