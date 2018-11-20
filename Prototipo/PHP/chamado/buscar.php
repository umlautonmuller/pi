<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

$pdo = include "../pdo.php";

function buscar($pdo) {
    $get = $pdo->prepare(
        "SELECT latitude, longitude, nome, descricao FROM chamado"
    );
    $get->execute();
    if($get->rowCount()>0){
        die(json_encode(['result'=>true,'body'=>$get->fetchAll(PDO::FETCH_ASSOC)]));
    } else {
        die(json_encode(['result'=>false,'error'=>'Chamados não encontrados']));
    }
}

buscar($pdo);