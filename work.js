/*滚动通知：
消息自右向左进行滚动，超出范围则消失，可以完成循环滚动过程。*/
var container = document.getElementById("container");
var laba = document.getElementById("laba");
var p = document.getElementById("p");
container.style.overflow = "hidden";
p.style.display = "inline-block";
function animate2(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
            var speed = json[attr]/ 20;
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur;
			}else{
				obj.style[attr] = cur + 'px';
			}
			console.log(cur);
			if(json[attr] !== speed){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
		}
	}, 130);
}
animate2(p,{left:-180});
setInterval(function(){
    p.style.left = "1200px";
    animate2(p,{left:-150});
},22000);


/*轮播图效果*/
var box = document.getElementById("box");
var oNavlist = document.getElementById("nav").children;
var slider = document.getElementById("slider");
var left = document.getElementById("left");
var right = document.getElementById("right");
var index = 1;
var isMoving = false;
//轮播下一张的函数
function next(){
    if(!isMoving){
        isMoving = true;
        index++;
        navChange();
        animate(slider,{left:-1200*index},function(){
            if(index === 6){
                slider.style.left = "-1200px";
                index = 1;
            }
            isMoving = false;
        });
    }
}
//前一张
function prev(){
    if(!isMoving){
        isMoving = true;
        index--;
        navChange();
        animate(slider,{left:-1200*index},function(){
            if(index === 0){
                slider.style.left = "-6000px";
                index = 5;
            }
            isMoving = false;
        });
    }
}
var timer = setInterval(next,3000);
box.onmouseover = function(){//鼠标滑入清定时器
    animate(left,{opacity:50});
    animate(right,{opacity:50});
    clearInterval(timer);
}
box.onmouseout = function(){//鼠标划出开定时器
    animate(left,{opacity:0});
    animate(right,{opacity:0});
    timer = setInterval(next,3000);
}
right.onclick = next;
left.onclick = prev;
//小按钮点击事件
for(var i = 0;i<oNavlist.length;i++){
    oNavlist[i].idx = i;
    oNavlist[i].onclick = function(){
        index = this.idx + 1;
        animate(slider,{left:-1200*index});
        navChange();
    }
}
//小按钮背景色切换
function navChange(){
    for(var i = 0;i<oNavlist.length;i++){
        oNavlist[i].className = '';
    }
    if(index === 6){
        oNavlist[0].className = 'active';
    }
    else if(index === 0){
        oNavlist[4].className = 'active';
    }
    else{
        oNavlist[index - 1].className = 'active';
    }
}
