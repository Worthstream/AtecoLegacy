<?php

include_once('config.php');

$db = new PDO('mysql:host=' . $servername . ';dbname=' . $dbname . ';charset=utf8mb4', $username, $password);


    $stmt = $db->prepare("INSERT INTO stringheAteco (stringa) VALUES(:string_escaped)");

         $stmt->bindParam(":string_escaped",trim($_POST['search']),PDO::PARAM_STR);

    try {
        $stmt->execute();
    } catch(PDOException $ex) {
        die($ex);
    }



//echo '{"search_string":""API"","risultato":"possibili","0":[{"ateco_code":"01.49.3","ateco_description":"ALLEVATORE DI API"}]} ';
//die();
$url = 'http://giamaica.istat.it/AtecoR/atecobe/index.php?r=ateco/codifica';

if($_SERVER['SERVER_NAME'] == "www5-decamillis.istat.it"){
	$url = 'http://giamaica-svil.istat.it/AtecoR/atecobe/index.php?r=ateco/codifica';
}

$client = new SoapClient($url);
$result =  $client->codAteco(filter_var($_POST['search'],FILTER_SANITIZE_STRING));

/*$error = false;
if (strstr($result,'<title>500 Internal Server Error</title>')) {
  $error = true;
}
var_dump(is_soap_fault($result));
if($error) {*/
if(is_soap_fault($result)) {
  header("HTTP/1.0 500 Server Error");
} else {
  die($result);
}



