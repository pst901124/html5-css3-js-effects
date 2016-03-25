
//ͨ��������ȡ����
/*
  classname     ָ���ҵ�����
  [obj]         ָ��һ�����ҷ�Χ       
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

//��ô��ı�
/*
  obj  Ҫ��ȡ�Ķ���
  [val]  Ҫ���õ�ֵ
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
  //��ȡԪ�ص���ʽ
  /*
    obj  Ҫ��ȡ�Ķ���
	attr Ҫ��ȡ������
  */
  function getStyle (obj,attr) {
    if(obj.currentStyle){
		return obj.currentStyle[attr];  
	}else{
	  return getComputedStyle(obj,null)[attr];
	}
  }

//��ȡ���е���Ԫ��
 
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

//��ȡ��һ����Ԫ��
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

//��ȡ���һ����Ԫ��
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

//��ȡ��һ���ֵ�Ԫ��
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

//��ȡ��һ���ֵ�Ԫ��
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



 //��Ӷ���¼�
 function addEvent (obj,ev,fn) {
  if(obj.attachEvent){
    obj.attachEvent("on"+ev,function  () {
	   fn.call(obj);
    });
  }else{
   obj.addEventListener(ev,fn,false);
  }
}


//�ж�ĳ��Ԫ���Ƿ����������һ��Ԫ��
 function contains (parent,child) {
	if(parent.contains){
	   return parent.contains(child) && parent!=child;
	}else{
	  return (parent.compareDocumentPosition(child)===20);
	}
 }

 //�ж�����Ƿ������Ĵ��ⲿ���룬�������������Ƴ����ⲿ��

  function checkHover (e,target) {
	 if(getEvent(e).type=="mouseover"){
	    return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
		!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
	 }else{
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
		!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
		}
  }

//����¼�����
  function getEvent (e) {
	    return e||window.event;
  }

  /*
  obj   Ҫ�����Ķ���
  overfun   ���������Ҫ����ĺ���
  outfun     ����Ƴ���Ҫ����ĺ���
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
 �������¼�
*/

  function mouseScroll (obj,upfun,downfun) {
        if(obj.attachEvent){
			obj.attachEvent("onmousewheel",scrollFn);  //IE�� opera
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
			ev.preventDefault(); //��ֹĬ�����������(W3C) 
			else
			//IE����ֹ������Ĭ�϶����ķ�ʽ 
			ev.returnValue = false; 
		}
   }
