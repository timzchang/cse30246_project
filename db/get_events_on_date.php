<?php
# get information from GET command
$date = $_GET["date"];

# link to dsg
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# connect to databse
mysqli_select_db($link,'databse') or die('Could not select databse');

$sql = "SELECT students.netid, events.date, events.type, attendance_issues.absence_type, attendance_issues.excused from students, events, attendance_issues WHERE events.date = '$date' AND events.eventid = attendance_issues.eventid AND attendance_issues.netid = students.netid;";

# get the result of the query
$result = mysqli_query($link,$sql) or die('Query failed: ' . mysql_error());
$response = array();

# if no issues exist:
if ($result && mysqli_num_rows($result) == 0) {
    echo "empty";
    return;
}

# populate the response array with the rows from the query
if ($result && mysqli_num_rows($result) > 0) {
    while ($row = $result->fetch_array()) {
        $response[] = $row;
    }
}


header('Content-Type: application/json');
echo json_encode($response);

?>
