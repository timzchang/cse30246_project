<?php
$netid = $_GET["netid"];

if (!$netid) {
    return;
}

$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

mysqli_select_db($link,'databse') or die('Could not select databse');

$sql = "SELECT * FROM attendance_issues WHERE attendance_issues.netid LIKE \"%$netid%\";";

$result = mysqli_query($link,$sql) or die('Query failed: ' . mysql_error());

echo "<table class=\"table table-bordered\">\n";
echo"    <thead>
      <tr>
        <th>netid</th>
        <th>Event</th>
        <th>Late/Absent</th>
	<th>Excused?</th>
      </tr>
    </thead>";
while ($tuple = mysqli_fetch_array($result, MYSQL_ASSOC)) {
    echo "\t<tr>\n";
    foreach ($tuple as $col_value) {
        echo "\t\t<td>$col_value</td>\n";
    }
    echo "\t</tr>\n";
}
echo "</table>\n";

?>
