$("#student").validator().on("submit", function (event) {

    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        console.log("something wrong");
    } else {
        // everything looks good!
        event.preventDefault();
        console.log("no");
        searchStudent();
    }
});

$("#search-event").validator().on("submit", function (event) {

    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        console.log("something wrong");
    } else {
        // everything looks good!
        event.preventDefault();
        searchEvent();
    }
});

$("#student-closebtn").on('click', function (event) {
    $('#student-error').slideUp();
})
$("#student-success-closebtn").on('click', function (event) {
    $('#student-good').slideUp();
})
$("#event-closebtn").on('click', function (event) {
    $('#event-error').slideUp();
})
$("#event-success-closebtn").on('click', function (event) {
    $('#event-good').slideUp();
})

// $('#form-date').change(function () {
//     d = $('#form-date').val();
//     $.get({
//         url: "../db/get_event_type.php",
//         data: {
//             date: d
//         }
//     }).dmne(function(type, status){
//         console.log(type);
//         $('#event-type').val(type);
//     });
// });

function searchStudent () {
    var netid = $("#netid").val();
    $.get({
        // url: "../db/view_search.php",
        url: "../db/search_student.php",
        data: {
            netid: netid
        }
    }).done(function(attn, status){
    	if (!Array.isArray(attn)) {
            if (attn == "none") {
                console.log("invalid netid");
                $('#student-error .msg').html('Invalid netid!');
                $('#student-error').slideDown();
                $('#student-good').slideUp();
$("#student-table tbody").html('');

                attn = [];
            } else {
            console.log("not array");
            console.log(attn);
            return;
            }
    	}
        console.log(attn[0].date);
        $('#student-error').slideUp();
        if (attn.length != 0) {
            $('#student-good').slideUp();
        }

    	var $table = $("#student-table tbody").html('');

        for (var i = 0; i < attn.length; i++) {
    	    var excused = (attn[i].excused == 'Y') ? "Yes" : "No";
    	    var absence_type = (attn[i].absence_type == 'A') ? "Absent" : "Late";
            $row = $('<tr id="row-' + i + '">'+
                '<td>' + attn[i].netid + '</td>' +
                '<td>' + attn[i].lname + '</td>' +
                '<td>' + attn[i].fname + '</td>' +
                '<td>' + attn[i].section + '</td>' +
                '<td>' + attn[i].yog + '</td>'+
                '<td>' + attn[i].school + '</td>' +
                '<td>' + attn[i].block + '</td>' +
                '<td><a class="edit" data-toggle="modal" data-target="#edit-student-modal" href="#"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>' + " " +
                '<a class="remove" data-toggle="modal" data-target="#del-student-modal" href="#"><span class="glyphicon glyphicon-trash"></span></td><tr>'
                );

            $row.find('.edit').data(attn[i]);
            $row.find('.remove').data(attn[i]);

            // add click handler for edit
            $row.find('.edit').on('click', function (event) {
                var $target = $(event.delegateTarget);
                var mem = $target.data();
                $('.edit-msg').html('');

                $('#form-netid').val(mem.netid);
                $('#fname').val(mem.fname);
                $('#lname').val(mem.lname);
                $('#section').val(mem.section);
                $('#block').val(mem.block);
                $('#year').val(mem.yog);
                $('#school').val(mem.school);
                //$('#event-id').data('eventid', mem.eventid);
            });

            // add click handler for delete
            $row.find('.remove').on('click', function (event) {
                var $target = $(event.delegateTarget);
                var mem = $target.data();
                $('#del-student-modal').data(mem);
            });

       	    $table.append($row);
        };
    }).fail(function (err) {
        console.log(err);
        $('#student-error .msg').html('Failed to connect to database!');
        $('#student-error').slideDown();
    });
}

function searchEvent() {
    var date = $("#date").val();
    $.get({
        // url: "../db/view_search.php",
        url: "../db/search_event.php",
        data: {
            date: date
        }
    }).done(function(attn, status){
        if (!Array.isArray(attn)) {
            if (attn == "none") {
                console.log("no events on date");
                $('#event-error .msg').html('No event on this date.');
                $('#event-error').slideDown();
                $('#event-good').slideUp();
                attn = [];
            } else {
                console.log("not array");
                console.log(attn);
                return;
            }
        }
        console.log('hello');
        console.log(attn[0].date);
        $('#event-error').slideUp();
        if (attn.length != 0) {
            $('#event-good').slideUp();
        }

        var $table = $("#event-table tbody").html('');

        for (var i = 0; i < attn.length; i++) {
            var excused = (attn[i].excused == 'Y') ? "Yes" : "No";
            var absence_type = (attn[i].absence_type == 'A') ? "Absent" : "Late";
            $row = $('<tr id="row-' + i + '">'+
                '<td>' + attn[i].date + '</td>' +
                '<td>' + attn[i].type + '</td>' +
                '<td><a class="edit" data-toggle="modal" data-target="#edit-event-modal" href="#"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>' + " " +
                '<a class="remove" data-toggle="modal" data-target="#del-event-modal" href="#"><span class="glyphicon glyphicon-trash"></span></td><tr>'
                );

            $row.find('.edit').data(attn[i]);
            $row.find('.remove').data(attn[i]);

            // add click handler for edit
            $row.find('.edit').on('click', function (event) {
                var $target = $(event.delegateTarget);
                var mem = $target.data();
                $('.edit-msg').html('');

                $('#form-date').val(mem.date);
                $('#event-type').val(mem.type);
                $('#event-id').data('eventid', mem.eventid);
            });

            // add click handler for delete
            $row.find('.remove').on('click', function (event) {
                var $target = $(event.delegateTarget);
                var mem = $target.data();
                $('#del-event-modal').data(mem);
            });

            $table.append($row);
        };
    }).fail(function (err) {
        console.log(err);
        $('#event-error .msg').html('Failed to connect to database!');
        $('#event-error').slideDown();
    });
}

