var Sections = {}

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
    $('#graph-form').submit();
  });
  $('#graph-form').on('submit', function (event) {
    if (event.isDefaultPrevented()) {
      // handle the invalid form...
      console.log("default event not prevented");
    } else {
      // everything looks good!
      event.preventDefault();
      $.get({
        url: "../db/view_search.php",
        data: {
            netid: netid
        }
      }).done(function(attn, status){
        $('div h3').append(attn)
      }).fail(function (err) {
        console.log(err);
      });
    }
  });
});
