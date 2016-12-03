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
function submitForm () {
    var netid = $("#netid").val();
    var eventid = $("#eventid").val();
    var absent_type = $("#absent_type").val();
    var excused = $("#excused").val();
    $.post("../db/attn_req.php",
    {
        netid: netid,
        eventid: eventid,
	absence_type: absent_type,
	excused: excused 
    },
    function(data, status){
	$("#attn_status").html(data);
    });
}
