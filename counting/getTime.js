function getTimeRemaining (endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t/1000/) % 60); 
  var minutes = Math.floor((t/1000/60) % 60); 
  var hours = Math.floor((t/1000/60/60) % 24);

  return {
    'total': t,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  }
}

function updateClock(endtime) {
  var t = getTimeRemaining(endtime);
  
}