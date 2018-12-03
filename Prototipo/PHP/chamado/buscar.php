<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

$pdo = include "../pdo.php";

function buscar($pdo, $estado = null, $id_usuario = null) {
    if(isset($estado) && isset($id_usuario){
        $get = $pdo->prepare(
        "SELECT id_chamado, latitude, longitude, nome, descricao, estado FROM chamado WHERE estado = :estado AND id_usuario = :id_usuario"
        );
        $get->bindParam('estado',$estado,PDO::PARAM_INT);
        $get->bindParam('id_usuario',$id_usuario,PDO::PARAM_INT);
    } elseif (isset($estado) && !isset($id_usuario)){
        $get = $pdo->prepare(
        "SELECT id_chamado, latitude, longitude, nome, descricao, estado FROM chamado WHERE estado = :estado"
        );
        $get->bindParam('estado',$estado,PDO::PARAM_INT);
    } else{
        $get = $pdo->prepare(
        "SELECT id_chamado, latitude, longitude, nome, descricao, estado FROM chamado"
        );
    }
    $get->execute();
    if($get->rowCount()>0){
        die(json_encode(['result'=>true,'body'=>$get->fetchAll(PDO::FETCH_ASSOC)]));
    } else {
        die(json_encode(['result'=>false,'error'=>'Chamados não encontrados']));
    }
}

if(isset($_GET['estado']) && isset($_GET['id_usuario'])){
    buscar($pdo,$_GET['estado'], $_GET['id_usuario']);
}else if (isset($_GET['estado']) && !isset($_GET['id_usuario'])){
    buscar($pdo, $_GET['estado']);
} else {
    buscar($pdo);
}