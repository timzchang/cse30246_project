<?php

# get information from POST command
$start_date = $_POST["start_date"];
$end_date = $_POST["end_date"];
$sections = $_POST["sections"];
$excused = $_POST["excused"];
$unexcused = $_POST["unexcused"];
$late = $_POST["late"];
$absent = $_POST["absent"];

#$start_date = '2016-08-01';
#$end_date = '2016-12-12';
#$sections = ['Trombone', 'Trumpet'];
#$excused = "Y";
#$unexcused = "Y";
#$late = "Y";
#$absent = "Y";

# link to dsg
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# link to databse
mysqli_select_db($link,'databse') or die('Could not select databse');

# get a date range object to iterate through
$begin = new DateTime("$start_date");
$end = new DateTime("$end_date");
$interval = new DateInterval('P1D');

$period = new DatePeriod($begin,$interval,$end);

# result array
$numbers = array();
$section_numbers = array();
foreach($sections as $section){
	#echo $section;
}
foreach($period as $dt){
	#echo $dt->format('Y-m-d');
}
foreach($sections as $section){
    foreach($period as $dt){
	$dt_str = $dt->format('Y-m-d');
        $sql = "SELECT COUNT(*) from students, events, attendance_issues WHERE events.date >= '$start_date' AND events.date <= '$dt_str' AND events.eventid = attendance_issues.eventid AND attendance_issues.netid = students.netid AND students.section = \"$section\"";
           
        if($excused == "Y" && $unexcused == "Y" && $late == "Y" && $absent == "Y"){
            $sql .= ";";
        } else if ($excused == "Y" && $unexcused == "Y" && $late == "Y" && $absent == "N") {
            $sql .= " AND attendance_issues.absence_type = 'L';";
        } else if ($excused == "Y" && $unexcused == "Y" && $late == "N" && $absent == "Y"){
            $sql .= " AND attendance_issues.absence_type = 'A';";
        } else if ($excused == "Y" && $unexcused == "Y" && $late == "N" && $absent == "N"){
            echo "Error: must select at least one late/absent";
            return;
        } else if ($excused == "Y" && $unexcused == "N" && $late == "Y" && $absent == "Y"){
            $sql .= " AND attendance_issues.excused = 'Y';";
        } else if ($excused == "Y" && $unexcused == "N" && $late == "Y" && $absent == "N"){
            $sql .= " AND attendance_issues.excused = 'Y' AND attendance_issues.absence_type = 'L';";
        } else if ($excused == "Y" && $unexcused == "N" && $late == "N" && $absent == "Y"){
            $sql .= " AND attendance_issues.excused = 'Y' AND attendance_issues.absence_type = 'A';";
        } else if ($excused == "Y" && $unexcused == "N" && $late == "N" && $absent == "N"){
            echo "Error: must select at least one late/absent";
            return;
        } else if ($excused == "N" && $unexcused == "Y" && $late == "Y" && $absent == "Y"){
            $sql .= " AND attendance_issues.excused = 'N';";
        } else if ($excused == "N" && $unexcused == "Y" && $late == "Y" && $absent == "N"){
            $sql .= " AND attendance_issues.excused = 'N' AND attendance_issues.absence_type = 'L';";
        } else if ($excused == "N" && $unexcused == "Y" && $late == "N" && $absent == "Y"){
            $sql .= " AND attendance_issues.excused = 'N' AND attendance_issues.absence_type = 'A';";
        } else if ($excused == "N" && $unexcused == "Y" && $late == "N" && $absent == "N"){
            echo "Error: must select at least one late/absent";
            return;
        } else if ($excused == "N" && $unexcused == "N" && $late == "Y" && $absent == "Y"){
            echo "Error: must select at least one excused/unexcused";
            return;
        } else if ($excused == "N" && $unexcused == "N" && $late == "Y" && $absent == "N"){
            echo "Error: must select at least one excused/unexcused";
            return;
        } else if ($excused == "N" && $unexcused == "N" && $late == "N" && $absent == "Y"){
            echo "Error: must select at least one excused/unexcused";
            return;
        } else if ($excused == "N" && $unexcused == "N" && $late == "N" && $absent == "N"){
            echo "Error: must select at least one excused/unexcused";
            return;
        } else {
	    echo "Error";
	}

#echo $sql;
        $result = mysqli_query($link,$sql) or die('Query failed" ' . mysql_error());
    
        if($result->num_rows != 0){
            # get first row
            $row = $result->fetch_row();
            # get event type from the row
            $number = $row[0];
            $numbers[$dt->format('Y-m-d')] = $number;
            #echo $number;
        # if there is no event on the date, return error
        } else {
            echo "No match";
        }
    }
    $section_numbers[$section] = $numbers;
}
#echo $section_numbers;
#echo $section_numbers["Trombone"]['2016-10-10'];
header('Content-Type: application/json');
echo json_encode($section_numbers);

?>
