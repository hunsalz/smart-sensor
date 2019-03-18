<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://smart-sensor-app.back4app.io/functions/temperature",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode($_POST),
  CURLOPT_HTTPHEADER => array(
    "content-type: application/json",
    "x-parse-application-id: 10kYklW6wkvgiJ44gLl41yYPidmbhZrZB1fWTO7w",
    "x-parse-rest-api-key: PBZ1Oo5RDiT6A6oWm8LNIDcffzCwJP8kjzGf3yf1"
  ),
));

$json = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  $encode = json_decode($json);

  $response = [];
  foreach($encode->result as $key => $value) {
    $response[$key] = $value;
  }

  echo json_encode($response);
}
?>