(function(){
  var configMap = {
    isPause: true,
    isRunning: false,
    cancel: "取消",
    start : "开始计时",
    pause : "暂停",
    continue: "继续"
  };
  var timerInterval = null;
  var Dom = {
    hour   : document.getElementById('hour'),
    minute : document.getElementById('minute'),

    viewTime    : document.getElementsByClassName('view-time')[0],
    viewHour    : document.getElementsByClassName('view-hour')[0],
    viewMinute  : document.getElementsByClassName('view-minute')[0],
    viewSecond  : document.getElementsByClassName('view-second')[0],

    btnStart    : document.getElementsByClassName('btn-start')[0],
    btnPause    : document.getElementsByClassName('btn-pause')[0],
  };
  var timeInHours   = Dom.hour.value;
  var timeInMinutes = Dom.minute.value;
  var currentTime = Date.parse(new Date());
  var deadline = 
    new Date(currentTime + timeInMinutes * 60 * 1000 + timeInHours * 60 * 1000 * 60);

  function init(){
    EventHandler();
  }

  // 时间相关
  function getTimeRemaining (endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours   = Math.floor( (t/(1000*60*60)) % 24 );
    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function updateClock(endtime) {
    var t = getTimeRemaining(endtime);
    Dom.viewHour.innerHTML   = ('0' + t.hours).slice(-2);
    Dom.viewMinute.innerHTML = ('0' + t.minutes).slice(-2);
    Dom.viewSecond.innerHTML = ('0' + t.seconds).slice(-2);
    if (t.total <= 0) {
      clearInterval(timerInterval);
    }
  }



  function start() {
    // 计时器没有启动时
    if ( !configMap.isRunning ) {

      configMap.isRunning = true;

      Dom.btnStart.innerHTML = configMap.cancel;
      DomUtil.addClass(Dom.btnStart,"J-cancel");
      DomUtil.addClass(Dom.btnPause,"J-pause");



      // timerInterval = setInterval(updateClock(deadline),1000);
      // updateClock(deadline);
    } else if( configMap.isRunning )  {
      // 计时器启动时
      configMap.isRunning = false;
      configMap.isPause = true;
      Dom.btnStart.innerHTML = configMap.start;
      Dom.btnPause.innerHTML = configMap.pause;
      DomUtil.removeClass(Dom.btnStart,"J-cancel");
      DomUtil.removeClass(Dom.btnPause,"J-pause");
      DomUtil.removeClass(Dom.btnPause,"J-continue");



      Dom.viewHour.innerHTML = "";
      Dom.viewMinute.innerHTML = "";
      Dom.viewSecond.innerHTML = "";
      clearInterval(timerInterval);

    }
  }
  function pause() {
    // 计时器启动，并且在不在暂停状态时
    if ( configMap.isRunning && !configMap.isPause) {
      configMap.isPause = true;
      Dom.btnPause.innerHTML = configMap.pause;
      DomUtil.removeClass(Dom.btnPause,"J-continue");

      // clearInterval(timerInterval);
      console.log(configMap.continue)


    } else if( configMap.isRunning && configMap.isPause) {
      // 计时器启动，并且在暂停状态时
      configMap.isPause = false;
      Dom.btnPause.innerHTML = configMap.continue;
      DomUtil.addClass(Dom.btnPause,"J-continue");

      // timerInterval = setInterval(updateClock(deadline),1000);
      console.log(configMap.pause);

    }
  }
  // Event Bind
  function EventHandler() {
    Dom.btnStart.onclick = function() {
      start();
    };
    Dom.btnPause.onclick = function() {
      pause();
    }
  }

  init();

}());