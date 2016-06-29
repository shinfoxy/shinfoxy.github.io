$(document).ready(function(){
  $('.movie li,.comic li').hover(function(){
    $(this).addClass('on').siblings().removeClass('on');
    $(this).parent().siblings('.movie-content,.comic-content').children('.movie-item,.comic-item').eq($(this).index()).show().siblings().hide();
  });

  var len = $('.main-i').length;
  var count = 0;
  function play() {
    if (count < len - 1) {
      count++;
    } else {
      count = 0;
    }
    $('.main-i').eq(count).show().siblings().hide();
    $('.ctrl-i').eq(count).children('div').removeClass('mask').parent().siblings().children('div').addClass('mask');
  }
  $('.ctrl-i').hover(function(){
    count = $(this).index() - 1;
    play();
  })
  $('.slider').hover(function(){
    clearInterval(auto);
  },function(){
    auto = setInterval(play,3000);
  })
})
