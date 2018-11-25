<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

$pdo = include "../pdo.php";

function update($pdo, $id, $estado) {
    $query = "UPDATE chamado SET estado = :estado WHERE id_chamado = :id";
    $update = $pdo->prepare($query);
    $update->bindParam('id',$id,PDO::PARAM_INT);
    if ($estado == 1) {
        $estado = 0;
    } else if ($estado == 0){
        $estado = 1;
    }
    $update->bindParam('estado',$estado,PDO::PARAM_INT);
    $update->execute();
}

try{
    update($pdo, $_GET['id_chamado'], $_GET['estado']);
} catch(PDOException $e){
    echo $e->getMessage();
}