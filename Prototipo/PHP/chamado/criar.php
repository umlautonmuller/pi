<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

$pdo = include "../pdo.php";
$userData = json_decode(file_get_contents("php://input"));

function criar($pdo, $userData) {
    $criar = $pdo->prepare("INSERT INTO chamado(nome, descricao, latitude, longitude, id_usuario) VALUES (:nome, :descricao, :latitude, :longitude, :id_usuario)");
    $criar->execute([
        "nome" => $userData->nome,
        "descricao" => $userData->descricao,
        "latitude" => $userData->posicao->lat,
        "longitude" => $userData->posicao->lng,
        "id_usuario" => intval($_GET['idusuario'])
    ]);
}
try{
    criar($pdo, $userData);
}catch(PDOException $e){
    echo $e->getMessage();
}