<?php

# get information from POST command
$netid = $_POST["netid"];
$date = $_POST["date"];
$absence_type = $_POST["absence_type"];
$excused = $_POST["excused"];

# link to dsg
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# link to databse
mysqli_select_db($link,'databse') or die('Could not select databse');

# get the event idea from the events table
$sql = "SELECT eventid FROM events WHERE date = '$date'";

# run the SQL command
$result = mysqli_query($link,$sql) or die('Query failed" ' . mysql_error());

# if there was an event that mathed the information
if($result->num_rows != 0){
    # get the first row
    $row = $result->fetch_row();
    $eventid = $row[0];

    $sql = "INSERT INTO attendance_issues VALUES (\"$netid\",$eventid,\"$absence_type\",\"$excused\");";

    $result = mysqli_query($link,$sql) or die('Query failed: ' . mysql_error());

    if($result) {
    	echo "Created new attendance issue.";
    } else {
        echo "Error: attendance issue not created.";
    }
} else {
    # if there was no event on that date, return that information to the user
    $date = date_create_from_format('Y-m-d',$date);
    $date = $date->format('l, F d, Y');
    echo "There is no $event_type event on $date.";
}

?>
