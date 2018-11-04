var market_type = "";
var frecuency_type = "";
var n_type = "";
var type_chart_plotly = "";
var json = "";
var trace1 = {
    x: [],
    close: [],
    decreasing: {
        line: {
            color: '#AE3434'
        }
    },
    high: [],
    increasing: {
        line: {
            color: '#06A45B'
        }
    },
    line: {
        color: 'rgba(31,119,180,1)'
    },
    low: [],
    open: [],
    type: 'candlestick',
    xaxis: 'x',
    yaxis: 'y'
};

var data = [trace1];

var layout = {
    dragmode: 'zoom',
    margin: {
        r: 30,
        t: 25,
        b: 40,
        l: 60
    },
    showlegend: true,
    xaxis: {
        autorange: true,
        domain: [0, 1],
        range: ['2018-11-03 12:00', '2017-02-15 12:00'],
        rangeslider: {
            range: ['2018-11-03 12:00', '2017-02-15 12:00']
        },
        title: 'Date',
        type: 'date'
    },
    yaxis: {
        autorange: true,
        domain: [0, 1],
        range: [114.609999778, 137.430004222],
        type: 'linear'
    }
};

function empty() {
    trace1.x = [];
    trace1.close = [];
    trace1.high = [];
    trace1.low = [];
    trace1.open = [];
}

function loadData1(flag) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            json = this.responseText;
            json = JSON.parse(json);
            if (!flag) {
                loadDataChart(n_type);
            }
        }
    };
    xhttp.open("GET", "../BackEnd/cURL/curl.php?flag=" + flag + '&frecuency=' + frecuency_type + '&market=' + market_type, !flag);
    xhttp.send();
}

function loadData(flag, frecuency, n, market,type_chart) {
    frecuency_type = frecuency;
    n_type = n;
    market_type = market;
    type_chart_plotly = type_chart;
    trace1.type = type_chart;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            json = this.responseText;
            json = JSON.parse(json);
            document.getElementById('loading').style.zIndex = "-1";
            document.getElementById('plotly-usd-btc').style.filter="none";
            if (!flag) {
                loadDataChart(n);
            }
        }else{
            document.getElementById('loading').style.zIndex = "2";
            document.getElementById('plotly-usd-btc').style.filter="blur(10px)";
        }
    };
    xhttp.open("GET", "../BackEnd/cURL/curl.php?flag=" + flag + '&frecuency=' + frecuency + '&market=' + market, !flag);
    xhttp.send();
}


function pushData(datum) {
    trace1.x.push(new Date(datum.T + 'Z'));
    trace1.close.push(datum.C);
    trace1.high.push(datum.H);
    trace1.low.push(datum.L);
    trace1.open.push(datum.O);
    layout.xaxis.range[1] = new Date();
    layout.xaxis.rangeslider.range[1] = new Date();
}

function updateChart() {
    loadData1(true);
    time = new Date(json.result[0].T + 'Z');
    lastTime = new Date(trace1.x[trace1.x.length - 1]);
    if (time != lastTime) {
        pushData(json.result[0]);
        Plotly.react('plotly-usd-btc', data, layout);
    }
}

function loadDataChart(n = 1) {
    empty();
    layout.xaxis.range[0] = new Date(json.result[json.result.length - 30 * n].T + 'Z');
    layout.xaxis.rangeslider.range[0] = new Date(json.result[json.result.length - 30 * n].T + 'Z');
    for (let index = json.result.length - (30 * n); index < json.result.length; index++) {
        var d = new Date(json.result[index].T + 'Z');
        if (n != 1) {
            if (d.getMinutes() % n * 5 == 0) {
                pushData(json.result[index]);
            }
        } else {
            pushData(json.result[index]);
        }
    }
    Plotly.react('plotly-usd-btc', data, layout);
}
setInterval(updateChart, 60000);