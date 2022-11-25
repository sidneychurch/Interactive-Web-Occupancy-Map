/* ---- Requesting Data ---- /
  On page load, we'll send an https request to our pipedream program.
  This will initiate the trigger and grab all the data that we want.
  Once successfully completed, that data will be sent here.
 / ---------------- */

$.ajax({url: "https://enwgjtb2nvfcwc4.m.pipedream.net", success: function(result){
  
  /*---- Returned Data ---- /
    After hearing back, our message is returned in the result object. 
    The result object contains a messag propery, which in turn contains
      all of the formatted data that we requested.
    Since we made it, we know that the data coming back is a JSON.
    This also means we need to turn it back into an object.
  / ---------------- */
  
  const scheduleData = JSON.parse(result.message);

  /*---- Accessing the Data ---- / 
   Now we have an object named scheduleData with the properties:
      available         - This let's us know if the space is available today
      scheduleID        - This is the calendar ID number
      capacity          - This is the room's max capacity
      totalReservations - This is the number of total current resrvations
      inUse             - This is an array of all current equipment in use 
  / -------------------------- */
  
  // ---- Space Availability ---- //
  //Start by checking which spaces are available today
    //If any aren't available, let's change their color on the map
    //and make it so their info box says this
  for (i = 0; i < scheduleData.length; i++) {
    //couple variables to make things more legible
    var calName = scheduleData[i].name;
    var calID = scheduleData[i].scheduleID;

    /*
    //check availability
    if (scheduleData[i].available == false)
    {
      $('#' + calID).addClass( "unavailable" );
      $('#' + calID).data('info','<div><u><b>' + calName + '</b></u></div> <div>Unavailable Today</div>');
      // console.log(tmpName);
    }
    else
      {
        $('#' + calID).addClass( "available" );
        $('#' + calID).data('info','<div><u><b>' + calName + '</b></u></div> <div>Available Today</div>');
      }
      */
    /*
    max 5
    if <= max/2 = green
    if >= max/2 = yellow
    if == max  = red
    */
    //this could be handled on the backend to be faster
    if(scheduleData[i].totalReservations <= scheduleData[i].capacity/2)
      {
        $('#' + calID).addClass( "min" );
      }
    else if (scheduleData[i].totalReservations >= scheduleData[i].capacity/2)
      {
        $('#' + calID).addClass( "mid" );
      }
    else
      {
        $('#' + calID).addClass( "max" );
      }
    
        $('#' + calID).data('info','<div><u><b>' + calName + '</b></u></div> <div>Capacity: ' +
                            scheduleData[i].totalReservations + ' / ' + scheduleData[i].capacity + '</div>');
  }
  // ---------------- /
}// --- End function(result)
});
// --- End $.ajax() --- // 

// --- Interactive Functionailty --- //

//Fading Functions

$("#emptyO1").hover(function(e) {
   $("#nameDoherty").fadeIn( "slow" );
   $("#nameCFA").fadeIn( "slow" );
   $("#Doherty").fadeIn( "slow" );
   $("#CFA").fadeIn( "slow" );
   $("#cfaOver").hide();
   $("#dhOver").hide();
});

$("#emptyO2").hover(function(e) {
   $("#nameDoherty").fadeIn( "slow" );
   $("#nameCFA").fadeIn( "slow" );
   $("#Doherty").fadeIn( "slow" );
   $("#CFA").fadeIn( "slow" );
   $("#cfaOver").hide();
   $("#dhOver").hide();
});

 $("#emptyO3").hover(function(e) {
   $("#nameDoherty").fadeIn( "slow" );
   $("#nameCFA").fadeIn( "slow" );
   $("#Doherty").fadeIn( "slow" );
   $("#CFA").fadeIn( "slow" );
   $("#cfaOver").hide();
   $("#dhOver").hide();
});
                    
$("#CFA").hover(function(e) {
   $("#nameCFA").hide();
   $("#nameDoherty").fadeOut( "slow" );
   $("#Doherty").fadeOut( "slow" );
   $("#dhOver").show();
});

$("#Doherty").hover(function(e) {
   $("#nameDoherty").hide();
   $("#nameCFA").fadeOut( "slow" );
   $("#CFA").fadeOut( "slow" );
   $("#cfaOver").show();
});

$("#cfaOver").hover(function(e) {
   $("#cfaOver").hide(); 
   $("#nameDoherty").fadeOut( "slow" );
   $("#Doherty").fadeOut( "slow" );
   $("#CFA").fadeIn( "slow" );
   $("#dhOver").show();
});

$("#dhOver").hover(function(e) {
   $("#dhOver").hide();
   $("#nameCFA").fadeOut( "slow" );
   $("#CFA").fadeOut( "slow" );
   $("#Doherty").fadeIn( "slow" );
   $("#cfaOver").show();
});

$("#SoArt-Map").mouseleave(function(e) {
  $("#dhOver").hide();
  $("#cfaOver").hide();
  $("#Doherty").fadeIn( "slow" );
   $("#CFA").fadeIn( "slow" );
   $("#nameCFA").fadeIn( "slow" );
   $("#nameDoherty").fadeIn( "slow" );
});

//class "room" functions

//When the mouse hovers over an object with the "room" class
$(".room").hover(function(e) {
  $('#info-box').css('display','block');
  $('#info-box').html($(this).data('info'));
  $('#info-box').html($(this).data('status'));
});

$(".room").mouseleave(function(e) {
  $('#info-box').css('display','none');
});

$(document).mousemove(function(e) {
  $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
  $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
}).mouseover();

var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(ios) {
  $('a').on('click touchend', function() { 
    var link = $(this).attr('href');   
    window.open(link,'_blank');
    return false;
  });
}

