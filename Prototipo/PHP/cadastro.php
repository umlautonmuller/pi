<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

$pdo = include "pdo.php";
$userData = json_decode(file_get_contents("php://input"),true);

function inserir($pdo,$userData){
    $get = $pdo->prepare("INSERT INTO usuario(nome, email, senha) VALUES (:nomeU,:emailU,:senhaU)");
    $get->execute([
        'nomeU' => $userData['nome'],
        'emailU' => $userData['email'],
        'senhaU' => md5('bolodemilho*!!-'.$userData['senha'])
    ]);
    die(json_encode(array('result' => true)));
}

function checkAlready($pdo,$userData){
    $get = $pdo->prepare(
        "SELECT * FROM usuario WHERE email LIKE :emailuser;"
    );
    $get->execute([
        'emailuser' => $userData['email']
    ]);
    if($get->rowCount()>0){
        return true;
    }
}

try {
    if(checkAlready($pdo,$userData)){
        die(json_encode(array('result' => false,'body'=>'Email já cadastrado')));
    }
    inserir($pdo,$userData);
} catch(Exception $e){
    die(json_encode(array('result' => false,'body'=>'Erro ao inserir:'.$e->getMessage())));
}