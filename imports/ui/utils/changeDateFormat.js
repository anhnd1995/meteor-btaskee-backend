const changeDateFormat = (date) => {
    const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let dateTime = new Date(date);
    let dateCreated = dateTime.getDate() + " " + months[dateTime.getMonth()] + ", " + dateTime.getFullYear();
    let timeCreated = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    return [dateCreated, timeCreated];
}

export default changeDateFormat;