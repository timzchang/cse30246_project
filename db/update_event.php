<?php
# get the information from the POST command
$event_type = $_POST["event_type"];
$date = $_POST["date"];
$old_eventid = $_POST["old_eventid"];

# link to the database
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# connect to the databse
mysqli_select_db($link,'databse') or die('Could not select databse');

# SQL query to get the event requested
$sql = "UPDATE events SET date = \"$date\", type = \"$event_type\" WHERE eventid = $old_eventid;";

# run the SQL query and store the result
$result = mysqli_query($link,$sql) or die('Query failed" ' . mysql_error());

if($result){
    $response = array();
    array_push($response,"0");
    array_push($response,"Update successful.");
} else {
    $response = array();
    array_push($response,"1");
    array_push($response,"Update failed.");
}
   
header('content-type: application/json');
echo json_encode($response);

?>
