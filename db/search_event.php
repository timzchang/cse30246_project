<?php
# get information from get command
$date = $_GET["date"];
# case: netid is empty
if (!$date) {
    return;
}
# link to dsg
$link = mysqli_connect('localhost','csyers','trombone') or die('could not connect: ' . mysql_error());

# connect to databse
mysqli_select_db($link,'databse') or die('could not select databse');

# check if there is a student in the db with that student's nnetid
$sql = "select * from events where date = \"$date\";";
$result = mysqli_query($link,$sql) or die('test failed: ' . mysql_error());

# return error if no students are in the list
if (!$result || mysqli_num_rows($result) == 0) {
    echo "none";
    return;
}

$response = array();

# populate the response array with the rows from the query
if ($result && mysqli_num_rows($result) > 0) {
    while ($row = $result->fetch_array()) {
        $response[] = $row;
    }
}


header('content-type: application/json');
echo json_encode($response);

?>

