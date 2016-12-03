<?php
$netid = $_POST["netid"];
$eventid = $_POST["eventid"];

$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

mysqli_select_db($link,'databse') or die('Could not select databse');

$eventid = intval($eventid);

$sql = "DELETE FROM attendance_issues WHERE attendance_issues.netid = \"$netid\" AND attendance_issues.eventid = $eventid;";

$result = mysqli_query($link,$sql) or die('Query failed: ' . mysql_error());

if($result){
	echo "Deletion successful.";
} else {
	echo "Deletion failed.";
}

?>
