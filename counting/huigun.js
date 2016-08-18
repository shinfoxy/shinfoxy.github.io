(function(){
  var configMap = {
    isPause: true,
  };
  var timerInterval;
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
  function initializeClock(endtime) {
    function updateClock() {
      var t = getTimeRemaining(endtime);
      Dom.viewHour.innerHTML   = ('0' + t.hours).slice(-2);
      Dom.viewMinute.innerHTML = ('0' + t.minutes).slice(-2);
      Dom.viewSecond.innerHTML = ('0' + t.seconds).slice(-2);
      if (t.total <= 0) {
        clearInterval(timerInterval);
      }
    }
    updateClock();
    timerInterval = setInterval(updateClock,1000);
  };


  function start() {
    if (configMap.isPause) {
      configMap.isPause = false;
      Dom.btnStart.innerHTML = "取消";

      var timeInHours   = Dom.hour.value;
      var timeInMinutes = Dom.minute.value;
      var currentTime = Date.parse(new Date());
      var deadline = 
        new Date(currentTime + timeInMinutes * 60 * 1000 + timeInHours * 60 * 1000 * 60);
      initializeClock(deadline);

      // setTimer = setInterval(updateClock,1000);
    } else {
      // 重置
      configMap.isPause = true;
      Dom.viewHour.innerHTML = "";
      Dom.viewMinute.innerHTML = "";
      Dom.viewSecond.innerHTML = "";
      Dom.btnStart.innerHTML = "开始计时";
      clearInterval(timerInterval);

    }
  }
// timer函数怎么写
  function pause() {
    if (configMap.isPause) {
      configMap.isPause = false;
      Dom.btnPause.innerHTML = "暂停";
      setTimer = setInterval(timer,1000)
    } else {
      configMap.isPause = true;
      Dom.btnPause.innerHTML = "继续";
      clearInterval(timerInterval);
    }
  }
  // Event Bind
  function EventHandler() {
    Dom.btnStart.onclick = function() {
      start();
      console.log("停止状态:" + configMap.isPause);
    };
    Dom.btnPause.onclick = function() {
      pause();
      console.log("停止状态:" + configMap.isPause)
    }
  }

  init();

}());