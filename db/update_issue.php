<?php
# get the information from the POST command
$netid = $_POST["netid"];
$date = $_POST["date"];
$event_type = $_POST["event_type"];
$absence_type = $_POST["absence_type"];
$excused = $_POST["excused"];

# link to the database
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# connect to the databse
mysqli_select_db($link,'databse') or die('Could not select databse');

# SQL query to get the event requested
$sql = "SELECT eventid FROM events WHERE date = '$date' AND type = '$event_type'";

# run the SQL query and store the result
$result = mysqli_query($link,$sql) or die('Query failed" ' . mysql_error());

# if there was an event that mathed the information
if($result->num_rows != 0){
    # get the first row
    $row = $result->fetch_row();
    # get the event ID from the row
    $eventid = $row[0];
    # SQL query to run the update
    $sql = "UPDATE attendance_issues SET attendance_issues.absence_type = '$absence_type', attendance_issues.excused = '$excused' WHERE attendance_issues.netid = \"$netid\" AND attendance_issues.eventid = $eventid;";

    # get the result of the update
    $result = mysqli_query($link,$sql) or die('Query failed: ' . mysql_error());

    # if result was success, tell front end
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

} else {
    # if there was no event on that date, return that information to the user
    $date = date_create_from_format('Y-m-d',$date);
    $date = $date->format('l, F d, Y');
    $response = array();
    array_push($response,"2");
    array_push($response,"There is no event on $date.");
    header('content-type: application/json');
    echo json_encode($response);
}

?>
