import React, { useEffect, useState } from 'react'

export default function ServiceModal({ current, option }) {

    const [updateSelected, setUpdateSelected] = useState(false);
    const [selectedOption, setselectedOption] = useState(current);
    const renderOptions = () => {

        function simulateClick(e) {
            if (e) {
                e.click()
            }
        }

        return option.map((item, key) => {
            return (
                <div className="option my-3" key={key}>
                    {item}
                    <div className="toggle-wrapper">
                        <div className="toggle normal">
                            {current.includes(item) ? <input id={`normal${key}`} type="checkbox" ref={simulateClick}
                            ></input> : <input id={`normal${key}`} type="checkbox"
                            ></input>}
                            <label className="toggle-item" htmlFor={`normal${key}`}></label>
                        </div>
                    </div>
                </div>
            )
        })
    }


    // useEffect(() => {
    //     let selectOptions = document.querySelectorAll('input[id*="normal"]:checked');
    //     selectOptions.forEach((item)=> {
    //         let select = item.parentElement.parentElement.parentElement.textContent;
    //         setselectedOption(select, ...selectedOption);
    //     });
    //     // selected(selectedOption);
    //     console.log(selectedOption);
    // }, [updateSelected])

    return (
        <div className="service-modal">
            {renderOptions()}
        </div>
    )
}
