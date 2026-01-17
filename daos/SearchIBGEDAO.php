<?php

require_once '../model/SearchIBGE.php';

class SearchIBGEDAO {

    public static $instance;

    private function __construct() {
        // construtor privado para singleton
    }

    public static function getInstance() {
        if (!isset(self::$instance))
            self::$instance = new SearchIBGEDAO();
        return self::$instance;
    }

    /**
     * Cria um objeto SearchIBGE a partir de uma linha de CSV
     * $row = [0 => 'municipio', 1 => 'populacao']
     */
    public function fillFromCSV($row) {
        $obj = new SearchIBGE();
        $obj->setMunicipality($row[0]);
        $obj->setPopulation((int)$row[1]);
        // Campos do IBGE ainda não preenchidos
        $obj->setMunicipioIbge('');
        $obj->setUf('');
        $obj->setRegiao('');
        $obj->setIdIbge('');
        $obj->setStatus('');
        return $obj;
    }

    /**
     * Cria um objeto SearchIBGE a partir de JSON
     * $json = objeto ou stdClass
     */
    public function fillFromJSON($json) {
        $obj = new SearchIBGE();

        if (property_exists($json, 'municipality')) {
            $obj->setMunicipality($json->municipality);
        }
        if (property_exists($json, 'population')) {
            $obj->setPopulation((int)$json->population);
        }
        if (property_exists($json, 'municipio_ibge')) {
            $obj->setMunicipioIbge($json->municipio_ibge);
        }
        if (property_exists($json, 'uf')) {
            $obj->setUf($json->uf);
        }
        if (property_exists($json, 'regiao')) {
            $obj->setRegiao($json->regiao);
        }
        if (property_exists($json, 'id_ibge')) {
            $obj->setIdIbge($json->id_ibge);
        }
        if (property_exists($json, 'status')) {
            $obj->setStatus($json->status);
        }

        return $obj;
    }

    /**
     * Converte um array de CSV em array de objetos SearchIBGE
     */
    public function listFromCSV($csvData) {
        $list = [];
        foreach ($csvData as $row) {
            $list[] = $this->fillFromCSV($row);
        }
        return $list;
    }

    /**
     * Converte um array de JSON em array de objetos SearchIBGE
     */
    public function listFromJSON($jsonArray) {
        $list = [];
        foreach ($jsonArray as $json) {
            $list[] = $this->fillFromJSON($json);
        }
        return $list;
    }

}
?>


?>