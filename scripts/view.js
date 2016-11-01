// submit the attendance form
$("#view").validator().on("submit", function (event) {
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
    $.post("../db/view.php",
    {
        netid: netid
    },
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}
