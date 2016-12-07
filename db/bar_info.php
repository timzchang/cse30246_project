<?php

$start_date = $_POST["start_date"];
$end_date = $_POST["end_date"];

# link to dsg
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# link to databse
mysqli_select_db($link,'databse') or die('Could not select databse');

# get the event idea from the events table

$sql = "SELECT J.section, excused_late, unexcused_late, excused_absent, unexcused_absent, total, Ifnull(members,0) as members FROM
(SELECT section, excused_late, unexcused_late, excused_absent, unexcused_absent, (excused_late + unexcused_late + excused_absent + unexcused_absent) as total FROM
(SELECT G.section,
	excused_late,
	unexcused_late,
	excused_absent,
	Ifnull(unexcused_absent,0) AS unexcused_absent
FROM
(SELECT E.section,
		excused_late,
		unexcused_late,
		Ifnull(excused_absent,0) AS excused_absent
FROM 
(SELECT    C.section, 
          excused_late, 
          Ifnull(unexcused_late,0) AS unexcused_late 
FROM      ( 
                    SELECT    A.section, 
                              Ifnull(excused_late,0) AS excused_late 
                    FROM      ( 
                                       SELECT   section 
                                       FROM     students 
                                       GROUP BY section) A 
                    LEFT JOIN 
                              ( 
                                       SELECT   section, 
                                                Count(*) AS excused_late 
                                       FROM     attendance_issues, 
                                                students, 
                                                events 
                                       WHERE    events.eventid = attendance_issues.eventid 
                                       AND      events.date >= '$start_date' 
                                       AND      events.date <= '$end_date' 
                                       AND      students.netid = attendance_issues.netid 
                                       AND      attendance_issues.excused = 'Y' 
                                       AND      attendance_issues.absence_type = 'L' 
                                       GROUP BY section) B 
                    ON        A.section = B.section) C 
LEFT JOIN 
          ( 
                   SELECT   section, 
                            Count(*) AS unexcused_late 
                   FROM     attendance_issues, 
                            students, 
                            events 
                   WHERE    events.eventid = attendance_issues.eventid 
                   AND      events.date >= '$start_date' 
                   AND      events.date <= '$end_date' 
                   AND      students.netid = attendance_issues.netid 
                   AND      attendance_issues.excused = 'N' 
                   AND      attendance_issues.absence_type = 'L' 
                   GROUP BY section) D 
ON        C.section = D.section) E
LEFT JOIN
			(
                   SELECT   section, 
                            Count(*) AS excused_absent
                   FROM     attendance_issues, 
                            students, 
                            events 
                   WHERE    events.eventid = attendance_issues.eventid 
                   AND      events.date >= '$start_date' 
                   AND      events.date <= '$end_date' 
                   AND      students.netid = attendance_issues.netid 
                   AND      attendance_issues.excused = 'Y' 
                   AND      attendance_issues.absence_type = 'A' 
                   GROUP BY section) F
ON 			E.section = F.section) G
LEFT JOIN
			(
                   SELECT   section, 
                            Count(*) AS unexcused_absent
                   FROM     attendance_issues, 
                            students, 
                            events 
                   WHERE    events.eventid = attendance_issues.eventid 
                   AND      events.date >= '$start_date' 
                   AND      events.date <= '$end_date' 
                   AND      students.netid = attendance_issues.netid 
                   AND      attendance_issues.excused = 'N' 
                   AND      attendance_issues.absence_type = 'A' 
                   GROUP BY section) H
ON 			G.section = H.section) I ORDER BY total) J
LEFT JOIN
(
SELECT section, COUNT(*) as members FROM students GROUP BY section
) K ON J.section = K.section;";

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
