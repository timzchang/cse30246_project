$("#view").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        console.log("something wrong");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});

function submitForm () {
    console.log("sending");
    var netid = $("#netid").val();
    $.get({
        url: "../db/view_search.php",
        data: {
            netid: netid
        }
    }).done(function(data, status){
	//console.log(data)
	var $table = "";

	$("#resp_table").html($table);
        
        // echo "<table class=\"table table-bordered\">\n";
        // echo"    <thead>
        //       <tr>
        //         <th>netid</th>
        //         <th>Event</th>
        //         <th>Late/Absent</th>
        //  <th>Excused?</th>
        //       </tr>
        //     </thead>";
        // while ($tuple = mysqli_fetch_array($result, MYSQL_ASSOC)) {
        //     echo "\t<tr>\n";
        //     foreach ($tuple as $col_value) {
        //         echo "\t\t<td>$col_value</td>\n";
        //     }
        //     echo "\t</tr>\n";
        // }
        // echo "</table>\n";
        $("#resp_table").html(data);
    }).fail(function (err) {
        console.log(err);
        $('.alert-danger .msg').html('Failed to connect to database!');
        $('.alert-danger').slideDown();
    });
}
