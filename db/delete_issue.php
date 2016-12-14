<?php
# get information from POST command
$netid = $_POST["netid"];
$date = $_POST["date"];

# connect to dsg
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# connect to databse
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

    # SQL query to delete the attendance issue
    $sql = "DELETE FROM attendance_issues WHERE attendance_issues.netid = \"$netid\" AND attendance_issues.eventid = $eventid;";

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
