// submit the attendance form
$("#attn_req").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        console.log("something wrong");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});

function formatDate(date) {
    var new_date = date.split("-");
    return new_date[1] + "/" + new_date[2] + "/" + new_date[0];
}

function submitForm () {
    var netid = $("#netid").val();
    var date = $("#date").val()
    date = formatDate(date);
    var excused = $("#excused").val();
    var absence_type = ($("#absent_type").val() == "absent") ? 'A' : 'L';
    var excused = ($("#excused").val() == "yes") ? 'Y' : 'N';
    $.post("../db/attn_req.php",
    {
        netid: netid,
        date: date,
	absence_type: absence_type,
	excused: excused 
    },
    function(data, status){
	$("#attn_status").html(data);
    });
}
