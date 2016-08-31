/*
 * base.js 
 */
var DomUtil = {
  addClass : function (node,str) {
      if (!new RegExp("(^|\\s+)" + str).test(node.className)) {
          node.className = node.className + " " + str;
      }
  },
  removeClass : function (node,str) {
      node.className = node.className.replace(new RegExp("(^|\\s+)"+str),"");
  },
  setOpacity: function(node, level) {
    node = typeof node === "string" ? document.getElementById(node) : node;
    if (document.all) {
      node.style.filter = 'alpha(opacity =' + level + ')';
    } else {
      node.style.opacity = level / 100;
    }
  },
  getNextNode: function(node) {
    node = typeof node === "string" ? document.getElementById(node) : node;
    var  nextNode = node.nextsibling;
    if(!nextNode) return null;
    if(!document.all) {
      while(true) {
        if (nextNode.nodetype === 1) {
          break;
        } else {
          if(nextNode.nextsibling) {
            nextNode = nextNode.nextsibling;
          } else {
            break;
          }
        }
      }
    }
    return nextNode;
  }
};

var EventUtil = {
  addHandler: function (element,type,handler) {
    if(element.addEventListener) {
      element.addEventListener(type,handler,false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler) 
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler: function (element,type,handler) {
    if(element.removeEventListener) {
      element.removeEventListener(type,handler,false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler) 
    } else {
      element["on" + type] = null;
    }
  }
}