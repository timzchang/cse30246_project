
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

function formatDateForReq (date) {
	date = date.toString().split(" ");

	var month = month_to_num[date[1]];
	var year = date[3];
	var day = date[2];

	return year + "-" + month + "-" + day;
}

function submitForm(d) {
    $.get({
        url: "../db/get_students_in_block.php",
        data: {
            date: d,
            block: $('#block_id').val()
        }
    }).done(function(attn, status){
        var $table = $('table tbody').html('');
        for(var i=0; i<attn.length; i++) {
           var c = "";
           if (attn[i].excused == 'Y') {
               c = "text-muted"; 
           } else if (attn[i].excused == 'N') {
               c = "info"; 
           }else { 
               c="active";
           }
           console.log(attn[0].excused);
            
            $row = $('<tr class="' + c +'" id="row-' + i + '">'+
                '<td>' + attn[i].lname + ', ' + attn[i].fname + '</td>');
            $row.data(attn[i]);
            $table.append($row);
            $row.on('click', function(event) {
                console.log("before click: " +  $(this).attr("class"));
                var $target = $(event.delegateTarget);
                var mem = $target.data()
                if (mem.excused != "Y") {
                    if($(this).attr("class") == 'active'){
                       $(this).removeClass('active');
                       $(this).addClass('info');
                    $.post("../db/attn_req.php",
                    {
                       netid: mem.netid,
                       date: d,
                       absence_type: 'A',
                       excused: 'N'
                    }).done(function (resp) {
                    }).fail(function (err) {
                        console.log(err);
                    });
                    } else {
                    $.post('../db/delete_issue.php', {
                       netid: mem.netid,
                       date: d
                    }).done(function(resp) {
                       console.log("deleted");
                    }).fail(function(resp) {
                       console.log(resp);
                    });
                    $(this).removeClass('info');
                    $(this).addClass('active');
                    
                    }
                }
                $(this)
            });
        }
    }).fail(function(resp) {
        console.log(resp);
    });

}

$('#block_id').change(function() {
    d = new Date();
    t = d.toString().split(" ");
    t = t[0] + ", " + t[1] + " " + t[2];
    d = formatDateForReq(d.toString());
    
    submitForm(d);
});

$(function () {
    d = new Date();
    t = d.toString().split(" ");
    t = t[0] + ", " + t[1] + " " + t[2];
    $('#today_type').html('');
    $('#today_type').append("For Practice on " + t);
    
    d = formatDateForReq(d.toString());
$("#attn_req").validator().on("submit", function (event) {

    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        console.log("something wrong");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm(d);
    }
});
    $('#dto_top').on('click', function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            console.log("default event not prevented");
        } else {
            event.preventDefault();
            window.scrollTo(0,0);
        }
   });
});
