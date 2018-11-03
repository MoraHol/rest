var json = "";
var trace1 = {
    x: [],
    close: [],
    decreasing: {
        line: {
            color: '#7F7F7F'
        }
    },
    high: [],
    increasing: {
        line: {
            color: '#17BECF'
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
        r: 10,
        t: 25,
        b: 40,
        l: 60
    },
    showlegend: false,
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
        range: [114.609999778, 137.410004222],
        type: 'linear'
    }
};

function loadData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            json = this.responseText;
            json = JSON.parse(json);
        };
        xhttp.open("GET", "../BackEnd/cURL/curl.php", true);
        xhttp.send();
    }
}

function pushData() {
    trace1.x.push(json.result[0].T);
    trace1.close.push(json.result[0].C);
    trace1.high.push(json.result[0].H);
    trace1.low.push(json.result[0].L);
    trace1.open.push(json.result[0].O);
    layout.xaxis.range[1] = Date.now();
    layout.xaxis.rangeslider.range[1] = Date.now();
    Plotly.newPlot('plotly-usd-btc', data);
}

function updateChart() {
    loadData();
    time = new Date(json.result[0].T);
    lastTime = new Date(trace1.x[length - 1]);

    if (time != lastTime) {
        pushData();
    }
}

setInterval(updateChart, 30000);
loadData();
