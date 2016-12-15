<?php
# get information from POST command
$eventid = $_POST["eventid"];

# connect to dsg
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# connect to databse
mysqli_select_db($link,'databse') or die('Could not select databse');

# SQL query to delete the attendance issue
$sql = "DELETE FROM events WHERE eventid = $eventid;";

# run the query and get the result
$result = mysqli_query($link,$sql) or die('Query failed: ' . mysql_error());

# if success, tell the front end
if($result){
    $response = array();
    array_push($response,"0");
    array_push($response,"Deletion successful.");
} else {
    $response = array();
    array_push($response,"1");
    array_push($response,"Deletion failed.");
}   

header('content-type: application/json');
echo json_encode($response);
   
?>
