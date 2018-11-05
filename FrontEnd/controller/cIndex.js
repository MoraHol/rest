document.getElementById('frecuency').addEventListener("change", changePreferences);
document.getElementById('market').addEventListener('change', changePreferences);
document.getElementById('type-chart').addEventListener('change', changePreferences);
var market_selector = 0;
var marketJson = "";

function changePreferences() {
    market_selector = document.getElementById('market');
    var typeChartSelector = document.getElementById('type-chart');
    market = market_selector.options[market_selector.selectedIndex].value;
    type_chart = typeChartSelector.options[typeChartSelector.selectedIndex].value;
    document.getElementById('title').innerHTML = market;
    MarketCurrency = marketJson.result[market_selector.selectedIndex].Market.MarketCurrencyLong;
    document.getElementById('currency1').innerHTML = MarketCurrency;
    document.getElementById('image-currency').setAttribute('src', marketJson.result[market_selector.selectedIndex].Market.LogoUrl);
    market = market_selector.options[market_selector.selectedIndex].value;
    var frecuency = document.getElementById("frecuency");
    var pro = frecuency.options[frecuency.selectedIndex].value;
    updateDataCurrency();
    if (pro === 'oneMin' || pro === 'fiveMin' || pro === 'hour' || pro === 'day' || pro === 'thirtyMin') {
        loadData(false, pro, 1, market, type_chart);
    } else {
        n = pro === 'tenMin' ? 2 : pro === 'fifteenMin' ? 3 : 1;
        loadData(false, 'fiveMin', n, market, type_chart);
    }
}
document.body.onload = function () {
    loadMarkets(false);
    loadMarketSelector();
    changePreferences();
    updateDataCurrency();
}

function loadMarkets(flag = true){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            marketJson = this.responseText;
            marketJson = JSON.parse(marketJson);
        }
    };
    xhttp.open("GET", "../BackEnd/cURL/curl_markets.php", flag);
    xhttp.send();
}
function updateDataCurrency() {
    document.getElementById('last').innerHTML = '$ ' + parseFloat(marketJson.result[market_selector.selectedIndex].Summary.Last).toFixed(8);
    document.getElementById('bid').innerHTML = '$ ' + parseFloat(marketJson.result[market_selector.selectedIndex].Summary.Bid).toFixed(8);
    document.getElementById('ask').innerHTML = '$ ' + parseFloat(marketJson.result[market_selector.selectedIndex].Summary.Ask).toFixed(8);
    document.getElementById('volume').innerHTML = '$ ' + parseFloat(marketJson.result[market_selector.selectedIndex].Summary.BaseVolume).toFixed(8);
    document.getElementById('24-high').innerHTML = '$ ' + parseFloat(marketJson.result[market_selector.selectedIndex].Summary.High).toFixed(8);
    document.getElementById('24-low').innerHTML = '$ ' + parseFloat(marketJson.result[market_selector.selectedIndex].Summary.Low).toFixed(8);
}


function loadMarketSelector() {
    var selector = document.getElementById('market');
    marketJson.result.forEach(market => {
        m = document.createElement('option');
        m.setAttribute('value', market.Summary.MarketName);
        m.setAttribute('label', market.Summary.MarketName);
        selector.appendChild(m);
    });
}
setInterval(updateDataCurrency,60000);
setInterval(loadMarkets,40000);