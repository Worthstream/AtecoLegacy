<?php
require_once('lib/ateco.php');
$ateco = new atecoXml();
$res = $ateco->tree();
echo $res;
?>


