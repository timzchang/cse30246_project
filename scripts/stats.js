var Sections = {
    Piccolo: false,
    Clarinet: false,
    Saxophone: false,
    Trumpet: false,
    Falto: false,
    Trombone: false,
    Baritone: false,
    Bass: false,
    Drumline: false,
    Manager: false
}

/*
 * Play with this code and it'll update in the panel opposite.
 *
 * Why not try some of the options above?
 */

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

var lin = Morris.Line({
  element: 'attn-over-time',
  data: [
  { y: '20016', a: 0 },
  ],
  xkey: 'y',
  ykeys: ['a'],
  labels: ['Band']
});

$(function () {
  $('#graph-form-submit').on('click', function (event) {
    var field = [];
    ($('input[name=ex]:checked').length) ? field.push() :  field.push("Excused/Unexcused");
    ($('input[name=late]:checked').length) ? field.push() : field.push("Late/Absent");
    ($('input[name=all]:checked').length || $('input[name=section]:checked').length) ? field.push() : field.push("Sections");
    if(field.length > 0) {
       var msg = "You must select at least one of ";
       for (var i=0; i < field.length; i++) {
           (i == field.length - 1) ? (field.length == 1) ? msg += field[i] : msg += "and " + field[i] : msg += field[i] + ", ";
       }
       alert(msg);
       event.preventDefault();
       return;
    }
    //$('#graph-form').submit();
  //});
  //$('#graph-form').on('submit', function (event) {
  $('#graph-form').unbind('submit').bind('submit', function (event) {
    if (event.isDefaultPrevented()) {
      // handle the invalid form...
      console.log("default event not prevented");
    } else {
      // everything looks good!
      console.log("Something happened!");
      event.preventDefault();
      var s_date = $('#start-date').val();
      var  end_date = $('#end-date').val();
      var excused  =$('#excused_id').is(':checked');
      var  unexcused = $('#unexcused_id').is(':checked');
      var  late = $('#late_id').is(':checked');
      var  absent = $('#absent_id').is(':checked');

      var section_vals = [];
      ($('input[name=all]:checked').length > 0) ?
        $('input[name=section]').each(function() { section_vals.push($(this).val());}) :
        $('input[name=section]:checked').each(function() { section_vals.push($(this).val());})
      $.post("../db/get_number_of_issues_in_date_range.php", {
        start_date: s_date,
        end_date: end_date,
        sections: section_vals,
        excused: excused,
        unexcused: unexcused,
        late: late,
        absent: absent
      }).done(function(absences, status){
        lineGraph(absences);
      }).fail(function (err) {
        console.log("failed")
        console.log(err);
      });
      $.post("../db/bar_info.php", {
        start_date: $('#start-date').val(),
        end_date: $('#end-date').val()
      }).done(function(absences, status){
        //barGraph(absences);
	$('#bar-count').html('');
	$('#bar-ratio').html('');
	// Bar-count Variables
	$bar_count_data = [];
	$bar_ykeys = [];
	$bar_labels = [];
	$bar_colors = [];
	// Bar-ratio Variables
	$bar_ratio_data = [];
	for( var i = 0; i < absences.length; i ++){
		$temp_obj = {};
		$ratio_obj = {};
		$temp_obj.section = absences[i].section;
		$ratio_obj.section = absences[i].section;
		if(excused && late){
			$temp_obj.excused_late = absences[i].excused_late;
			$ratio_obj.excused_late = (absences[i].excused_late)/(absences[i].members);
			if( i == 0){
				$bar_ykeys.push('excused_late');
				$bar_labels.push('Excused - Late');
				$bar_colors.push('darkgreen');
			}
		} if(excused && absent){
			$temp_obj.excused_absent = absences[i].excused_absent;
			$ratio_obj.excused_absent = (absences[i].excused_absent)/(absences[i].members);
			if( i == 0){
			$bar_ykeys.push('excused_absent');
			$bar_labels.push('Excused - Absent');
			$bar_colors.push('darkblue')}
		} if(unexcused && late){
			$temp_obj.unexcused_late = absences[i].unexcused_late;
			$ratio_obj.unexcused_late = (absences[i].unexcused_late)/(absences[i].members);
			if( i == 0){
			$bar_ykeys.push('unexcused_late');
			$bar_labels.push('Unexcused - Late');
			$bar_colors.push('darkred'); }
		}
		if(unexcused && absent){
			$temp_obj.unexcused_absent = absences[i].unexcused_absent;
			$ratio_obj.unexcused_absent = (absences[i].unexcused_absent)/(absences[i].members);
			if( i == 0){
			$bar_ykeys.push('unexcused_absent');
			$bar_labels.push('Unexcused - Absent');
			$bar_colors.push('red');}
		}
		$bar_data.push($temp_obj);
	}
	 Morris.Bar({
  		  element: 'bar-count',
  		  data: $bar_count_data,
		  xkey: 'section',
		  ykeys: $bar_ykeys,
		  labels: $bar_labels,
		  stacked: 'true',
		  barColors: $bar_colors
		});


      }).fail(function (err) {
        console.log("failed")
        console.log(err);
      });
      Morris.Bar({
  		  element: 'bar-ratio',
  		  data: $bar_ratio_data,
		  xkey: 'section',
		  ykeys: $bar_ykeys,
		  labels: $bar_labels,
		  stacked: 'true',
		  barColors: $bar_colors
		});


      }).fail(function (err) {
        console.log("failed")
        console.log(err);
      });

    }
  });
  });
});

function lineGraph(attn, lin) {
  // attn format
  // {section_name : {date1: num_absent, date2: num_absent, ...}, ...}
  // need {date: 'date', section_name: num_absent, ...}
  $('#attn-over-time').html('');
  sections = Object.keys(attn);
  console.log(attn);

  data = [];
  for(p in attn[sections[0]]) {
    data.push({y: p});
  }
  console.log(data);

  for(section in attn) {
    for(date in attn[section]) {
    for(var i=0; i<data.length; i++) {
      data[i][section] = attn[section][date];
      console.log(section + " " + attn[section][date]);
    }
    }
  }
  console.log(data);

  Morris.Line({
    element: 'attn-over-time',
    //data: [
    //{ y: '2006', a: 100, b: 90 },
    //{ y: '2007', a: 75,  b: 65 },
    //{ y: '2008', a: 50,  b: 40 },
    //{ y: '2009', a: 75,  b: 65 },
    //{ y: '2010', a: 50,  b: 40 },
    //{ y: '2011', a: 75,  b: 65 },
    //{ y: '2012', a: 100, b: 90 }
    //],
    data: data,
    xkey: 'y',
    ykeys: sections,
    labels: sections
  });

}
