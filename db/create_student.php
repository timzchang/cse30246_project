<?php
# get the information from the POST command
$lname = $_POST["lname"];
$fname = $_POST["fname"];
$section = $_POST["section"];
$netid = $_POST["netid"];
$yog = $_POST["yog"]
$school = $_POST["school"];
$block = $_POST["block"];

# link to the database
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# connect to the databse
mysqli_select_db($link,'databse') or die('Could not select databse');

# SQL query to get the event requested
$sql = "SELECT * FROM students WHERE netid = '$netid';";

# run the SQL query and store the result
$result = mysqli_query($link,$sql) or die('Query failed" ' . mysql_error());

# if there was an event that mathed the information
if($result->num_rows == 0){
    # SQL query to run the update
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
    $sql = "INSERT INTO TABLE students VALUES (\"$lname\",\"$fname\",\"$section\",\"$netid\",$yog,\"$school\",\"$block\");";

    # get the result of the update
    $result = mysqli_query($link,$sql) or die('Query failed: ' . mysql_error());

    # if result was success, tell front end
    if($result){
	    $response = array();
	    array_push($response,"0");
	    array_push($response,"Update successful.");
    } else {
	    $response = array();
	    array_push($response,"1");
	    array_push($response,"Update failed.");
    }

    header('Content-Type: application/json');
    echo json_encode($response);

} else {
    # if there was no event on that date, return that information to the user
    $response = array();
    array_push($response,"2");
    array_push($response,"Student with netid \"$netid\" already exists in database.");
   
    header('Content-Type: application/json');
    echo json_encode($response);
}

?>
