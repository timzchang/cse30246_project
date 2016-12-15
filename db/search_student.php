<?php
# get information from get command
$netid = $_GET["netid"];
# case: netid is empty
if (!$date) {
    return;
}
echo $date;
# link to dsg
$link = mysqli_connect('localhost','csyers','trombone') or die('could not connect: ' . mysql_error());

# connect to databse
mysqli_select_db($link,'databse') or die('could not select databse');

# check if there is a student in the db with that student's nnetid
$test = "select * from events where date = \"$date\";";
$test_result = mysqli_query($link,$test) or die('test failed: ' . mysql_error());

# return error if no students are in the list
if (!$test_result || mysqli_num_rows($test_result) == 0) {
    echo "none";
    return;
}

$response = array();

# populate the response array with the rows from the query
if ($test_result && mysqli_num_rows($result) > 0) {
    while ($row = $test_result->fetch_array()) {
        $response[] = $row;
    }
}


header('content-type: application/json');
echo json_encode($response);

?>

