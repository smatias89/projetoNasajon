<?php

class Connection {
    
    public static $instance;
    
    private function __construct() {
        //
    }
    
    public static function getInstance() {
        if (!isset(self::$instance)) {
            /*self::$instance = new PDO('mysql:host=localhost;dbname=db_cbs', 'cbsadmin', 'cbsadmin',array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));*/
            // self::$instance = new PDO('mysql:host=br1004.hostgator.com.br;dbname=jetlco47_db_bipescola_escola01', 'jetlco47_bipescola_escola01_adm', 'bipescola$admin',array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            // self::$instance = new PDO('mysql:host=localhost', 'saulo_admin', 'sej030721',array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); #mysqlLocal
            self::$instance = new PDO('mysql:host=localhost;dbname=handscale_base', 'handScale_admin', 'sej030721',array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); #mysqlXampp
            self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$instance->setAttribute(PDO::ATTR_ORACLE_NULLS, PDO::NULL_EMPTY_STRING);
        }
        
        return self::$instance;
    }
    
}

?>