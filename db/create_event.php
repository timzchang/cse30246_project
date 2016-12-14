<?php
# get the information from the post command
$event_type = $_POST["event_type"];
$date = $_POST["date"];

# link to the database
$link = mysqli_connect('localhost','csyers','trombone') or die('could not connect: ' . mysql_error());

# connect to the databse
mysqli_select_db($link,'databse') or die('could not select databse');

# sql query to get the event requested
$sql = "select MAX(eventid) from events;";

# run the sql query and store the result
$result = mysqli_query($link,$sql) or die('query failed" ' . mysql_error());

# if there was an event that mathed the information
if($result->num_rows != 0){

    $row = $result->fetch_row();
    $eventid = $row[0];
    $eventid = $eventid + 1;
    # sql query to run the update
    if($event_type == "Practice"){
        $start_time = "18:30:00";
        $end_time = "20:00:00";
    } else if ($event_type == "Marchout"){
        $start_time = "16:30:00";
        $end_time = "18:00:00";
    } else if ($event_type == "Game"){
        $start_time = "14:00:00";
        $end_time = "19:00:00";
    }

    $date = date_create_from_format('Y-m-d',$date);
    $date_string = $date->format('Y-m-d');
    $sql = "SELECT * FROM events where date = \"$date_string\";";
    
    $result = mysqli_query($link,$sql) or die('query failed: ' . mysql_error());
    if($result->num_rows == 0){

        $sql = "INSERT INTO events VALUES ($eventid,\"$event_type\",\"$date_string\",\"$start_time\",\"$end_time\");";
        # get the result of the update
        $result = mysqli_query($link,$sql) or die('query failed: ' . mysql_error());

        # if result was success, tell front end
        if($result){
            $response = array();
	    array_push($response,"0");
	    array_push($response,"Creation successful.");
            header('content-type: application/json');
            echo json_encode($response);
        } else {
            $response = array();
	    array_push($response,"1");
	    array_push($response,"Creation failed.");
            header('content-type: application/json');
            echo json_encode($response);
        }
    } else {
        $response = array();
	array_push($response,"3");
        $date_string = $date->format('l, F d, Y');
        array_push($response,"There is already an event on $date_string.");
 
        header('content-type: application/json');
        echo json_encode($response);
    }
} else {
    # if there was no event on that date, return that information to the user
    $response = array();
    array_push($response,"2");
    array_push($response,"Failed to retreive maximum eventid.");
   
    header('content-type: application/json');
    echo json_encode($response);
}

?>
