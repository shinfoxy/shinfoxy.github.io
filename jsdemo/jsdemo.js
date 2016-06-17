// JS DEMO 
// @author SU YI / Shinfoxy


// no1.自动选定文本内容 
// window.onload = function() {
//   var no1 = document.getElementById("no1");
//   no1.onclick = function(){
//     this.select();
//   }
// }

// 面向对象的尝试
var Form = function(){
  this.clickSelect = function(id) {
    var handler = document.getElementById(id);
    handler.onclick = function() {
      this.select();
    }
  }
}
var form = new Form();
form.clickSelect("no1");