var Sections = {
    Piccolo: false,
    Clarinet: false,
    Saxaphone: false,
    Trumpet: false,
    Falto: false,
    Trombone: false,
    Baritone: false,
    Bass: false,
    Drumline: false,
    Managers: false
}

/*
 * Play with this code and it'll update in the panel opposite.
 *
 * Why not try some of the options above?
 */
 Morris.Line({
  element: 'attn-over-time',
  data: [
  { y: '2006', a: 100, b: 90 },
  { y: '2007', a: 75,  b: 65 },
  { y: '2008', a: 50,  b: 40 },
  { y: '2009', a: 75,  b: 65 },
  { y: '2010', a: 50,  b: 40 },
  { y: '2011', a: 75,  b: 65 },
  { y: '2012', a: 100, b: 90 }
  ],
  xkey: 'y',
  ykeys: ['a', 'b'],
  labels: ['Series A', 'Series B']
});

$(function () {
  $('#graph-form-submit').on('click', function (event) {
    var field = []
    var checked = {
        ex : $('input[name=ex]:checked').length,
        late: $('input[name=late]:checked').length,
        all: $('input[name=all]:checked').length,
        section: $('input[name=section]:checked').length
    }
    for(var key in checked) {
        if (checked.hasOwnProperty(key)) {
            if (checked.key == 0) {
                field.push(key)
            }
        }
    }
    if(field.length > 0) {
       var msg = "You must select at least one of ";
       for (var i=0; i < field.length; i++) {
           msg += field[i] + " ";
       }
       alert(msg);
       return;
    }
    $('#graph-form').submit();
  });
  $('#graph-form').on('submit', function (event) {
    if (event.isDefaultPrevented()) {
      // handle the invalid form...
      console.log("default event not prevented");
    } else {
      // everything looks good!
      event.preventDefault();
      $.post("../db/get_number_of_issues_in_date_range.php", {
        start_date: $('#start-date').val(),
        end_date: $('#end-date').val()
      }).done(function(absences, status){
        //lineGraph(absences);
      }).fail(function (err) {
        console.log("failed")
        console.log(err);
      });
      $.post("../db/bar_info.php", {
        start_date: $('#start-date').val(),
        end_date: $('#end-date').val()
      }).done(function(absences, status){
        //barGraph(absences);
      }).fail(function (err) {
        console.log("failed")
        console.log(err);
      });

    }
  });
});
