<?php
# get information from get command
$netid = $_get["netid"];

# case: netid is empty
if (!$netid) {
    return;
}

# link to dsg
$link = mysqli_connect('localhost','csyers','trombone') or die('could not connect: ' . mysql_error());

# connect to databse
mysqli_select_db($link,'databse') or die('could not select databse');

# check if there is a student in the db with that student's nnetid
$test = "select * from students where netid = \"$netid\";";
$test_result = mysqli_query($link,$test) or die('test failed: ' . mysql_error());

# return error if no students are in the list
if (!$test_result || mysqli_num_rows($test_result) == 0) {
    echo "none";
    return;
}

# sql query to get all issues for this student
$sql = "select * from attendance_issues a, events e where a.eventid=e.eventid and a.netid like \"%$netid%\";";

# get the result of the query
$result = mysqli_query($link,$sql) or die('query failed: ' . mysql_error());
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


header('content-type: application/json');
echo json_encode($response);

?>
