<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
</head>

<body>
<?php
$ytcode = "VqoyKzgkqR4";
$height = 1;
$start = 0;
$end = 0;
$w = 300;
$h = 50;

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

if (isset($_GET['ytcode'])) {
    //echo "URL parameter Link = " . $_GET['ytcode'];
	$ytcode = $_GET['ytcode'];
	$str = $ytcode . "?rel=0";
} else {
	// Fallback behaviour goes here
	$str = $ytcode . "?rel=0";
}
if (isset($_GET['start'])) {
    //echo "URL parameter Start = " . $_REQUEST['start'];
	$start = $_GET['start'];
	$str = $str . "&start=" . $start;
} else {
	// Fallback behaviour goes here
	$str = $str . "&start=" . $start;
}
if (isset($_GET['end'])) {
    //echo "URL parameter End = " . $_GET['end'];
	$end = $_REQUEST['end'];
	$str = $str . "&end=" . $end;
} else {
    // Fallback behaviour goes here
	$str = $str . "&end=" . $end;
}
?>
<?php
	//echo "<br>Link $ytcode";
    	//echo "<br>Link " . $_REQUEST['link'];
    	//echo "<br>Start $start";
    	//echo "<br>End $end";
    	//echo "<br>Height $height";
	//echo "<br>Youtube Video $str";
?>
<iframe width="<?php print $w;?>" height="<?php print $h;?>" src="https://www.youtube.com/embed/<?php print $str;?>&autoplay=1&mute=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

</body>
</html>