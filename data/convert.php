<?php

// Load the XML file
$xml = simplexml_load_file('XML_struttura_estesa.xml');

// Initialize an array to store the output data
$output = [];

// Helper function to recursively process the XML structure
function processXml($parent, $codePrefix = "") {
    global $output;

    foreach ($parent as $element) {
        // Extract the code and title if they exist
        $code = isset($element->Codice) ? (string) $element->Codice : "";
        $title = isset($element->Titolo) ? (string) $element->Titolo : "";

        // If both code and title exist, add the entry to the output array
        if (!empty($code) && !empty($title)) {
            $fullCode = $codePrefix . $code;
            $output[] = ["0" => $fullCode, "1" => $title, "2" => ""];
        }

        // If the element contains children, recursively process them
        if ($element->count() > 0) {
            $newCodePrefix = !empty($codePrefix) ? $codePrefix . $code . "." : $code . ".";
            processXml($element, $newCodePrefix);
        }
    }
}

// Start processing from the root of the XML
processXml($xml);

// Convert the output array to JSON format
$jsonOutput = json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

// Write the JSON output to the file
file_put_contents('output.txt', $jsonOutput);

echo "Conversion complete. Output written to output.txt";

?>