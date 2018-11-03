document.getElementById('send').addEventListener("click", load);
json = "";

function load() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            json = this.responseText;
            document.getElementById('response').innerHTML = this.responseText;
            json = JSON.parse(json);
        };
        xhttp.open("GET", "../BackEnd/cURL/curl.php", true);
        xhttp.send();
    }
}


// var data = [{
//     // x: [],
//     // y: [],
//     x: ['2018-11-03 17:01:00'],
//     y: [6337.001],
//     type: 'scatter'
// }];
// Plotly.newPlot('plotly-usd-btc', data);

// function updateChart() {
//     load();
//     data[0].x.push(json.result[0].TimeStamp);
//     data[0].y.push(json.result[0].Last);
//     Plotly.newPlot('plotly-usd-btc', data);
// }
// setInterval(updateChart, 10000);
// updateChart();

// function formatTimestamp(date){
//     date = new Date(date);
// }