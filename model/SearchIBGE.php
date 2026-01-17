<?php

class SearchIBGE implements JsonSerializable { 
    private $municipality;       // nome original do CSV
    private $population;         // população do CSV
    private $municipio_ibge;     // nome oficial do IBGE
    private $uf;                 // sigla do estado
    private $regiao;             // região do Brasil
    private $id_ibge;            // código do IBGE
    private $status;             // OK, NAO_ENCONTRADO, ERRO_API, AMBIGUO

    // JsonSerialize para transformar em JSON
    public function jsonSerialize() {
        return [
            'municipality' => $this->municipality,
            'population' => $this->population,
            'municipio_ibge' => $this->municipio_ibge,
            'uf' => $this->uf,
            'regiao' => $this->regiao,
            'id_ibge' => $this->id_ibge,
            'status' => $this->status
        ];
    }

    // GETTERS e SETTERS
    public function getMunicipality() {
        return $this->municipality;
    }
    public function setMunicipality($municipality) {
        $this->municipality = $municipality;
        return $this;
    }

    public function getPopulation() {
        return $this->population;
    }
    public function setPopulation($population) {
        $this->population = $population;
        return $this;
    }

    public function getMunicipioIbge() {
        return $this->municipio_ibge;
    }
    public function setMunicipioIbge($municipio_ibge) {
        $this->municipio_ibge = $municipio_ibge;
        return $this;
    }

    public function getUf() {
        return $this->uf;
    }
    public function setUf($uf) {
        $this->uf = $uf;
        return $this;
    }

    public function getRegiao() {
        return $this->regiao;
    }
    public function setRegiao($regiao) {
        $this->regiao = $regiao;
        return $this;
    }

    public function getIdIbge() {
        return $this->id_ibge;
    }
    public function setIdIbge($id_ibge) {
        $this->id_ibge = $id_ibge;
        return $this;
    }

    public function getStatus() {
        return $this->status;
    }
    public function setStatus($status) {
        $this->status = $status;
        return $this;
    }
}

?>
