const changeCurrencyFormat = (num) => {
    let currency = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return currency;
}

export default changeCurrencyFormat;