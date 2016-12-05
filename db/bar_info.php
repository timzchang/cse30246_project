<?php

# link to dsg
$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

# link to databse
mysqli_select_db($link,'databse') or die('Could not select databse');

# get the event idea from the events table

$sql = "SELECT H.section, 
       Ifnull(excused_late, 0)     AS excused_late, 
       Ifnull(unexcused_late, 0)   AS unexcused_late, 
       Ifnull(excused_absent, 0)   AS excused_absent, 
       Ifnull(unexcused_absent, 0) AS unexcused_absent,
       (Ifnull(excused_late, 0) + Ifnull(unexcused_late, 0) + Ifnull(excused_absent, 0) + Ifnull(unexcused_absent, 0)) AS total
FROM   (SELECT G.section, 
               excused_late, 
               unexcused_late, 
               excused_absent 
        FROM   (SELECT D.section, 
                       excused_late, 
                       unexcused_late 
                FROM   (SELECT A.section, 
                               B.excused_late 
                        FROM   (SELECT section 
                                FROM   students 
                                GROUP  BY section) A 
                               LEFT JOIN (SELECT section, 
                                                 Count(*) AS excused_late 
                                          FROM   attendance_issues, 
                                                 students 
                                          WHERE  students.netid = 
                                                 attendance_issues.netid 
                                                 AND attendance_issues.excused = 
                                                     'Y' 
                                                 AND 
                                         attendance_issues.absence_type = 
                                         'L' 
                                          GROUP  BY section) B 
                                      ON A.section = B.section) C 
                       LEFT JOIN (SELECT section, 
                                         Count(*) AS unexcused_late 
                                  FROM   attendance_issues, 
                                         students 
                                  WHERE  students.netid = 
                                         attendance_issues.netid 
                                         AND attendance_issues.excused = 'N' 
                                         AND attendance_issues.absence_type = 
                                             'L' 
                                  GROUP  BY section) D 
                              ON C.section = D.section) F 
               LEFT JOIN (SELECT section, 
                                 Count(*) AS excused_absent 
                          FROM   attendance_issues, 
                                 students 
                          WHERE  students.netid = attendance_issues.netid 
                                 AND attendance_issues.excused = 'Y' 
                                 AND attendance_issues.absence_type = 'A' 
                          GROUP  BY section) G 
                      ON F.section = G.section) H 
       LEFT JOIN (SELECT section, 
                         Count(*) AS unexcused_absent 
                  FROM   attendance_issues, 
                         students 
                  WHERE  students.netid = attendance_issues.netid 
                         AND attendance_issues.excused = 'N' 
                         AND attendance_issues.absence_type = 'A' 
                  GROUP  BY section) I 
              ON H.section = I.section ORDER BY total;"

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
