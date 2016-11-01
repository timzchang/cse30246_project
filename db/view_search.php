<?php
$netid = $_POST["netid"];

$link = mysqli_connect('localhost','csyers','trombone') or die('Could not connect: ' . mysql_error());

mysqli_select_db($link,'databse') or die('Could not select databse');

$sql = "SELECT * FROM attendance_issue WHERE attendance_issue.netid LIKE $netid;";

$result = mysqli_query($link,$sql) or die('Query failed: ' . mysql_error());

echo "<table>\n";
while ($tuple = mysqli_fetch_array($result, MYSQL_ASSOC)) {
    echo "\t<tr>\n";
    foreach ($tuple as $col_value) {
        echo "\t\t<td>$col_value</td>\n";
    }
    echo "\t</tr>\n";
}
echo "</table>\n";

?>
