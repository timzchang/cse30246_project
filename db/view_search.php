<?php
$netid = $_GET["netid"];

if (!$netid) {
    echo "none";
    return;
}

$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

mysqli_select_db($link,'databse') or die('Could not select databse');

$test = "SELECT * FROM students WHERE netid LIKE \"$netid\";";
$test_result = mysqli_query($link,$test) or die('Test failed: ' . mysql_error());

if (!$test_result || mysqli_num_rows($test_result) == 0) {
    echo "none";
    return;
}

$sql = "SELECT * FROM attendance_issues a, events e WHERE a.eventid=e.eventid and a.netid LIKE \"%$netid%\";";

$result = mysqli_query($link,$sql) or die('Query failed: ' . mysql_error());
$response = array();

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = $result->fetch_array()) {
        $response[] = $row;
    }
}


header('Content-Type: application/json');
echo json_encode($response);

?>