$(function () {
    // Edit student 
    $('#edit-student-submit').on('click', function(event) {
        $('#edit-student-form').unbind('submit').bind('submit', function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            console.log("default event not prevented");
        } else {
            // everything looks good!
            event.preventDefault();
            var netid = $("#form-netid").val();

            $.post("../db/update_student.php",
            {
                netid: netid,
                lname: $("#lname").val(),
                fname: $("#fname").val(),
                section: $("#section").val(),
                block: $("#block").val(),
                yog: $("#year").val(),
                school: $("#school").val()
                // event_type: event_type,
            }).done(function(resp) {
                console.log(resp);
                if(Array.isArray(resp)) {
                    if(resp[0] == "0") {
                        $('#edit-student-modal').modal('hide');
                        $('#edit-student-modal').modal('hide');
                        $('#netid').val($('#form-netid').val());
                        searchStudent();
                    } else {
                        $('.edit-msg').html(resp[1]);
                    }
                }
            }).fail(function(err) {
                console.log(err);
            });
        }
        });
    });
    $('#edit-student-cancel').on('click', function(event) {
        $('#edit-student-modal').modal('hide');
    });
    $('#del-student-submit').on('click', function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            console.log("default event not prevented");
        } else {
            // everything looks good!
            event.preventDefault();

            var mem = $('#del-student-modal').data();
            if (!mem || !mem.hasOwnProperty('netid')) {
                console.log('invalid delete');
		        console.log(mem.netid);
		        // console.log(mem.date);
                return;
            }

            $.post('../db/delete_student.php', {
                netid: mem.netid
            }).done(function(resp) {
                if(Array.isArray(resp)) {
                    if(resp[0] != "0") {
                        alert(resp[1]);
                    } else {
                        $('#student-good .msg').html('Delete success');
                        $('#student-good').slideDown();
                        $("#student-table tbody").html('');
                    }
                }
                console.log(resp);
            }).fail(function(resp) {
                console.log(resp);
            });
        }
    });

    // Edit Event
    $('#edit-event-submit').on('click', function(event) {
        $('#edit-event-form').unbind('submit').bind('submit', function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            console.log("default event not prevented");
        } else {
            // everything looks good!
            event.preventDefault();

            $.post("../db/update_event.php",
            {
                event_type: $('#event-type').val(),
                date: $('#form-date').val(),
                old_eventid: $('#event-id').data('eventid')
            }).done(function(resp) {
                console.log(resp);
                if(Array.isArray(resp)) {
                    if(resp[0] == "0") {
                        $('#edit-event-modal').modal('hide');
                        $('#edit-event-modal').modal('hide');
                        $('#date').val($('#form-date').val());
                        searchEvent();
                    } else {
                        $('.edit-msg').html(resp[1]);
                    }
                }
            }).fail(function(err) {
                console.log(err);
            });
        }
        });
    });
    $('#edit-event-cancel').on('click', function(event) {
        $('#edit-event-modal').modal('hide');
    });
    $('#del-event-submit').on('click', function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            console.log("default event not prevented");
        } else {
            // everything looks good!
            event.preventDefault();

            var mem = $('#del-event-modal').data();
            if (!mem || !mem.hasOwnProperty('eventid')) {
                console.log('invalid delete');
                console.log(mem.netid);
                // console.log(mem.date);
                return;
            }

            $.post('../db/delete_event.php', {
                eventid: mem.eventid
            }).done(function(resp) {
                if(Array.isArray(resp)) {
                    if(resp[0] != "0") {
                        alert(resp[1]);
                    } else {
                        $('#event-good .msg').html('Delete success');
                        $('#event-good').slideDown();
                        $("#event-table tbody").html('');
                    }
                }
                console.log(resp);
            }).fail(function(resp) {
                console.log(resp);
            });
        }
    });
});
