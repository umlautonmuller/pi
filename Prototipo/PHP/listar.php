<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

$pdo = include "pdo.php";

if(!isset($_GET['email']) && !isset($_GET['senha'])){
    die(json_encode(['result'=>false,'error'=>'Bote direito os baguio caraio']));
}
function listar($pdo) {
    $get = $pdo->prepare(
        "SELECT id_usuario as id FROM usuario WHERE email = :emailuser AND senha = :senhauser"
    );
    $get->execute([
        'emailuser' => $_GET['email'],
        'senhauser' => md5('bolodemilho*!!-'.$_GET['senha'])
    ]);
    if($get->rowCount()>0){
        die(json_encode(['result'=>true,'id'=>$get->fetch(PDO::FETCH_ASSOC)['id']]));
    } else {
        die(json_encode(['result'=>false,'error'=>'Usuário não encontrado']));
    }
}

listar($pdo);
