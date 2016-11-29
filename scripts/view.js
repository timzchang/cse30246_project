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
	//console.log(data)
	var $table = "";
    $table += "<table class=\"table table-bordered\">\n";
    $table += "    <thead>
                <tr>
                <th>netid</th>
                <th>Event</th>
                <th>Late/Absent</th>
                <th>Excused?</th>
                </tr>
                </thead>";

    $("#resp_table").html($table);
    for (var i = 0; i < attn.length; i++) {
        $row = $('<tr id="row-' + i + '">'+
            '<td>' + attn[i].netid + '</td>' +
            '<td>' + attn[i].eventid + '</td>' +
            '<td>' + attn[i].absent_type + '</td>' +
            '<td>' + attn[i].netid + '</td>' +
            '<td>' + attn[i].excused + '</td>'+
            '<td><a class="edit-issue" href="#"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>' +
            '<a class="remove-issue" href="#"><span class="glyphicon glyphicon-trash"></span></td><tr>'
            );

        $row.find('.edit-issue').data(attn[i]);
        $row.find('.remove-issue').data(attn[i]);

        $("#resp_table").html($row);
    };

	
        
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
