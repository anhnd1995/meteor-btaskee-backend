// FormatDate.js
// Anh Nguyen
// Format Date 

import React from 'react'
import changeDateFormat from '../../utils/changeDateFormat'

export default function FormatDate({date}) {
    const [getDate, getTime] = changeDateFormat(date);
    return (
      <td className="bTasker__created-date">
        <p className="font-weight-bold mb-0">{getDate}</p>
        <p className="font-weight-bold mb-0">{getTime}</p>
      </td>
    )
}

