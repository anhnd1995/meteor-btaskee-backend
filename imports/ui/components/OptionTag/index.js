import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function OptionTag({ tag, updateOptionTag }) {

    const [option, setOption] = useState(tag)

    const deleteTag = (e) => {

        let selected = e.target.parentElement.firstChild.textContent;
        console.log(selected);
        let newTagList = option.filter((item) => {
            return item !== selected;
        })
        setOption(newTagList);
        updateOptionTag(newTagList);

    }

    return option.map((item, key) => {
        return (
            <div key={key} className="tag">
                <p>{item}</p>
                <FontAwesomeIcon icon={faTimesCircle} />
                <span className="deleteItem position-absolute" onClick={deleteTag}></span>
            </div>
        )
    })

}
