<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

$pdo = include "../pdo.php";

function buscar($pdo, $estado = null) {
    if(isset($estado)){
        $get = $pdo->prepare(
        "SELECT id_chamado, latitude, longitude, nome, descricao, estado FROM chamado WHERE estado = :estado"
        );
        $get->bindParam('estado',$estado,PDO::PARAM_INT);
    }else{
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

if(isset($_GET['estado'])){
    buscar($pdo,$_GET['estado']);
}else{
    buscar($pdo);
}