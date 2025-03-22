<?php

// Load the XML file
$xml_string = file_get_contents('XML_struttura_estesa.xml.txt');

//TODO

// Convert the array to JSON
$json_output = json_encode($json_array, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

// Write the JSON to a file
file_put_contents('output.json', $json_output);

echo "Conversion complete. Output written to output.json";

?>