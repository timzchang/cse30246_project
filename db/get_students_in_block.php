<?php

# get information from POST command
$block = $_POST["block"];
$date = $_POST["date"];

# link to dsg
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# link to database
mysqli_select_db($link,'databse') or die('Could not select databse');

# get the list of students in the block from the students table

$sql = "
SELECT date, students.netid, lname, fname, excused
FROM students
LEFT JOIN (
  SELECT date, netid, excused
  FROM events, attendance_issues
  WHERE events.eventid = attendance_issues.eventid
  AND events.date = '2016-11-16') A
ON students.netid=A.netid
LIMIT 10;"

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

# return table
header('Content-Type: application/json');
echo json_encode($response);

?>
