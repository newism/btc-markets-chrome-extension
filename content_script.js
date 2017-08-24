window.onload = function () {

    let formatValue = function(value) {
        return parseFloat(Math.round(value * 100) / 100).toFixed(2);
    };

    let openOrders = document.getElementById('OpenOrders');
        openOrders.style.float = 'none';
        openOrders.style.width = 'auto';

    let previousTrades = document.getElementById('PreviousTrades');
        previousTrades.style.float = 'none';
        previousTrades.style.width = 'auto';

    document.getElementById('PreviousTradesContainer').style.height = 'auto';

    setInterval(function () {

        let totalDollarDifference = 0;
        let totalBuySpend = 0;

        let lastPrice = document.querySelector('#BTCSummary .bid .value').innerText;
        lastPrice = Number(lastPrice.replace(/[^0-9\.]+/g, ""));

        let previousTradesHeader = document.querySelector('#PreviousTrades > table thead');
        if (previousTradesHeader.rows[0].cells.length === 4) {

            let headerSpendCell = previousTradesHeader.rows[0].insertCell(-1);
            let headerProfitDollarCell = previousTradesHeader.rows[0].insertCell(-1);
            let headerProfitPercentageCell = previousTradesHeader.rows[0].insertCell(-1);
            let headerCellScroll = previousTradesHeader.rows[0].insertCell(-1);

            previousTradesHeader.rows[0].cells[3].style.width = 'auto';

            Object.assign(headerSpendCell.style, {width:"80px", textAlign: "right"});
            Object.assign(headerProfitDollarCell.style, {width:"80px", textAlign: "right"});
            Object.assign(headerProfitPercentageCell.style, {width:"80px", textAlign: "right"});
            headerCellScroll.classList.add('scroll-area');
        }

        let previousTradesTable = document.getElementById('PreviousTradesTable');
        let rows = previousTradesTable.tBodies[0].rows;
        if(previousTradesTable.rows[0].cells.length === 5) {
            for (let i = 0; i < rows.length; ++i) {

                let spendCell = rows[i].insertCell(4);
                let profitDollarCell = rows[i].insertCell(5);
                let profitPercentageCell = rows[i].insertCell(6);

                Object.assign(spendCell.style, {width:"80px", textAlign: "right"});
                Object.assign(profitDollarCell.style, {width:"80px", textAlign: "right"});
                Object.assign(profitPercentageCell.style, {width:"80px", textAlign: "right"});
            }
        }

        for (let i = 0; i < rows.length; ++i) {
            let buyVolume = Number(rows[i].cells[2].innerText.replace(/[^0-9\.]+/g, ""));
            let buyPrice = Number(rows[i].cells[3].innerText.replace(/[^0-9\.]+/g, ""));
            let buySpend = buyVolume * buyPrice;
            let currentValue = buyVolume * lastPrice;
            let dollarDifference = currentValue-buySpend;
            let percentageDifference = dollarDifference / buySpend * 100;

            rows[i].cells[4].innerText = "$"+formatValue(buySpend);
            rows[i].cells[5].innerText = "$"+formatValue(dollarDifference);
            rows[i].cells[6].innerText = "$"+formatValue(percentageDifference)+"%";

            totalDollarDifference += dollarDifference;
            totalBuySpend += buySpend;
        }

        previousTradesHeader.rows[0].cells[4].innerText = '$' + formatValue(totalBuySpend);
        previousTradesHeader.rows[0].cells[5].innerText = '$' + formatValue(totalDollarDifference);
        previousTradesHeader.rows[0].cells[6].innerText = formatValue(totalDollarDifference / totalBuySpend * 100)+"%";

    }, 1000);
};