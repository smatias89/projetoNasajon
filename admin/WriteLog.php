<?php
class WriteLog{
     
    public static $instance;    
    
    private function __construct() {
        //
    }
     
    public static function getInstance(){
        if (!isset(self::$instance))
        self::$instance = new WriteLog();                
        return self::$instance;
    }
     
    public function writeLog($msg){
        // print_r($msgErro);
        // print "\n\n" . $msg;        
        $msgLog = "\r\n\r\n".$msg."\r\n\r\n Ocorrido em: ".date("d-m-Y, H:i:s")."\r\n -----------------------------------------------------------------------------------";    
        // print $msgLog;
        $logFile = __DIR__ . "/../logs/error_log_".date("d-m-Y").".txt";    
        $fp = fopen($logFile,'a');
        fwrite($fp,$msgLog);
        fclose($fp);
    }

    public function msgError($e){

        $msgExternal;
        switch($e->getCode()){
            case '23000':
                $msgExternal = 'Registro duplicado ou violação de integridade';
                break;

            case '42S22':
                $msgExternal = 'Erro de coluna ou tabela inexistente';
                break;

            case 'HY093':
                $msgExternal = 'Erro de parâmetro SQL';
                break;

            default:
                $msgExternal = 'Erro inesperado no banco';
        }

        return $msgExternal;
    }


     
}

?>