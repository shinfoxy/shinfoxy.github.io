// main.js
// 

window.onload = function(){
  // closebtn
  var mobileBox = document.getElementsByClassName("mobile-box")[0];
  var closeBtn = mobileBox.getElementsByClassName("fa-close")[0];
  closeBtn.onclick = function(){
    mobileBox.style.visibility = "hidden";
  }

  // slider-1

  var slider1 = document.getElementById("slider-1");
  var prev    = slider1.getElementsByClassName("prev")[0];
  var next    = slider1.getElementsByClassName("next")[0];
  var dotlist = slider1.getElementsByClassName("dotlist")[0];
  var dotitem = dotlist.getElementsByTagName("li");
  var sliderlist = document.getElementsByClassName("slider-1-list")[0];
  var slideritem = sliderlist.getElementsByTagName("li");
  var index = 0;

  for (var i = 0; i < dotitem.length; i++) {
    dotitem[i].index = i;
    dotitem[i].onclick = function(){
      index = this.index;
      tab();
    }
  }
    function tab() {
      for (var i = 0; i < dotitem.length; i++) {
        dotitem[i].className = "";
      }
      dotitem[index].className = "cur";
      move(sliderlist,"left", -(index * slideritem[0].offsetWidth));
    };
   
    prev.onclick = function() {
      index--;
      if (index == -1) {
        index = slideritem.length - 1;
      }
      tab();
    }
    next.onclick = function() {
      index++;
      if (index == slideritem.length ) {
        index = 0;
      }
      tab();
    } 
    var timer = setInterval(next.onclick,3000);
    slider1.onmouseover = function(){
      clearInterval(timer);
    }
    slider1.onmouseout = function(){
      timer = setInterval(next.onclick,3000);
    }

  // slider-2

  // tabs-service

  var tabs    = document.getElementsByClassName("board-tab")[0];
  var tabsLi  = tabs.getElementsByTagName("li");
  var tabsCon = document.getElementsByClassName("board-content")[0];
  var tabsConUl = tabsCon.getElementsByTagName("ul");
  var i, timer2, tabsLilen = tabsLi.length;
  for(i = 0; i < tabsLilen ; i++) {
    tabsLi[i].index = i;
    tabsLi[i].onmouseover = function() {
      show(this.index);
    }
  }
  function show(a) {
    index = a;
    clearTimeout(timer2);
    timer2 = setTimeout(function(){
      for(var j = 0; j < tabsLilen ; j++) {
          tabsLi[j].className = "";
          tabsConUl[j].style.display = "none";
          tabsLi[index].className = "cur";
          tabsConUl[index].style.display = "block";
      }
    } ,300)
  }

}


// functions

function getStyle(obj,name) {
  if(obj.currentStyle) {
    return obj.currentStyle[name];
  } else {
    return getComputedStyle(obj,false)[name];
  }
}
function move(obj,att,add) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function(){
    var cur = 0;
    cur = Math.round(parseInt(getStyle(obj,att)));
    var speed = (add - cur) / 4;
    speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);
    if(cur == add) {
      clearInterval(obj.timer);
    } else {
      obj.style[att] = cur + speed+'px';
    }
  },15)
}


// window.onscroll = function() {
//   var DISTANCE  = 130;
//   var gTop      = document.getElementsByClassName("g-top")[0];
//   var topSearch = document.getElementsByClassName("g-top-search")[0];
//   var scrollH = document.body.scrollTop;
//   if (scrollH > DISTANCE) {
//     gTop.className = "g-top fixedwrap"
//   } else {
//     gTop.className = "g-top";
//   }
// }


  
