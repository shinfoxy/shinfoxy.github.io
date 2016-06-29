$(document).ready(function(){
  $('.movie a,.comic a').hover(function(){
    var index = $(this).index;
    $(this).addClass('on');
    $(this).parent().siblings('.movie-content').children('.movie-item').eq(index).show().siblings().hide();
  },function(){
    $(this).removeClass('on');
  })
})

// window.onload = function(){
//   var movie = document.getElementsByClassName('movie')[0];
//   var oa = movie.getElementsByTagName('a');
//   var oCon = movie.getElementsByClassName('movie-content')[0];
//   oalen = oa.length;
//   for(var i = 0; i < oalen ; i++) {
//     oa[i].index = i;
//     oa[i].onmouseover = function(){
//       show(this.index);
//     }
//   }
//   function addClass(obj, clsName) {
//     var obj_class = obj.className;
//     var blank = (obj_class != '') ? " ": "";
//     var new_class = obj + blank + clsName;
//     obj.className = new_class;
//   }
//   function show(a) {
//     index = a;
//     for(var j = 0; j < oalen; j++) {
//       // oa[index].addClass(this,'on');
//       // oa[j].className = "";
//       // oCon[j].className = "";
//     }
//   }
// }
// // .addClass(this,'on')