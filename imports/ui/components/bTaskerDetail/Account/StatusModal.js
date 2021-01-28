import React from 'react'

export default function StatusModal({ option }) {

    const renderOptions = () => {
        return option.map((item, key) => {
            return (
                <label key={key}>
                <input className="status_update" type="radio" name="light"></input>
                <span className="design"></span>
                <span className="text">{item}</span>
            </label>
            )
        })
    }

    return (
        <div className="status-modal section">
            {renderOptions()}
        </div>
    )
}
