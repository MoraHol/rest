<?php
$url = "";
if($_GET["flag"] === 'true'){
    $url = "https://international.bittrex.com/Api/v2.0/pub/market/GetLatestTick?marketName=".$_GET['market']."&tickInterval=".$_GET['frecuency'];
}else{
    $url = 'https://international.bittrex.com/Api/v2.0/pub/market/GetTicks?marketName='.$_GET['market'].'&tickInterval='.$_GET['frecuency'];
}


$handler = curl_init();
curl_setopt($handler, CURLOPT_URL, $url);
$response = curl_exec($handler);
$response = substr($response, 0, -1);
echo $response;
curl_close($handler);