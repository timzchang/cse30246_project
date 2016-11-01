<?php
$netid = $_POST["netid"];
$eventid = $_POST["eventid"];
$absence_type = $_POST["absence_type"];
$excused = $_POST["excused"];

$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

mysqli_select_db($link,'databse') or die('Could not select databse');

$eventid = intval($eventid);

if($excused == "select" and $absence_type == "select") {
} else if($excused == "select") {
	$sql = "UPDATE attendance_issues SET attendance_issues.absence_type = '$absence_type' WHERE attendance_issues.netid = \"netid\" AND attendance_issues.evenid = $eventid;";
} else if($absence_type == "select"){
	$sql = "UPDATE attendance_issues SET attendace_issues.excused = '$excused' WHERE attendance_issues.netid = \"netid\" AND attendance_issues.evenid = $eventid;";
} else {
	$sql = "UPDATE attendance_issues SET attendance_issues.absence_type = '$absence_type', attendace_issues.excused = '$excused' WHERE attendance_issues.netid = \"netid\" AND attendance_issues.evenid = $eventid;";
}

$result = mysqli_query($link,$sql) or die('Query failed: ' . mysql_error());

if($result){
	echo "Update failed.";
} else {
	echo "Update successful.";
}

?>
