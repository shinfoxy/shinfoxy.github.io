
Slider.prototype = {
  init: function(obj, indexA, howmany) {
    var self = this;
        this.obj = obj;
        this.num = howmany;
        this.width = 520;
        this.indexA = indexA;
        this.index = 0;
        this.left = this.obj.parentNode.querySelector(".prev");
        this.right = this.obj.parentNode.querySelector(".next");
        this.autoTimer = setInterval(function(){
          self.next();
        },3000);
        this.obj.parentNode.onmouseover = function() {
          clearInterval(self.autoTimer);
        };
        this.obj.parentNode.onmouseout = function() {
          self.autoTimer = setInterval(function() {
            self.next();
          },3000)
        }
        this.left.onclick = function() {
          self.prev();
        };
        this.right.onclick = function() {
          self.next();
        };
        for( var i = 0; i < this.num ; i++) {
          this.indexA[i].index = i;
          this.indexA[i].onclick = function() {
            self.index = this.index;
            self.move(this.index);
          }
        }

  },

  prev: function() {
    this.index--;
    if (this.index === -1) {
      this.index = this.num;
      this.obj.style.left = (this.index + 1) * (-this.width) + "px";
      this.index--;
    }
    this.move(this.index);
  },

  next: function() {
    this.index++;
    if(this.index === this.num) {
      this.index = 0;
      this.obj.style.left = 0;
    }
    this.move(this.index);
  },

  move: function(index) {
    var translate = - (index + 1) * this.width;
    var self = this;
    clearInterval(self.timer);
    for (var i = 0; i < this.num; i++) {
      this.indexA[i].className = "";
    }
    // index === -1 ? index = this.num - 1 :'';
    this.indexA[index].className = "cur";
    // console.log("index: " + index);
    self.timer = setInterval(function() {
      var iSpeed = (translate - self.obj.offsetLeft) / self.num;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      if (iSpeed === 0) {
        clearInterval(self.timer);
      } else {
        self.obj.style.left = self.obj.offsetLeft + iSpeed + "px";
      }
    },15);
  }
}
// Slider.prototype = {
//   init: function(obj, indexA, howmany) {
//     var self = this;
//         this.obj = obj;
//         this.num = howmany;
//         this.width = 520;
//         this.indexA = indexA;
//         this.index = 0;
//         this.left = this.obj.parentNode.querySelector(".prev");
//         this.right = this.obj.parentNode.querySelector(".next");
//         this.autoTimer = setInterval(function(){
//           self.next();
//         },3000);
//         this.obj.parentNode.onmouseover = function() {
//           clearInterval(self.autoTimer);
//         };
//         this.obj.parentNode.onmouseout = function() {
//           self.autoTimer = setInterval(function() {
//             self.next();
//           },3000)
//         }
//         this.left.onclick = function() {
//           self.prev();
//         };
//         this.right.onclick = function() {
//           self.next();
//         };
//         for( var i = 0; i < this.num ; i++) {
//           this.indexA[i].index = i;
//           this.indexA[i].onclick = function() {
//             self.index = this.index;
//             self.move(this.index);
//           }
//         }

//   },

//   prev: function() {
//     this.index--;
//     if (this.index === -1) {
//       this.index = this.num;
//       this.obj.style.left = (this.index + 1) * (-this.width) + "px";
//       this.index--;
//     }
//     this.move(this.index);
//   },

//   next: function() {
//     this.index++;
//     if(this.index === this.num) {
//       this.index = 0;
//       this.obj.style.left = 0;
//     }
//     this.move(this.index);
//   },

//   move: function(index) {
//     var translate = - (index + 1) * this.width;
//     var self = this;
//     clearInterval(self.timer);
//     for (var i = 0; i < this.num; i++) {
//       this.indexA[i].className = "";
//     }
//     // index === -1 ? index = this.num - 1 :'';
//     this.indexA[index].className = "cur";
//     // console.log("index: " + index);
//     self.timer = setInterval(function() {
//       var iSpeed = (translate - self.obj.offsetLeft) / self.num;
//       iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
//       if (iSpeed === 0) {
//         clearInterval(self.timer);
//       } else {
//         self.obj.style.left = self.obj.offsetLeft + iSpeed + "px";
//       }
//     },15);
//   }
// };

