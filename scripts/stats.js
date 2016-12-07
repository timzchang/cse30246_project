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
 Morris.Bar({
  element: 'bar-example',
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
  labels: ['Series A', 'Series B'],
  stacked: 'true'
});

 Morris.Bar({
  element: 'bar-example2',
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
  labels: ['Series A', 'Series B'],
  stacked: 'true'
});

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
      console.log("Something happened!");
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
	console.log(absences[0]);
	$('#bar-example').html('');
	$bar_data = [];
	for( var i = 0; i < absences.length; i ++){
		$section = absences[i].section;
		$excused_late = absences[i].excused_late;
		$excused_absent = absences[i].excused_absent;
		$unexcused_late = absences[i].unexcused_late;
		$unexcused_absent = absences[i].unexcused_absent;
		$temp_obj = {
			section: $section, 
			excused_late:     $excused_late,
			excused_absent:   $excused_absent,
			unexcused_late:   $unexcused_late,
			unexcused_absent: $unexcused_absent
		};
		$bar_data.push($temp_obj);
	}
	 Morris.Bar({
  		  element: 'bar-example',
  		  data: $bar_data,
		  xkey: 'section',
		  ykeys: ['excused_late', 'excused_absent'],
		  labels: ['Excused - Late', 'Excused - Absent'],
		  stacked: 'true'
		});
			
		
      }).fail(function (err) {
        console.log("failed")
        console.log(err);
      });

    }
  });
});
