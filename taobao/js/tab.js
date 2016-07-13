Tab.prototype = {
  init: function(tab,content,num) {
    var self = this;
        this.tab = tab;
        this.content = content;
        this.index = 0;
        this.num = num;
        for( i = 0; i < this.num ; i++) {
          this.tab[i] = i;
          this.tab[i].onmouseover = function() {
            show(this.index);
          }
        }
  },
  show: function(a) {
        index = a;
        clearTimeout(timer);
        var timer = setTimeout(function() {
          for( i = 0; i < this.num; i++ ) {
            this.tab[i].className = "";
            this.content[i].style.display = "none";
            this.tab[index].className = "cur";
            this.content[i].style.display = "block"
          }
        });
  }
}