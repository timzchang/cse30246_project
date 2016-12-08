function searchDate (date) {
    $.get({
        url: "../db/get_events_on_date.php",
        data: {
            date: date
        }
    }).done(function(attn, status){
            if (!Array.isArray(attn) && attn == "empty") {
                console.log("no events");
            	attn = [];
            } else
    	if (!Array.isArray(attn)) {
            if (attn == "empty") {
                console.log("no events");
            	attn = [];
            } else {
	            console.log("not array");
	            console.log(attn);
	        }
	            return;
    	}
        $('#table-title').html('');
        $('#table-title').append('Issues for ' + attn[0].type + ' on ' + formatDate(attn[0].date));
        $('#table-head').html('');
        $("#table-head").append(' <tr> <th>Last Name</th> <th>First Name</th> <th>netid</th> <th>Late/Absent</th> <th>Excused?</th> <th>Edit</th> </tr>')

    	var $table = $("#records").html('');

        for (var i = 0; i < attn.length; i++) {
    	    var excused = (attn[i].excused == 'Y') ? "Yes" : "No";
    	    var absence_type = (attn[i].absence_type == 'A') ? "Absent" : "Late";
            $row = $('<tr id="row-' + i + '">'+
		'<td>' + attn[i].lname + '</td>' +
		'<td>' + attn[i].fname + '</td>' +
                '<td>' + attn[i].netid + '</td>' +
                '<td>' + absence_type + '</td>' +
                '<td>' + excused + '</td>'+
                '<td><a class="edit" data-toggle="modal" data-target="#edit-issue-modal" href="#"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>' + " " +
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

var month_to_num = {
	Jan: "01",
	Feb: "02",
	Mar: "03",
	Apr: "04",
	May: "05",
	Jun: "06",
	Jul: "07",
	Aug: "08",
	Sep: "09",
	Oct: "10",
	Nov: "11",
	Dec: "12"
}

function formatDate(date) {
    var new_date = date.split("-");
    return new_date[1] + "/" + new_date[2] + "/" + new_date[0];
}

function formatDateForReq (date) {
	date = date.toString().split(" ");

	var month = month_to_num[date[1]];
	var year = date[3];
	var day = date[2];

	return year + "-" + month + "-" + day;
}

$(function () {
    $.get('../db/get_all_events.php', {
    }).done(function (events, status) {
        // [{type: type, date: date}, ...]
        temp = new Date(events[events.length-1].date + " GMT-0400");
        events_arr = [];
        for (e in events) {
            events_arr.push({title: events[e].type, 
                             start: new Date(events[e].date + " GMT-0500"),
                             allDay: true,
                             className: 'fc-event-height-override'
                            });
        }
    $('#calendar').fullCalendar({
    	header: {
		    left:   'today prev next',
		    center: 'title',
		    right:  ''
		},
        events: events_arr,
	eventClick: function (e) {
	    // Tue Dec 06 2016 00:00:00 GMT+0000
	    day = formatDateForReq(e.start.toString());
            $('#date').data({date: day});

            searchDate(day)
            $('html, body').animate({
                scrollTop: $("#table-head").offset().top
            }, 200);
        }
    });
    }).fail(function(resp) {
        console.log(resp);
    });
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
                console.log(resp);
                $('#edit-issue-modal').modal('hide');
                searchDate($('#date').data().date);
                console.log($('#date').data().date);
            }).fail(function(err) {
                console.log(err);
            });
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
                searchDate($('#date').data().date);
                console.log(resp);
            }).fail(function(resp) {
                console.log(resp);
            });
        }
    })
    $('#to_top').on('click', function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            console.log("default event not prevented");
        } else {
            event.preventDefault();
            window.scrollTo(0,0);
        }
   });
});
