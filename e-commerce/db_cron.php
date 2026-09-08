<?php 
// Database Connection
$host = '127.0.0.1';
$port = 3306;
$dbname = 'u881151038_edumint24';
$user = 'u881151038_dbadmin_25';
$pass = 'MEdumint@24'; 


try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

$config = [
    'push_secret' => '7f9c3a1e8b2d4f6g5h7j9k1m3n5p7q9r0s2t4u6v8w0x2y4z',
    'vapid' => [
        'subject'    => 'mailto:admin@edumint24.com',
        'publicKey'  => 'BHE89PpiPS69Y57UhMN4HTkTl16Vm3Pj1OXZ46CMuPiGuLbVE5ndJLSN3YUjGyWN9zpy7Ac08zRhqyCuCWR3wcI',
        'privateKey' => 'agCs58N0PZ6rpIDwFK747qn4b_MhUI2BaeEz_4sWSqI',
    ],
];