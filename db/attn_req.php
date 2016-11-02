<?php
$netid = $_POST["netid"];
$eventid = $_POST["eventid"];
$absence_type = $_POST["absence_type"];
$excused = $_POST["excused"];

$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

mysqli_select_db($link,'databse') or die('Could not select databse');

$eventid = intval($eventid);

$sql = "INSERT INTO attendance_issues VALUES (\"$netid\",$eventid,\"$absence_type\",\"$excused\");";

$result = mysqli_query($link,$sql) or die('Query failed: ' . mysql_error());

if($result) {
	echo "Created new attendance issue.";
} else {
	echo "Error: attendance issue not created.";
}

?>
