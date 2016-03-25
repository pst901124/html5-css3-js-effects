
//通过类名获取对象
/*
  classname     指定找得类名
  [obj]         指定一个查找范围       
*/
function getClass (classname,obj) {
     var obj=obj||document;
	 var arr=[];
	 if(obj.getElementsByClassName){
	    return obj.getElementsByClassName(classname)
	 }else{
	   var alls=obj.getElementsByTagName("*");
	   for (var i=0; i<alls.length; i++) {
	     if(checkclass(alls[i].className,classname)){
		  arr.push(alls[i])
		 }
	   }
	   return arr;
	 }
   }
function checkclass (startclass,endclass) {
     var arr=startclass.split(" ");
	 for (var i=0; i<arr.length; i++) {
	   if(arr[i]==endclass){
	     return true;
	   }
	 }
	 return false;
   }

//获得纯文本
/*
  obj  要获取的对象
  [val]  要设置的值
*/
   function getText (obj,val) {
    if(document.all){
	  if(val){
	   obj.innerText=val;
	  }else{
	  return obj.innerText;
	  }
	}else{
	  if(val){
	   obj.textContent=val;
	  }else{
	  return obj.textContent;
	  }
	}
  }
  //获取元素的样式
  /*
    obj  要获取的对象
	attr 要获取的属性
  */
  function getStyle (obj,attr) {
    if(obj.currentStyle){
		return obj.currentStyle[attr];  
	}else{
	  return getComputedStyle(obj,null)[attr];
	}
  }

//获取所有的子元素
 
 function getChilds (obj) {
	  var childs=obj.childNodes;
	  var arr=[];
	  for (var i=0; i<childs.length; i++) {
	     if(childs[i].nodeType==3){
		   continue;
		 }else{
		   arr.push(childs[i])
		 }
	  }
	  return arr;
    }

//获取第一个子元素
function getFirst (obj) {
	  var first=obj.firstChild;
	  if(first==null){
	   return false;
	  }
	  while (first.nodeType==3) {
	   first=first.nextSibling;
        if(first==null){
		   return false;
		  }
	  }
	  return first;
	}

//获取最后一个子元素
function getLast (obj) {
	  var last=obj.lastChild;
	  if(last==null){
	   return false;
	  }
	  while (last.nodeType==3) {
	   last=last.previousSibling;
        if(last==null){
		   return false;
		  }
	  }
	  return last;
	}

//获取下一个兄弟元素
function getNext(obj) {
	  var next=obj.nextSibling;
	  if(next==null){
	   return false;
	  }
	  while (next.nodeType==3) {
	   next=next.nextSibling;
        if(next==null){
		   return false;
		  }
	  }
	  return next;
	}

//获取上一个兄弟元素
function getUp(obj) {
	  var up=obj.previousSibling;
	  if(up==null){
	   return false;
	  }
	  while (up.nodeType==3) {
	   up=up.previousSibling;
        if(up==null){
		   return false;
		  }
	  }
	  return up;
	}



 //添加多个事件
 function addEvent (obj,ev,fn) {
  if(obj.attachEvent){
    obj.attachEvent("on"+ev,function  () {
	   fn.call(obj);
    });
  }else{
   obj.addEventListener(ev,fn,false);
  }
}


//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
	if(parent.contains){
	   return parent.contains(child) && parent!=child;
	}else{
	  return (parent.compareDocumentPosition(child)===20);
	}
 }

 //判断鼠标是否真正的从外部移入，或者是真正的移出到外部；

  function checkHover (e,target) {
	 if(getEvent(e).type=="mouseover"){
	    return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
		!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
	 }else{
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
		!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
		}
  }

//获得事件对象
  function getEvent (e) {
	    return e||window.event;
  }

  /*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
	  if(overfun){
	    obj.onmouseover=function  (e) {
			  if(checkHover(e,obj)){
			     overfun.call(obj);
			  }
	    }
	  }
	  if(outfun){
	    obj.onmouseout=function  (e) {
			  if(checkHover(e,obj)){
			     outfun.call(obj);
			  }
	    }
	  }
}


/*
 鼠标滚轮事件
*/

  function mouseScroll (obj,upfun,downfun) {
        if(obj.attachEvent){
			obj.attachEvent("onmousewheel",scrollFn);  //IE、 opera
			}else if(obj.addEventListener){
			obj.addEventListener("mousewheel",scrollFn,false);  //chrome,safari    -webkit-
			obj.addEventListener("DOMMouseScroll",scrollFn,false);  //firefox     -moz-
		}
	   function  scrollFn(e) {
		  var  ev=e||window.event;
		  var val=ev.wheelDelta||ev.detail;
		  if(val==120||val==-3){
		    if(upfun){
			  upfun.call(obj)
			}
		  }

		  if(val==-120||val==3){
		    if(downfun){
			  downfun.call(obj)
			}
		  }

		  if (ev.preventDefault ) 
			ev.preventDefault(); //阻止默认浏览器动作(W3C) 
			else
			//IE中阻止函数器默认动作的方式 
			ev.returnValue = false; 
		}
   }
