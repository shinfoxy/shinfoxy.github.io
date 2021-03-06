(function(){
  var configMap = {
    isPause: false,
    isRunning: false,
    start : "开始计时",
    pause : "暂停",
    continue: "继续",
    reset: "重置",
    // J-continue
  };
  var timerInterval = null,
  timeInHours,timeInMinutes,timeInSeconds,
  timeRemain,timeTotal;

  var Dom = {
    hour   : document.getElementById('hour'),
    minute : document.getElementById('minute'),

    del    : document.getElementsByClassName('del')[0],
    timeSetter  : document.getElementsByClassName('timeSetter')[0],
    viewTime    : document.getElementsByClassName('viewTime')[0],
    viewHour    : document.getElementsByClassName('viewHour')[0],
    viewMinute  : document.getElementsByClassName('viewMinute')[0],
    viewSecond  : document.getElementsByClassName('viewSecond')[0],

    btnStart    : document.getElementsByClassName('btn-start')[0],
    btnReset    : document.getElementsByClassName('btn-reset')[0],

    ring : document.getElementsByClassName('ring')[0],
    drawCns : document.getElementById('drawCns'),
    tooltipsHour : document.getElementsByClassName('tooltipsHour')[0],
    tooltipsMinute: document.getElementsByClassName('tooltipsMinute')[0],

    todo : document.getElementById('todo'),
    toshow :document.getElementById('toshow')
  };
  var ring_w = Dom.ring.offsetWidth;
  var ring_h = Dom.ring.offsetHeight;
  var drawCtx = Dom.drawCns.getContext('2d');
  function init() {
    EventHandler();
    drawBase();
  }
  function drawBase() {
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = ring_w;
    cns.height = ctx.height = ring_h;
    Dom.ring.appendChild(cns);

    var r = ring_w / 2;
    // 底图
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.arc(r,r,r,0,2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
  
  function getTime() {

    timeInHours   = Dom.hour.value;
    timeInMinutes = Dom.minute.value;
    timeRemain = timeInHours * 3600 + timeInMinutes * 60;
    timeTotal = timeRemain;

  }
  function update() {
    updateTime();
    updateRing();
    if (timeRemain <= 0) {
     clearInterval(timerInterval);
     reset();

     console.log("结束了");
    
    }
  }
  function updateRing() {

    Dom.drawCns.width = drawCtx.width = ring_w;
    Dom.drawCns.height = drawCtx.height = ring_h;

    Dom.ring.appendChild(Dom.drawCns);
    var r = ring_w / 2;
    var circ = 2 * Math.PI;

    var per = circ / timeTotal;

    var sAngle =  1.5 * Math.PI;
    var eAngle = sAngle + per * (timeTotal - timeRemain);

    drawCtx.beginPath();
    drawCtx.fillStyle = '#f00';
    drawCtx.strokeStyle = '#f00';
    drawCtx.lineWidth = 1;
    drawCtx.moveTo(r,r)
    drawCtx.arc(r,r,r,sAngle,eAngle);
    drawCtx.fill();
    drawCtx.stroke();
  }
  function clearRing() {
    drawCtx.clearRect(0,0,ring_w,ring_h);
  }
  function updateTime() {  
     timeRemain--;
     hours = Math.floor((timeRemain / 3600) % 24);
     minutes = Math.floor((timeRemain / 60) % 60);
     seconds = Math.floor(timeRemain % 60);

     Dom.viewHour.innerHTML = ('0' + hours).slice(-2);
     Dom.viewMinute.innerHTML = ('0' + minutes).slice(-2);
     Dom.viewSecond.innerHTML = ('0' + seconds).slice(-2);

// @workaround
// this should be in update()
// for
     

  }
  function turn() {
    
  }
  function start() {

    // 计时器没有启动时
    if ( !configMap.isRunning ) {
      getTime();

      Dom.timeSetter.style.display = "none";
      Dom.viewTime.style.display   = "block";
      
      configMap.isRunning = true;
      Dom.btnStart.innerHTML = configMap.pause;
      DomUtil.addClass(Dom.btnStart,"J-pause");
      DomUtil.addClass(Dom.btnReset,"J-reset");
      // 开始计时
      timerInterval = setInterval(update,1000);
      update();
    } else if( configMap.isRunning && !configMap.isPause )  {
      // 计时器启动，并且暂停

      configMap.isPause = true;
      Dom.btnStart.innerHTML = configMap.continue;

      DomUtil.removeClass(Dom.btnStart,"J-pause");
      DomUtil.addClass(Dom.btnStart,"J-continue");

      // 暂停计时
      clearInterval(timerInterval);

    } else if ( configMap.isRunning && configMap.isPause) {
      // 计时器启动，并且在倒计时
      Dom.btnStart.innerHTML = configMap.pause;
      configMap.isPause = false;
      DomUtil.removeClass(Dom.btnStart,"J-continue");
      DomUtil.addClass(Dom.btnStart,"J-pause");
      // 继续计时
      timerInterval = setInterval(update,1000);
      update();
    }
  }

  function reset() {
    // 计时器启动，并且在不在暂停状态时

    if ( configMap.isRunning) {
      // 重置计时
      Dom.timeSetter.style.display = "block";
      Dom.viewTime.style.display = "none";
      clearInterval(timerInterval);
      configMap.isRunning = false;
      configMap.isPause = false;
      Dom.btnStart.innerHTML = configMap.start;
      DomUtil.removeClass(Dom.btnReset,"J-reset");
      DomUtil.removeClass(Dom.btnStart,"J-pause");
      DomUtil.removeClass(Dom.btnStart,"J-continue");

      // 清空文字
      Dom.viewHour.innerHTML = "";
      Dom.viewMinute.innerHTML = "";
      Dom.viewSecond.innerHTML = "";
      // 清空画布
      clearRing();
    }
  }
  function validation() {
    // console.log((Dom.hour.value === 0 && Dom.minute.value === 0));

    var format = (Dom.hour.value && Dom.hour.value < 0) 
              || (Dom.minute.value && Dom.minute.value <0)
              || (Number(Dom.hour.value) === 0 && Number(Dom.minute.value) === 0)
    if( format ) {
 
      return false;

    }  
    return true;
  }
  // Event Bind
  function EventHandler() {
    Dom.btnStart.onclick = function() {
      if (validation()) {
        start();
      } else if (Dom.minute.value && Dom.minute.value <0) {
        Dom.tooltipsMinute.style.display = "block";
      } else if ((Dom.hour.value && Dom.hour.value < 0) ) {
        Dom.tooltipsHour.style.display = "block";
      }
    };
    Dom.btnReset.onclick = function() {
      reset();
    };
    Dom.del.onclick = function() {
      Dom.hour.value = "";
      Dom.minute.value = "";
    }
    Dom.hour.onfocus = function() {
      Dom.tooltipsHour.style.display = "block";
    }
    Dom.hour.onblur = function() {
      Dom.tooltipsHour.style.display = "none";
    }
    Dom.minute.onfocus = function() {
      Dom.tooltipsMinute.style.display = "block";
    }
    Dom.minute.onblur = function() {
      Dom.tooltipsMinute.style.display = "none";
    }
    Dom.hour.onkeyup = function() {
      if ( this.value < 0 || this.value > 23) {
        console.log('if exist,hour must > 0 && < 24')
      }
      // 验证
    }
    Dom.minute.onkeyup = function() {
      if( this.value < 0 || this.value > 59) {
        console.log("minute must > 0")
      }
    }
  }

  init();

}());