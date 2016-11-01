
// submit the attendance form
//$("#attn_req").submit(function(event){
//    // cancels the form submission
//    event.preventDefault();
//    submitForm();
//});


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
    console.log("sending");
    var netid = $("#netid").val();
    var eventid = $("#eventid").val();
    var absent_type = $("#absent_type").val();
    var excused = $("#excused").val();
    
    $.ajax({
        type: "POST",
        url: "../db/attn_req.php",
        data: "netid=" + netid + "&eventid=" + eventid + "&absent_type=" + absent_type + "&excused=" + excused,
        success : function(text){
            if (text == "success"){
                console.log("success");
            }
        }
    });
}
