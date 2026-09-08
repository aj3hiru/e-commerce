<?php
function minifyHTML($b){
    $s=['/<!--[\s\S]*?-->/','/\>[^\S ]+/s','/[^\S ]+\</s','/(\s)+/s','/\/\*[\s\S]*?\*\//'];
    $r=['','>','<','\\1',''];
    return preg_replace($s,$r,$b);
}
ob_start("minifyHTML");