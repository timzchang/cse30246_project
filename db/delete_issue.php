
<?php
$netid = $_POST["netid"];
$eventid = $_POST["eventid"];

$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

mysqli_select_db($link,'databse') or die('Could not select databse');

$eventid = intval($eventid);

$sql = "DELTE FROM attendance_issue WHERE attendance_issue.netid = \"$netid\" AND attendance_issue.evenid = $eventid;";

$result = mysqli_query($link,$sql) or die('Query failed: ' . mysql_error());

if($result){
	echo "Deletion failed."
} else {
	echo "Deletion successful."
}

?>
