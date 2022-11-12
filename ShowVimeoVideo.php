<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
</head>

<body>
<?php
$vimeocode = "487203234";
$height = 2;
$start = "#t=1m2s";
// $start = "";
$w = 500;
$h = 330;
$str;

if (isset($_GET['height'])) {
    //echo "URL parameter Height = " . $_GET['height'];
	$height = $_REQUEST['height'];
} else {
    // Fallback behaviour goes here
}

if ($height == 0) {
    $w = 300;
    $h = 50;
} elseif ($height == 1) {
    $w = 200;
    $h = 50;
} elseif ($height == 2) {
    $w = 500;
    $h = 330;
} else {
    $w = 300;
    $h = 50;
}

if (isset($_GET['url'])) {
	$url = $_REQUEST['url'];
    //echo "URL parameter = " . $url . "<br>";
    echo "<iframe width=$w height=$h src=\"$url\" frameborder=\"0\" allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe>";
} else {
    // Fallback behaviour goes here
    if (isset($_GET['vimeocode'])) {
        //echo "URL parameter Link = " . $_GET['ytcode'];
        $vimeocode = $_GET['vimeocode'];
        $str = $vimeocode . $start . "?autoplay=1&title=0&byline=0&portrait=0&badge=0";
    } else {
        // Fallback behaviour goes here
        $str = $vimeocode . $start . "?autoplay=1&title=0&byline=0&portrait=0&badge=0";
    }
    echo "<iframe width=$w height=$h src=\"https://player.vimeo.com/video/$str\" frameborder=\"0\" allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe>";
}
?>

<?php
	//echo "<br>Link $vimeocode";
    //echo "<br>Link " . $_REQUEST['link'];
    //echo "<br>Height $height";
	//echo "<br>Vimeo Video $str";
?>

</body>
</html>