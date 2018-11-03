<?php
$url='https://bittrex.com/api/v1.1/public/getmarketsummary?market=usd-btc';
// $url = "https://international.bittrex.com/Api/v2.0/pub/market/GetLatestTick?marketName=USD-BTC&tickInterval=oneMin";
$handler = curl_init();
curl_setopt($handler, CURLOPT_URL, $url);
$response = curl_exec($handler);
$response = substr($response, 0, -1);
echo $response;
curl_close($handler);