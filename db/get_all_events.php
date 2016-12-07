<?php


# link to the database
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# connect to the databse
mysqli_select_db($link,'databse') or die('Could not select databse');

# SQL query to get the event requested

$sql = "SELECT * FROM events;";

# run the SQL query and store the result
$result = mysqli_query($link,$sql) or die('Query failed" ' . mysql_error());

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
