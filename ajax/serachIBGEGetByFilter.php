<?php
require_once "../model/SearchIBGE.php";
require_once "../daos/SearchIBGEDAO.php";

## Função para ajustar os nomes recebidos 
function normalize($str) {
    $str = mb_strtoupper(trim($str), 'UTF-8'); 
    $trans = array(
        'Á'=>'A','À'=>'A','Â'=>'A','Ã'=>'A',
        'É'=>'E','Ê'=>'E',
        'Í'=>'I',
        'Ó'=>'O','Ô'=>'O','Õ'=>'O',
        'Ú'=>'U',
        'Ç'=>'C'
    );
    $str = strtr($str, $trans);

    // remove caracteres especiais 
    $str = preg_replace('/[^\w\s]/u', '', $str); 
    return $str;
}

## Localiza o CSV mais recente dentro da pasta input_csv 
$inputDir = __DIR__ . "/../input_csv/";
$csvFiles = glob($inputDir . "*.csv");
if (!$csvFiles) die("Nenhum CSV encontrado na pasta input_csv!");

// pegar o primeiro csv
$csvPath = $csvFiles[0]; 
// echo "Processando CSV: $csvPath<br>";

## Lê o CSV 
$csvData = array_map('str_getcsv', file($csvPath));

## retirada de cabecalho
$header = array_shift($csvData); 

$dao = SearchIBGEDAO::getInstance();
$results = $dao->listFromCSV($csvData);


## Consulta API IBGE 
foreach ($results as $obj) {
    $municipioInput = $obj->getMunicipality();
    $municipioUrl = urlencode($municipioInput);
    $ibgeApi = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?nome=$municipioUrl";

    $resp = @file_get_contents($ibgeApi);

    if ($resp === FALSE || empty($resp)) {
        $obj->setMunicipioIbge("");
        $obj->setUf("");
        $obj->setRegiao("");
        $obj->setIdIbge(0);
        $obj->setStatus("NAO_ENCONTRADO");
        continue;
    }

    $data = json_decode($resp, true);

    if (empty($data)) {
        $obj->setMunicipioIbge("");
        $obj->setUf("");
        $obj->setRegiao("");
        $obj->setIdIbge(0);
        $obj->setStatus("NAO_ENCONTRADO");
        continue;
    }

    ## buscar por macth
    $found = false;
    $inputNorm = normalize($municipioInput);
    foreach ($data as $mun) {
        $munNorm = normalize($mun['nome']);
        if ($inputNorm === $munNorm) {
            $obj->setMunicipioIbge($mun['nome']);
            $obj->setUf($mun['microrregiao']['mesorregiao']['UF']['sigla']);
            $obj->setRegiao($mun['microrregiao']['mesorregiao']['UF']['regiao']['nome']);
            $obj->setIdIbge($mun['id']);
            $obj->setStatus("OK");
            $found = true;
            break;
        }
    }

    if (!$found) {
        ## se match exato então set: NAO_ENCONTRADO
        $obj->setMunicipioIbge("");
        $obj->setUf("");
        $obj->setRegiao("");
        $obj->setIdIbge(0);
        $obj->setStatus("NAO_ENCONTRADO");
    }
}


## Cria pasta de output 
$outputDir = $inputDir . "output/";
if (!is_dir($outputDir)) mkdir($outputDir, 0777, true);

## Gera CSV de saída final no formato correto 
$outputCsv = $outputDir . "resultado" . ".csv";
$fp = fopen($outputCsv, 'w');

## inclusão do cabeçalho
fputcsv($fp, ['Municipio','População','IBGE','UF','Região','ID IBGE','Status']);

## foreach para preencher corretamente cada uma das linhas do CSV
foreach ($results as $obj) {

    
    $municipioIbge = $obj->getStatus() === 'OK' ? $obj->getMunicipioIbge() : '';
    $uf           = $obj->getStatus() === 'OK' ? $obj->getUf() : '';
    $regiao       = $obj->getStatus() === 'OK' ? $obj->getRegiao() : '';
    $idIbge       = $obj->getStatus() === 'OK' ? $obj->getIdIbge() : 0;

    fputcsv($fp, [
        $obj->getMunicipality(),
        $obj->getPopulation(),
        $municipioIbge,
        $uf,
        $regiao,
        $idIbge,
        $obj->getStatus()
    ]);
}
fclose($fp);
## inicio dos calculos de estatística
$stats = [
    'total_municipios' => count($results),
    'total_ok' => 0,
    'total_nao_encontrado' => 0,
    'total_erro_api' => 0,
    'pop_total_ok' => 0,
    'medias_por_regiao' => []
];

$regiaoPop = [];
$regiaoCount = [];

