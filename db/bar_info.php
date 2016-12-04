<?php

# link to dsg
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# link to databse
mysqli_select_db($link,'databse') or die('Could not select databse');

# get the event idea from the events table
$sql = "SELECT A.section, A.excused_late, B.unexcused_late, C.excused_absent, D.unexcused_absent, (A.excused_late+B.unexcused_late+C.excused_absent+D.unexcused_absent) as total FROM (SELECT section, COUNT(*) AS excused_late FROM attendance_issues, students WHERE students.netid = attendance_issues.netid AND attendance_issues.excused = 'Y' AND attendance_issues.absence_type = 'L' GROUP BY section) A, (SELECT section, COUNT(*) AS unexcused_late FROM attendance_issues, students WHERE students.netid = attendance_issues.netid AND attendance_issues.excused = 'N' AND attendance_issues.absence_type = 'L' GROUP BY section) B, (SELECT section, COUNT(*) AS excused_absent FROM attendance_issues, students WHERE students.netid = attendance_issues.netid AND attendance_issues.excused = 'Y' AND attendance_issues.absence_type = 'A' GROUP BY section) C, (SELECT section, COUNT(*) AS unexcused_absent FROM attendance_issues, students WHERE students.netid = attendance_issues.netid AND attendance_issues.excused = 'N' AND attendance_issues.absence_type = 'A' GROUP BY section) D WHERE A.section = B.section AND B.section = C.section AND C.section = D.section ORDER BY total;"

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
