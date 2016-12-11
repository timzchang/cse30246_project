<?php

# get the information from the POST command
$date = $_GET["date"];

# link to the database
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# connect to the databse
mysqli_select_db($link,'databse') or die('Could not select databse');

# SQL query to get the event requested

$sql = "SELECT type FROM events WHERE date = '$date'";

# run the SQL query and store the result
$result = mysqli_query($link,$sql) or die('Query failed" ' . mysql_error());

if($result->num_rows != 0){
    # get first row
    $row = $result->fetch_row();
    # get event type from the row
    $type = $row[0];
    echo $type;
# if there is no event on the date, return error
} else {
    echo "No event";
}
?>
