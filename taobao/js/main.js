

    var tabs = document.getElementsByClassName("board-tab")[0];
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