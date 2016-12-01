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

$("#closebtn").on('click', function (event) {
    $('.alert-danger').slideUp();
})

function submitForm () {
    var netid = $("#netid").val();
    $.get({
        url: "../db/view_search.php",
        data: {
            netid: netid
        }
    }).done(function(attn, status){
    	if (!Array.isArray(attn)) {
            if (attn == "none") {
                console.log("invalid netid");
                $('.alert-danger .msg').html('Invalid netid!');
                $('.alert-danger').slideDown();
                return;
            };
    		console.log("not array");
		console.log(attn);
            return;
    	}
        $('.alert-danger').slideUp();

    	var $table = $("table tbody").html('');

        for (var i = 0; i < attn.length; i++) {
    	    var excused = (attn[i].excused == 'Y') ? "Yes" : "No";
    	    var absence_type = (attn[i].absence_type == 'A') ? "Absent" : "Late";
            var date = attn[i].date;
            $row = $('<tr id="row-' + i + '">'+
                '<td>' + attn[i].netid + '</td>' +
                '<td>' + attn[i].date + '</td>' +
                '<td>' + attn[i].type + '</td>' +
                '<td>' + absence_type + '</td>' +
                '<td>' + excused + '</td>'+
                '<td><a class="edit-issue" href="#"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>' +
                '<a class="remove-issue" href="#"><span class="glyphicon glyphicon-trash"></span></td><tr>'
                );

            $row.find('.edit-issue').data(attn[i]);
            $row.find('.remove-issue').data(attn[i]);
        	$table.append($row);
        };
    }).fail(function (err) {
        console.log(err);
        $('.alert-danger .msg').html('Failed to connect to database!');
        $('.alert-danger').slideDown();
    });
}
