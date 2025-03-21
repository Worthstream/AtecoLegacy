<?php

$xmlFile = isset($argv[1]) ? $argv[1] : "atecotest.xml";
$jsonFile = isset($argv[2]) ? $argv[2] : "atecotest.json";

if (!file_exists($xmlFile)) {
    echo "Error: XML file not found.\n";
    exit(1);
}

$xml = simplexml_load_file($xmlFile);

if ($xml === false) {
    echo "Error: Failed to load XML.\n";
    foreach (libxml_get_errors() as $error) {
        echo "\t", $error->message;
    }
    exit(1);
}


foreach ($xml->Sezione->Divisione->Gruppo->Classe as $classe) {
    foreach ($classe->Categoria as $categoria) {
        if (isset($categoria->Sottocategoria)) {
            foreach ($categoria->Sottocategoria as $sottocategoria) {
                $jsonArray= [
                    "0" => (string)$classe->Codice . '.' . (string)$categoria->Codice . (string)$sottocategoria->Codice,
                    "1" => (string)$sottocategoria->Titolo,
                    "2" => ""
                ];
            }
        } else {
            $jsonArray= [
                "0" => (string)$classe->Codice . '.' . (string)$categoria->Codice,
                "1" => (string)$categoria->Titolo,
                "2" => ""
            ];
        }
    }
}

$jsonData = json_encode($jsonArray, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

if (file_put_contents($jsonFile, $jsonData)) {
    echo "Successfully converted XML to JSON.\n";
    echo "JSON file saved to: " . $jsonFile . "\n";
} else {
    echo "Error: Failed to save JSON to file.\n";
    exit(1);
}
?>
