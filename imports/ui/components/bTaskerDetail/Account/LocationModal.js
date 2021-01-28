import React from 'react'

export default function LocationModal({ current, option }) {

    const renderOptions = () => {


        function simulateClick(e) {
            if (e) {
                e.click()
            }
        }

        return option.map((item, key) => {
            return (
                <label key={key}>
                    {current.includes(item) ? <input className="location_update" type="checkbox" name="light" ref={simulateClick}></input> : <input className="location_update" type="checkbox" name="light"></input>}
                    <span className="design"></span>
                    <span className="text">{item}</span>
                </label>
            )
        })
    }

    return (
        <div className="location-modal">
            <div className="home-city">
                Ho Chi Minh
                <i className="ni ni-bold-right"></i>
            </div>
            <div className="option">
                {renderOptions()}
            </div>
        </div>
    )
}
