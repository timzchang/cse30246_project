<?php
# get information from GET command
$netid = $_GET["netid"];

# case: netid is empty
if (!$netid) {
    return;
}

# link to dsg
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# connect to databse
mysqli_select_db($link,'databse') or die('Could not select databse');

# check if there is a student in the DB with that student's nnetid
$test = "SELECT * FROM students WHERE netid = \"$netid\";";
$test_result = mysqli_query($link,$test) or die('Test failed: ' . mysql_error());

# return error if no students are in the list
if (!$test_result || mysqli_num_rows($test_result) == 0) {
    echo "none";
    return;
}

# SQL query to get all issues for this student
$sql = "SELECT * FROM attendance_issues a, events e WHERE a.eventid=e.eventid and a.netid LIKE \"%$netid%\";";

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
