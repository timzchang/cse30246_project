$("#update-issue").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        console.log("something wrong");
    } else {
        // everything looks good!
        event.preventDefault();
        submitUpdateForm();
    }
});
function submitUpdateForm () {
    var netid = $("#netid-update").val();
    var eventid = $("#eventid-update").val();
    var absence_type = $("#absent_type-update").val();
    var excused = $("#excused-update").val();
    $.post("../db/update_issue.php",
    {
        netid: netid,
	    eventid: eventid,
	    absence_type: absence_type,
	    excused: excused
    },
    function(data, status){
        $("#update-status").html(data);
    });
}

$("#del-issue").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        console.log("something wrong");
    } else {
        // everything looks good!
        event.preventDefault();
        submitDelForm();
    }
});
function submitDelForm () {
    var netid = $("#netid-del").val();
    var eventid = $("#eventid-del").val();
    $.post("../db/delete_issue.php",
    {
        netid: netid,
	    eventid: eventid
    },
    function(data, status){
        $("#del-status").html(data);
    });
}
