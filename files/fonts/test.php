<?php
header('Content-Type: image/png');
$im = imagecreatetruecolor(600, 100);
$white = imagecolorallocate($im, 255, 255, 255);
imagefill($im, 0, 0, $white);
$black = imagecolorallocate($im, 0, 0, 0);
$font = dirname(__FILE__) . '/DejaVuSans.ttf';
$text = "España á é í ó ú";
imagettftext($im, 30, 0, 10, 60, $black, $font, $text);
imagepng($im);
imagedestroy($im);
?>