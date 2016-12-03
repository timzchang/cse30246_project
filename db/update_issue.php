<?php
$netid = $_POST["netid"];
$date = $_POST["date"];
$event_type = $_POST["event_type"];
$absence_type = $_POST["absence_type"];
$excused = $_POST["excused"];

$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

mysqli_select_db($link,'databse') or die('Could not select databse');

$sql = "SELECT eventid FROM events WHERE date = $date";
$result = mysqli_query($link,$sql) or die('Query failed" ' . mysql_error());

if($result->num_rows == 0){
    $obj = $result->fetch_row();
    $eventid = $obj->eventid;
    $sql = "UPDATE attendance_issues SET attendance_issues.absence_type = '$absence_type', attendance_issues.excused = '$excused' WHERE attendance_issues.netid = \"$netid\" AND attendance_issues.eventid = $eventid;";

    $result = mysqli_query($link,$sql) or die('Query failed: ' . mysql_error());

    if($result){
	    echo "Update successful.";
    } else {
	    echo "Update failed.";
    }
} else {
    echo "There is not event on $date.";
}

?>
