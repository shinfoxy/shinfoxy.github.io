function Tab(config) {
  var self = this;

  this.root         = config.root;
  this.currentClass = config.currentClass;
  this.handler      = config.handler;
  this.currentIndex = config.currentIndex || 0;

  var trigger       = config.trigger || 'click';
  var isAutoPlay    = config.isAutoPlay;
  var playTime      = config.playTime || 3000;

  this.tabMenus     = this.root.getElementsByClassName('J_tab-menu');
  if (this.currentClass) {
    DomUtil.addClass(this.tabMenus[this.currentIndex],this.currentClass);
  }
  this.tabContents  = this.root.getElementsByClassName('J_tab-content');
  this.tabContents[this.currentIndex].style.display = 'block';

  if(isAutoPlay) {
    this.autoPlayTimer = setInterval(function(){
      self.autoHandler();
    },playTime);

    EventUtil.addHandler(this.root,'mouseover',function(){
      clearInterval(self.autoPlayTimer);
    });

    EventUtil.addHandler(this.root,'mouseout',function(){
      self.autoPlayTimer = setInterval(function(){
        self.autoHandler();
      },playTime)
    })
  }

  for (var i = 0;i < this.tabContents.length; i++) {
    this.tabMenus[i].index = i;
    EventUtil.addHandler(this.tabMenus[i],trigger,function(){
      self.showItem(this.index);
      this.currentIndex = this.index;
    })
  }


}
Tab.prototype = {
  showItem: function(n) {
    for(var i = 0;i < this.tabContents.length;i++) {
      this.tabContents[i].style.display = 'none';
    }
    this.tabContents[n].style.display = 'block';
    if (this.currentClass) {
      var currentMenu = this.root.getElementsByClassName(this.currentClass)[0];
      if (currentMenu) {
        DomUtil.removeClass(currentMenu, this.currentClass);
      }
      DomUtil.addClass(this.tabMenus[n],this.currentClass);
    }
    if (this.handler) {
      this.handler(n);
    }
  },
  autoHandler: function() {
    this.currentIndex++;
    if (this.currentIndex >= this.tabMenus.length) {
      this.currentIndex = 0;
    }
    this.showItem(this.currentIndex);
  }
}