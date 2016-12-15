<?php
# get the information from the POST command
$netid = $_POST["netid"];
$lname = $_POST["lname"];
$fname = $_POST["fname"];
$section = $_POST["section"];
$block = $_POST["block"];
$school = $_POST["school"];
$yog = $_POST["yog"];

$year = date("Y");
if($yog == "Freshman"){
    $yog = $year + 4;
} else if ($yog == "Sophomore"){
    $yog = $year + 3;
} else if ($yog == "Junior"){
    $yog = $year + 2;
} else if ($yog == "Senior"){
    $yog = $year + 1;
}

# link to the database
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# connect to the databse
mysqli_select_db($link,'databse') or die('Could not select databse');

# SQL query to get the event requested
$sql = "UPDATE students SET fname = \"$fname\", lname = \"$lname\", section = \"$section\", block = \"$block\", yog = $yog, school = \"$school\" WHERE netid = \"$netid\";";

# run the SQL query and store the result
$result = mysqli_query($link,$sql) or die('Query failed" ' . mysql_error());

if($result){
    $response = array();
    array_push($response,"0");
    array_push($response,"Update successful.");
} else {
    $response = array();
    array_push($response,"1");
    array_push($response,"Update failed.");
}
   
header('content-type: application/json');
echo json_encode($response);

?>