foreach ($results as $obj) {
    $status = $obj->getStatus();
    $pop = (int)$obj->getPopulation();
    $regiao = $obj->getRegiao();

    if ($status === 'OK') {
        $stats['total_ok']++;
        $stats['pop_total_ok'] += $pop;

        if (!isset($regiaoPop[$regiao])) {
            $regiaoPop[$regiao] = 0;
            $regiaoCount[$regiao] = 0;
        }
        $regiaoPop[$regiao] += $pop;
        $regiaoCount[$regiao]++;
    } elseif ($status === 'NAO_ENCONTRADO') {
        $stats['total_nao_encontrado']++;
    } elseif ($status === 'ERRO_API') {
        $stats['total_erro_api']++;
    }
}

## calculo da média por região
foreach ($regiaoPop as $r => $totalPop) {
    $stats['medias_por_regiao'][$r] = round($totalPop / $regiaoCount[$r], 2);
}

## salva JSON no formato
$jsonFile = $outputDir . "resultado_stats_" . date('Ymd_His') . ".json";
file_put_contents($jsonFile, json_encode(['stats' => $stats], JSON_PRETTY_PRINT));

##   links de download e tabela HTML montada dinamicamente
echo "<div class='alert alert-success mt-3'>";
echo "CSV gerado: <a href='../input_csv/output/" . basename($outputCsv) . "' target='_blank'>Clique aqui para baixar</a><br>";
echo "JSON gerado: <a href='../input_csv/output/" . basename($jsonFile) . "' target='_blank'>Clique aqui para baixar</a>";
echo "</div>";

## tbl estilizada com Bootstrap
echo "<div class='table-responsive mt-3'>";
echo "<table class='table table-striped table-bordered table-hover'>";
echo "<thead class='thead-dark'><tr>";
echo "<th>Município</th>";
echo "<th>População</th>";
echo "<th>IBGE</th>";
echo "<th>UF</th>";
echo "<th>Região</th>";
echo "<th>ID IBGE</th>";
echo "<th>Status</th>";
echo "</tr></thead>";
echo "<tbody>";

foreach ($results as $obj) {
    $statusClass = $obj->getStatus() === 'OK' ? 'table-success' : 'table-danger'; 
    echo "<tr class='$statusClass'>";
    echo "<td>".$obj->getMunicipality()."</td>";
    echo "<td>".number_format($obj->getPopulation(), 0, ',', '.')."</td>";
    echo "<td>".$obj->getMunicipioIbge()."</td>";
    echo "<td>".$obj->getUf()."</td>";
    echo "<td>".$obj->getRegiao()."</td>";
    echo "<td>".$obj->getIdIbge()."</td>";
    echo "<td>".$obj->getStatus()."</td>";
    echo "</tr>";
}

echo "</tbody>";
echo "</table>";
echo "</div>";

$jsonPayload = json_encode(['stats' => $stats]);

// var_dump($jsonPayload); para confirmar o tipo e o arquivo

// $projectFunctionUrl = "https://mynxlubykylncinttggu.functions.supabase.co/ibge-submit";
// $accessToken = "eyJhbGciOiJIUzI1NiIsImtpZCI6ImR0TG03UVh1SkZPVDJwZEciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL215bnhsdWJ5a3lsbmNpbnR0Z2d1LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIwNTgxM2E4ZS00MTkxLTRlOTUtYmM1MC04YzY4NGQ3MzE2ODIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzY4NjAzOTM2LCJpYXQiOjE3Njg2MDAzMzYsImVtYWlsIjoic2F1bG8uZW5nbWF0aWFzQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJzYXVsby5lbmdtYXRpYXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5vbWUiOiJTYXVsbyBNYXRpYXMgQ29zdGEiLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6IjA1ODEzYThlLTQxOTEtNGU5NS1iYzUwLThjNjg0ZDczMTY4MiJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzY4NjAwMzM2fV0sInNlc3Npb25faWQiOiJhMTZjYzA5NS0yZjU4LTQ1ZTktODllOC1hYThjOWRmNTgxYjIiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.ZOOlgDURb4ikLECCNE1yeH28xnIpl4pn8UNC7iIQJ-0"; 


// $ch = curl_init($projectFunctionUrl);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// curl_setopt($ch, CURLOPT_HTTPHEADER, [
//     "Authorization: Bearer $accessToken",
//     "Content-Type: application/json"
// ]);
// curl_setopt($ch, CURLOPT_POST, true);
// curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonPayload);

// $response = curl_exec($ch);
// $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// if ($response === false) {
//     echo "Erro ao enviar os dados: " . curl_error($ch);
// } elseif ($httpCode >= 400) {
//     echo "Erro na API. Código HTTP: $httpCode. Resposta: $response";
// } else {
//     $respData = json_decode($response, true);
//     if ($respData && isset($respData['score'])) {
//         echo "<div class='alert alert-info mt-3'>";
//         echo "Score recebido: " . $respData['score'] . "<br>";
//         echo "Feedback: " . ($respData['feedback'] ?? 'Sem feedback');
//         echo "</div>";
//     } else {
//         echo "Resposta inesperada da API: $response";
//     }
// }

// curl_close($ch);