window.onload = function () {

    let formatValue = function(value) {
        return parseFloat(Math.round(value * 100) / 100).toFixed(2);
    };

    let openOrders = document.getElementById('OpenOrders').style.width = '446px';
    let previousTrades = document.getElementById('PreviousTrades').style.width = '526px';

    setInterval(function () {

        let totalDollarDifference = 0;

        document.getElementById('PreviousTradesContainer').style.height = 'auto';

        let lastPrice = document.querySelector('#BTCSummary .bid .value').innerText;
        lastPrice = Number(lastPrice.replace(/[^0-9\.]+/g, ""));

        let previousTradesHeader = document.querySelector('#PreviousTrades > table thead');
        if (previousTradesHeader.rows[0].cells.length === 4) {

            let headerProfitCell = previousTradesHeader.rows[0].insertCell(-1).innerText = 'Spend';
            let headerCell = previousTradesHeader.rows[0].insertCell(-1).innerText = '+/-';
            let headerCellScroll = previousTradesHeader.rows[0].insertCell(-1);

            headerCellScroll.classList.add('scroll-area');
            previousTradesHeader.rows[0].cells[0].style.width = "113px";
            previousTradesHeader.rows[0].cells[2].style.width = "80px";
            previousTradesHeader.rows[0].cells[3].style.width = "50px";
            previousTradesHeader.rows[0].cells[4].style.width = "50px";
        }

        let previousTradesTable = document.getElementById('PreviousTradesTable');
        let rows = previousTradesTable.tBodies[0].rows;
        if(previousTradesTable.rows[0].cells.length === 5) {
            for (let i = 0; i < rows.length; ++i) {
                let priceCell = rows[i].insertCell(4);
                let profitCell = rows[i].insertCell(5);

                rows[i].cells[0].style.width="113px";
                rows[i].cells[2].style.width="80px";
                rows[i].cells[3].style.width="50px";
                rows[i].cells[4].style.width="50px";
            }
        }

        for (let i = 0; i < rows.length; ++i) {
            let buyVolume = Number(rows[i].cells[2].innerText.replace(/[^0-9\.]+/g, ""));
            let buyPrice = Number(rows[i].cells[3].innerText.replace(/[^0-9\.]+/g, ""));
            let buySpend = buyVolume * buyPrice;
            let currentValue = buyVolume * lastPrice;

            rows[i].cells[4].innerText = "$" + formatValue(buySpend);

            let dollarDifference = currentValue-buySpend;
            let percentageDifference = dollarDifference / buySpend * 100;

            totalDollarDifference += dollarDifference;

            rows[i].cells[5].innerText = "$"+formatValue(dollarDifference)+ " "+formatValue(percentageDifference)+"%";
        }

        previousTradesHeader.rows[0].cells[5].innerText = '+/- $' + formatValue(totalDollarDifference);

    }, 1000);
}