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
$("#success-closebtn").on('click', function (event) {
    $('.alert-success').slideUp();
})

function formatDate(date) {
    var new_date = date.split("-");
    return new_date[1] + "/" + new_date[2] + "/" + new_date[0];
}

function submitForm () {
    var netid = $("#netid").val();
    $.get({
        url: "../db/view_search.php",
        data: {
            netid: netid
        }
    }).done(function(attn, status){
            if (!Array.isArray(attn) && attn == "empty") {
                console.log("no absences");
                $('.alert-success .msg').html('No Absences!');
                $('.alert-success').slideDown();
                $('.alert-danger').slideUp();
            attn = [];
            } else
    	if (!Array.isArray(attn)) {
            if (attn == "none") {
                console.log("invalid netid");
                $('.alert-danger .msg').html('Invalid netid!');
                $('.alert-danger').slideDown();
                $('.alert-success').slideUp();
                attn = [];
            };
            console.log("not array");
            console.log(attn);
            return;
    	}
        $('.alert-danger').slideUp();
        if (attn.length != 0) {
            $('.alert-success').slideUp();
        }

    	var $table = $("table tbody").html('');

        for (var i = 0; i < attn.length; i++) {
    	    var excused = (attn[i].excused == 'Y') ? "Yes" : "No";
    	    var absence_type = (attn[i].absence_type == 'A') ? "Absent" : "Late";
            $row = $('<tr id="row-' + i + '">'+
                '<td>' + attn[i].netid + '</td>' +
                '<td>' + formatDate(attn[i].date) + '</td>' +
                '<td>' + attn[i].type + '</td>' +
                '<td>' + absence_type + '</td>' +
                '<td>' + excused + '</td>'+
                '<td><a class="edit" data-toggle="modal" data-target="#edit-issue-modal" href="#"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>' +
                '<a class="remove" data-toggle="modal" data-target="#del-issue-modal" href="#"><span class="glyphicon glyphicon-trash"></span></td><tr>'
                );

            $row.find('.edit').data(attn[i]);
            $row.find('.remove').data(attn[i]);

            // add click handler for edit
            $row.find('.edit').on('click', function (event) {
                var $target = $(event.delegateTarget);
                var mem = $target.data();

                $('#form-netid').val(mem.netid);
                $('#form-date').val(formatDate(mem.date));
                $('#event-type').val(mem.type);

                (mem.absence_type == 'A') ?
                $('input[name=type][value=absent]').prop('checked', true) :
                $('input[name=type][value=late]').prop('checked', true) ;

                (mem.excused == 'Y') ?
                $('input[name=excused][value=yes]').prop('checked', true) :
                $('input[name=excused][value=no]').prop('checked', true) ;
            });

            // add click handler for delete
            $row.find('.remove').on('click', function (event) {
                var $target = $(event.delegateTarget);
                var mem = $target.data();
                $('#del-issue-modal').data(mem);
            });

       	    $table.append($row);
        };
    }).fail(function (err) {
        console.log(err);
        $('.alert-danger .msg').html('Failed to connect to database!');
        $('.alert-danger').slideDown();
    });
}

$(function () {
    $('#edit-issue-submit').on('click', function(event) {
        $('#edit-issue-form').submit();
    });
    $('#edit-issue-form').on('submit', function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            console.log("default event not prevented");
        } else {
            // everything looks good!
            event.preventDefault();
            var r = 0;
            var netid = $("#form-netid").val();
            var old_date = $("#form-date").val().split("/");
            var date = old_date[2] + "-" + old_date[0] + "-" + old_date[1];
            var event_type = $('#event-type option:selected').val();
            var absence_type = ($("input[name=type]:checked").val() == "absent") ? 'A' : 'L';
            var excused = ($("input[name=excused]:checked").val() == "yes") ? 'Y' : 'N';

            if(!netid || !$("#form-date").val()) {
                return;
            }

            $.post("../db/update_issue.php",
            {
                netid: netid,
                date: date,
                event_type: event_type,
                absence_type: absence_type,
                excused: excused
            }).done(function(resp) {
                console.log('update success');
                console.log(resp);
                $('#edit-issue-modal').modal('hide');
                r = 1;
                submitForm();
            }).fail(function(err) {
                console.log(err);
            });
            if (r==1) {
                $('#edit-issue-modal').modal('hide');
            }
        }
    });
    $('#del-issue-submit').on('click', function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            console.log("default event not prevented");
        } else {
            // everything looks good!
            event.preventDefault();

            var mem = $('#del-issue-modal').data();
            if (!mem || !mem.hasOwnProperty('netid') || !mem.hasOwnProperty('date')) {
                console.log('invalid delete');
		console.log(mem.netid);
		console.log(mem.date);
                return;
            }

            $.post('../db/delete_issue.php', {
                netid: mem.netid,
                date: mem.date
            }).done(function(resp) {
                console.log('delete success');
                console.log(resp);
            }).fail(function(resp) {
                console.log(resp);
            });
        }
    })
});
