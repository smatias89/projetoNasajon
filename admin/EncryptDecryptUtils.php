<?php

class EncryptDecryptUtils {
    
     // Store the cipher method
    private $ciphering;
    private $iv;
    private $options;
    private $tag;
     
    // Store the encryption key
    private $encryption_key;
    
    function __construct() {
        $this->ciphering = "AES-256-GCM";
        $this->options = 0;
        $this->encryption_key = "vg+H9Zr8u1eID0Rt0/rNnUDIGCFU3rYQINDZrYnOCuxVydqTRds3Vb2RAr87dXCu4V0qq9DitqrvxB7lnsEkSQ==";
        $this->iv = "1kCWiMvJtSH_w5dL";
        $this->tag = '';
    }

    function encrypt($data) {
        $encryptionKey = base64_decode($this->encryption_key);
        $encrypted = openssl_encrypt($data, $this->ciphering, $encryptionKey, 0, $this->iv, $this->tag);
        return base64_encode($encrypted . '::' . $this->iv . '::' . $this->tag);
    }
    
    
    function decrypt($data) {
        $encryptionKey = base64_decode($this->encryption_key);
        list($encryptedData, $this->iv, $this->tag) = explode('::', base64_decode($data), 3);
        return openssl_decrypt($encryptedData, $this->ciphering, $encryptionKey, 0, $this->iv, $this->tag);
    }
    
}

?>