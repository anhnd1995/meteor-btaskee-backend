import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export default function Status({ status, width = "", breakpoint = "" }) {
  let bTaskerStatus = "transparent";
  let borderColor = "";
  let textColor = "white";
  switch (status) {
    case "Active":
      bTaskerStatus = 'green';
      break;
    case "Inactive":
      bTaskerStatus = 'indigo';

      break;
    case "Unverified":
      bTaskerStatus = 'yellow';

      break;
    case "Blocked":
      bTaskerStatus = 'red';

      break;
    case "Verify":
      textColor = borderColor = "green";
      break;

    case "In-Probation":
      textColor = borderColor = "indigo";

      break;
    case "Unverify":
      textColor = borderColor = "yellow";

      break;
    case "Block":
      textColor = borderColor = "red";

      break;
    default:
      break;
  }
  if (width > breakpoint) {
    return (
      <td className={`bTasker__status text-${bTaskerStatus}`}>
        <FontAwesomeIcon icon={faCircle} className="dot" />
        <span>{status}</span>
      </td>
    )
  }
  else {
    return (
      <p className={`status bg-${bTaskerStatus} border border-${borderColor} text-${textColor}`}>{status}</p>
    )
  }
}
