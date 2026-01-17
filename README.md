# Consulta de Municípios - IBGE

## Como rodar

1. Coloque o CSV de entrada na pasta `input_csv/`.  
   - Colunas: `Municipio,População`

2. Execute o script PHP `ibge.php` (via navegador ou terminal).  

3. O script irá:
   - Consultar a API do IBGE
   - Gerar CSV em `input_csv/output/resultado.csv`
   - Gerar JSON em `input_csv/output/resultado_stats_TIMESTAMP.json`
   - Exibir tabela HTML com status OK/NAO_ENCONTRADO

4. (Opcional) Para enviar para a API de correção, configure URL e token no bloco cURL no final do arquivo.
