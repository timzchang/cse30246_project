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
    }).done(function(attn, status){
	if (!Array.isArray(attn)) {
		console.log("not array");
	}
	var $table = $("table tbody").html('');
    //$table += "<table class=\"table table-bordered\">\n";
    //$table += "    <thead> <tr> <th>netid</th> <th>Event</th> <th>Late/Absent</th> <th>Excused?</th> </tr> </thead>";

    for (var i = 0; i < attn.length; i++) {
	var excused = (attn[i].excused == 'Y') ? "Yes" : "No";
	var absence_type = (attn[i].absence_type == 'A') ? "Absent" : "Late";
        $row = $('<tr id="row-' + i + '">'+
            '<td>' + attn[i].netid + '</td>' +
            '<td>' + attn[i].eventid + '</td>' +
            '<td>' + absence_type + '</td>' +
            '<td>' + excused + '</td>'+
            '<td><a class="edit-issue" href="#"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>' +
            '<a class="remove-issue" href="#"><span class="glyphicon glyphicon-trash"></span></td><tr>'
            );

        $row.find('.edit-issue').data(attn[i]);
        $row.find('.remove-issue').data(attn[i]);
	//console.log($row);

        //$("#resp_table").html($row);
	$table.append($row);
    };
    //$("#resp_table").html($table);

	
        
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
        // $("#resp_table").html(data);
    }).fail(function (err) {
        console.log(err);
        $('.alert-danger .msg').html('Failed to connect to database!');
        $('.alert-danger').slideDown();
    });
}
