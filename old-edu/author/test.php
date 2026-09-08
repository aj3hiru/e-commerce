<?php

require __DIR__ . '/vendor/autoload.php';

use Minishlink\WebPush\VAPID;

header('Content-Type: text/plain; charset=utf-8');

try {
    $keys = VAPID::createVapidKeys();

    echo "VAPID Keys Generated Successfully\n\n";

    echo "Public Key:\n";
    echo $keys['publicKey'] . "\n\n";

    echo "Private Key:\n";
    echo $keys['privateKey'] . "\n\n";

    echo "Config Example:\n\n";

    echo '$config["vapid"] = [' . "\n";
    echo "    'subject' => 'mailto:admin@edumint24.com'," . "\n";
    echo "    'publicKey' => '" . $keys['publicKey'] . "'," . "\n";
    echo "    'privateKey' => '" . $keys['privateKey'] . "'," . "\n";
    echo "];" . "\n";

} catch (Throwable $e) {
    http_response_code(500);

    echo "Error generating VAPID keys:\n";
    echo $e->getMessage();
}