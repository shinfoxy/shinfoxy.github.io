var urlPre = "http://cors.itxti.net/?";
var url1 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeByStationName?UserID=";
var url2 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeDataSetByLikeTrainCode?UserID=";
var url3 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getDetailInfoByTrainCode?UserID=";

// 获取车次列表
var getTrainList = function() {
  if($('#searchNo').val() || ($('#searchBegin').val() && $('#searchEnd').val())) {
    var searchBtn = $(this);
    searchBtn.button("option","disabled",true);
    $.mobile.loading("show");

    var _data = {};
    var _url = url1;
    if(!$('#searchNo').val()) {
      // 接口的参数
      _data.StartStation = $('#searchBegin').val();
      _data.ArriveStation = $('#searchEnd').val();

    } else {
      _data.TrainCode = $('#searchNo').val();
      _url = url2;
    }

    $.get(urlPre + _url, _data, function(data) {
      // 每次先清空
      $('#list').html('');
      // 获取列表
      var list = $('#list');
      // 每一则信息在XML 的 TimeTable中

      var timeTables = $(data).find('TimeTable');
      var _arr = [];
      timeTables.each(function(index,item) {
        var i = index;
        if (i > 10) { return false; } 
        var that = $(this);
        if(that.find("FirstStation").text() === '数据没有被发现') {
          alert("数据没有被发现");
          return false;
        }
        var _html = 
        '<li><a href="#" data-no="'+ that.find("TrainCode").text() + '">' + 
           '<h2>'+ that.find("TrainCode").text() + '</h2>' +
            '<p>'+ that.find("FirstStation").text()+ '-' + that.find("LastStation").text() + '</p>' +
            '<p>用时：'+ that.find("UseDate").text() + '</p>' +
            '<p class="ui-li-aside">'+ that.find("StartTime").text() + '开</p>' +
          '</a>' +
        '</li>';
        _arr.push(_html);
      });
      if(_arr.length > 0) {
        list.html(_arr.join(""));
        list.listview('refresh');
      }
      // 
      $.mobile.loading("hide");
      searchBtn.button("option", "disabled",false)

    })
  } else {
    alert('请输入发车站和终点站，或者输入车次！')
  }
}
// 点击查询具体信息
var isAjax = false;
var getInfoByTrainCode = function() {
  if(isAjax) return;
  isAjax = true;

  $.mobile.loading("show");
  var trainCode = $(this).attr('data-no');
  $.get(urlPre + url3, {TrainCode: trainCode}, function(data) {
    $("#detail").find("ui-content h2").first().html(trainCode + "次");
    var tbody = $("#detail").find(".ui-content tbody");
    // Clear
    tbody.html("");
    $(data).find("TrainDetailInfo").each(function(index,item) {
      var tr = $("<tr></tr>");
      var that = $(this);
      var _html = '<td>' + that.find("TrainStation").text() + '</td>' + 
                  '<td>' + that.find("ArriveTime").text() + '</td>' + 
                  '<td>' + that.find("StartTime").text() + '</td>' ;
      tr.html(_html);
      tbody.append(tr);
    })
    $.mobile.loading("hide");
    isAjax = false;
    // 页面跳转
    $.mobile.changePage('#detail');
  })
}
var bindEvent = function() {
  $("#searchSubmit").on('click',getTrainList);
  $("#list").on('click','a',getInfoByTrainCode);
}
$(document).on("pageinit","#index",function() {
  bindEvent();

})