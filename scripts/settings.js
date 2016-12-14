$('#create-student').validator().on('submit', function(event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        console.log("something wrong");
    } else {
        // everything looks good!
        event.preventDefault();
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
        createEvent();
    }
});

function createStudent() {
    $.post("../db/create_student.php",
    {
        lname: $('#last_name').val(),
        fname: $('#first_name').val(),
        section: $('section').val(),
        netid: $('netid').val(),
        yog: $('year').val(),
        school: $('school').val(),
        block: $('block').val()
    }).done(function (resp) {
        if(Array.isArray(resp)) {
            alert(resp[1]);
        } else {
            alert(resp);
        }
    }).fail(function (err) {
        console.log(err);
    });
}
