<?php
session_start();
$_SESSION['cTkn'] ??= bin2hex(random_bytes(32));
header('Content-Type: application/json');
echo json_encode(['token'=>$_SESSION['cTkn']]);
?>