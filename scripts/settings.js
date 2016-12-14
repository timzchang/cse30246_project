$('#create-student').validator().on('submit', function(event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        console.log("something wrong");
    } else {
        // everything looks good!
        event.preventDefault();
        $('#student-error').slideUp();
        $('#student-good').slideUp();
        createStudent();
    }
});


$('#create-event').validator().on('submit', function(event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        console.log("something wrong");
    } else {
        // everything looks good!
        event.preventDefault();
        $('#error').slideUp();
        $('#good').slideUp();
        createEvent();
    }
});

$("#student-closebtn").on('click', function (event) {
    $('#student-error').slideUp();
})
$("#student-success-closebtn").on('click', function (event) {
    $('#student-good').slideUp();
})

$("#closebtn").on('click', function (event) {
    $('#error').slideUp();
})
$("#success-closebtn").on('click', function (event) {
    $('#good').slideUp();
})

function createEvent() {
    console.log($('#date').val());
    $.post("../db/create_event.php",
    {
        event_type: $('#event-type').val(),
        date: $('#date').val()
    }).done(function (resp) {
        if(Array.isArray(resp)) {
            if(resp[0] == "0") {
                $('#good .msg').html(resp[1]);
                $('#good').slideDown();
            } else {
                $('#error .msg').html(resp[1]);
                $('#error').slideDown();

            } 
            //alert(resp[1]);
        } else {
            $('#error .msg').html(resp);
            $('#error').slideDown();
        }
    }).fail(function (err) {
        console.log(err);
    });
}

function createStudent() {
    $.post("../db/create_student.php",
    {
        lname: $('#last_name').val(),
        fname: $('#first_name').val(),
        section: $('#section').val(),
        netid: $('#netid').val(),
        yog: $('#year').val(),
        school: $('#school').val(),
        block: $('#block').val()
    }).done(function (resp) {
        if(Array.isArray(resp)) {
            if(resp[0] == "0") {
                $('#student-good .msg').html(resp[1]);
                $('#student-good').slideDown();
            } else {
                $('#student-error .msg').html(resp[1]);
                $('#student-error').slideDown();
            } 
        } else {
            $('#student-error .msg').html(resp);
            $('#student-error').slideDown();
        }
    }).fail(function (err) {
        console.log(err);
    });
}
