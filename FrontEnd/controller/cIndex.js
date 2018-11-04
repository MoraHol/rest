document.getElementById('frecuency').addEventListener("change", changePreferences);
document.getElementById('market').addEventListener('change', changePreferences);
document.getElementById('type-chart').addEventListener('change', changePreferences);
var marketJson = "";

function changePreferences() {
    var market_selector= document.getElementById('market');
    var typeChartSelector = document.getElementById('type-chart');
    market = market_selector.options[market_selector.selectedIndex].value;
    type_chart = typeChartSelector.options[typeChartSelector.selectedIndex].value;
    document.getElementById('title').innerHTML = market;
    document.getElementById('image-currency').setAttribute('src',marketJson.result[market_selector.selectedIndex].Market.LogoUrl);
    market = market_selector.options[market_selector.selectedIndex].value;
    var frecuency = document.getElementById("frecuency");
    var pro = frecuency.options[frecuency.selectedIndex].value;
    if (pro === 'oneMin' || pro === 'fiveMin' || pro === 'hour' || pro === 'day' || pro === 'thirtyMin') {
        loadData(false, pro, 1, market,type_chart);
    } else {
        n = pro === 'tenMin' ? 2 : pro === 'fifteenMin' ? 3 : 1;
        loadData(false, 'fiveMin', n, market,type_chart);
    }
}
document.body.onload = function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            marketJson = this.responseText;
            marketJson = JSON.parse(marketJson);
        }
    };
    xhttp.open("GET", "../BackEnd/cURL/curl_markets.php", false);
    xhttp.send();
    loadMarkets();
    changePreferences();
}

function loadMarkets() {
    var selector = document.getElementById('market');
    marketJson.result.forEach(market => {
        m = document.createElement('option');
        m.setAttribute('value', market.Summary.MarketName);
        m.setAttribute('label', market.Summary.MarketName);
        selector.appendChild(m);
    });
}