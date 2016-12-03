<?php
# get information from POST command
$netid = $_POST["netid"];
$eventid = $_POST["eventid"];

# connect to dsg
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# connect to databse
mysqli_select_db($link,'databse') or die('Could not select databse');

# convert eventid to an integer
$eventid = intval($eventid);

# SQL query to delete the attendance issue
$sql = "DELETE FROM attendance_issues WHERE attendance_issues.netid = \"$netid\" AND attendance_issues.eventid = $eventid;";

# run the query and get the result
$result = mysqli_query($link,$sql) or die('Query failed: ' . mysql_error());

# if success, tell the front end
if($result){
	echo "Deletion successful.";
} else {
	echo "Deletion failed.";
}

?>
