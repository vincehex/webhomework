var list = new Array(); //用来装雪花的集合

(function(){
	setInterval("run()", 10); //执行这个方法之后开始下雪
	//参数1:方法名	参数2:间隔时间单位ms
	//意思是每隔10ms执行一次run()方法
})();

function newXue() { //创建一个雪花
	var v = new Object(); //创建一个对象
	v.wh = Math.random() * 20 + 15; //wh代表雪花的宽高
	var gailv = window.innerWidth / (window.innerWidth + window.innerHeight);
	//gailv=概率的拼音;概率=浏览器宽度/(浏览器宽度+浏览器高度)
	//假设你浏览器是1920*1080的那gailv就是0.64
	//然后 雪花出现的位置有64%是在屏幕上边,36%是在屏幕右边
	if (Math.random() < gailv) {
		//在屏幕上方创建雪花 设置xy坐标
		v.x = Math.random() * window.innerWidth;
		v.y = -v.wh;
	} else {
		//在屏幕右方创建雪花 设置xy坐标
		v.x = window.innerWidth;
		v.y = Math.random() * window.innerHeight;
	}


	v.sdx = Math.random() + 0.3; //雪花的x轴移动速度
	v.sdy = Math.random() + 1; //雪花的y轴移动速度
	v.div = document.createElement("div"); //创建一个div,每个雪花都有一个div,这个div是用来显示雪花的
	v.div.className = "xue"; //设置div的类

	//设置div的位置
	v.div.style.width = v.wh + "px";
	v.div.style.height = v.wh + "px";
	document.getElementById("hua").appendChild(v.div); //把这个div添加到画布（hua）里
	list.push(v); //把雪花添加到集合
}

var loadxue = 10;
var load = 0;

function run() {
	load++; //让load自增
	if (load == loadxue) {
		//每当load == loadxue时 创建一个雪花
		//这个方法每10ms执行一次,每执行10次这个方法就创建一个雪花
		newXue();
		load = 0;
	}
	//雪花的移动,遍历list集合
	for (var i = 0; i < list.length; i++) {
		var v = list[i];
		//一些简单的坐标计算
		v.x -= v.sdx;
		v.y += v.sdy;
		v.div.style.left = v.x + "px";
		v.div.style.top = v.y + "px";
		//雪花飘出可视范围之后删除雪花
		if (v.x + v.wh < 0 || v.y > window.innerHeight) {
			list.splice(i, 1); //从list删除雪花
			document.getElementById("hua").removeChild(v.div); //删除div
		}
	}
}
