<?php
 $url='https://international.bittrex.com/api/v2.0/pub/Markets/GetMarketSummaries';

$handler = curl_init();
curl_setopt($handler, CURLOPT_URL, $url);
$response = curl_exec($handler);
$response = substr($response, 0, -1);
echo $response;
curl_close($handler);