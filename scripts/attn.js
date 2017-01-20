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
    var new_date = date.split("/");
    return new_date[2] + "-" + new_date[0] + "-" + new_date[1];
}

$("#closebtn").on('click', function (event) {
    $('#error').slideUp();
})
$("#success-closebtn").on('click', function (event) {
    $('#good').slideUp();
})

function submitForm () {
    var netid = $("#netid").val();
    var date = $("#form-date").val()
    date = formatDate(date);
    var excused = $("#excused").val();
    var absence_type = ($("#absent_type").val() == "Absent") ? 'A' : 'L';
    var excused = ($("#excused").val() == "Yes") ? 'Y' : 'N';
    $.post("../db/attn_req.php",
    {
        netid: netid,
        date: date,
	absence_type: absence_type,
	excused: excused 
    },
    function(data, status){

        console.log(data);
        
        if (data == "1") {
            $('.alert-danger .msg').html("Error - attendance issue not created.");
        } else if (data == "2") {
            $('.alert-danger .msg').html("Error - no event on selected date.");
        } else if (data == "3") {
            $('.alert-danger .msg').html("Error - attendance issue already exists for this student on this date.");
        } else if (data == "4") {
            $('.alert-danger .msg').html("Error - invalid netid.");
        }
            
        $('.alert-success .msg').html("Created new attendance issue.");
        if (data == "0") {
            $('.alert-success').slideDown();
        } else {
            $('.alert-danger').slideDown();
        }
    });
}

