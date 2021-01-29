//TransactionDetaol.js
// Anh Nguyen
// Render Transaction detail

import React, { useState } from 'react'
import SeperateCalendar from '../../Calendar/SeperateCalendar'
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";


// import mock data
import transaction from '../../../data/transaction'

// Import utils
import changeCurrencyFormat from '../../../utils/changeCurrencyFormat'
import FormatDate from '../../FormatDate/FormatDate';

export default function TransactionDetail() {


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropDownOption, setDropDownOption] = useState(["All", "Main Account", "2nd Account"])
    const [transactionData, setTransactionData] = useState([...transaction])
    const [account, setAccount] = useState("All")
    const [mainAcc, setMainAcc] = useState(0);
    const [secondAcc, setSecondAcc] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const renderCurrency = (num) => {
        let currency = changeCurrencyFormat(num);
        if (num > 0) {
            return <td className="text-green">+ {currency} VND</td>
        }
        else if (num < 0) {
            return <td className="text-red">{currency} VND</td>
        }
        else {
            return <td>{currency} VND</td>
        }
    }


    const renderTransactionTable = () => {

        return transactionData.map((item, index) => {
            return (
                <tr key={item.transaction_id}>
                    <td>{index + 1}</td>
                    {renderCurrency(item.main_account)}
                    {renderCurrency(item.second_account)}
                    <td>{item.reason}</td>
                    <FormatDate date={item.createAt} />
                </tr>
            )
        })
    }

    const calulateAccount = (transaction, account) => {
        let sum = transaction.reduce((total, item) => total + item[account], 0)
        return sum;
    }

    // Handle select account event
    const handleSelectAccount = (e) => {
        let selected = e.target.textContent;
        let newDropDown = dropDownOption.filter((item) => item !== selected)
        setDropDownOption([selected, ...newDropDown]);
    }

    // Receive start/ end date from Calendar component
    const receiveDateFilter = (startDate, endDate) => {
        // filterByDate(startDate, endDate);
        setStartDate(startDate);
        setEndDate(endDate);
        // console.log(startDate, endDate);
    };

    // Handle Filter event
    const handleFilter = () => {
        let filteredData = transactionData.filter((item) => {
            let createdDate = new Date(item.createAt.slice(0, 19));
            return createdDate >= startDate && createdDate <= endDate;
        });
    }

    const Dropdown = () => {
        return (
            <>
                <div className="transaction__dropdown-current d-flex align-items-center justify-content-between position-relative" onClick={() => { setDropdownOpen(!dropdownOpen) }}>
                    <p className={dropdownOpen ? "d-none" : ""}>{dropDownOption[0]}</p>
                    <FontAwesomeIcon icon={faAngleDown} className={dropdownOpen ? "d-none" : ""} />
                    {dropdownOpen && <div className="transaction__dropdown-option position-absolute text-left">
                        {dropDownOption.map((item, key) => {
                            return (
                                <p key={key} onClick={handleSelectAccount}
                                >{item}</p>
                            )
                        })}
                    </div>}
                </div>

            </>
        )
    }

    return (<div className="transaction">
        {/* Button trigger modal */}
        <a data-toggle="modal" href="#transaction-modal" className="text-primary">See Transaction History</a>
        {/* Modal */}
        <div className="modal fade" id="transaction-modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Transaction History</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="transaction__filter row px-4 mt-4">
                        <div className="calendar-select col-md-7">
                            <SeperateCalendar receiveDateFilter={receiveDateFilter} />
                        </div>
                        <div className="select__account col-md-3">
                            <Dropdown />
                        </div>
                        <div className="col-md-2 search-btn pl-0">
                            <button type="button" className="btn btn-primary" onClick={handleFilter}>Search</button>
                        </div>

                    </div>
                    <div className="modal-body">
                        <div className="transaction__summary d-flex">
                            <p>Main Account: <span>{changeCurrencyFormat(calulateAccount(transaction, "main_account"))}</span></p>
                            <p>2nd Account: <span> {changeCurrencyFormat(calulateAccount(transaction, "second_account"))}</span></p>
                        </div>
                        <div className="transaction__table">
                            <Table className="text-left table-flush">
                                <thead >
                                    <th className="fixed">No.</th>
                                    <th className="fixed">Main Account</th>
                                    <th className="fixed">2nd Account</th>
                                    <th className="fixed">Reason</th>
                                    <th className="fixed">Date</th>
                                </thead>
                                <tbody>
                                    {renderTransactionTable()}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="modal-footer justify-content-end">
                        <button type="button" className="btn btn-gray" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}
