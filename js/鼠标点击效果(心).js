(function(window, document, undefined) {
	var hearts = [];									// 定义 数组
	window.requestAnimationFrame = (function() {
		return window.requestAnimationFrame ||	
			window.webkitRequestAnimationFrame ||	// chrome下的
			window.mozRequestAnimationFrame ||			// 火狐浏览器
			window.oRequestAnimationFrame ||			// Opera浏览器
			window.msRequestAnimationFrame ||			// IE浏览器
			function(callback) {						// 调用回调函数
				setTimeout(callback, 1000 / 60);
			}
	})(); 			// 设置 每1000 / 60 帧 刷新一次  （不严谨)
	init();												// 初始化调用

	function init() {
		css(
			".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
		);			// 设置 心的css样式
		attachEvent();
		gameloop();
	}

	function gameloop() {							// 定义心的行为（向上，变淡，消失）
		for (var i = 0; i < hearts.length; i++) {
			if (hearts[i].alpha <= 0) {					// 如果透明度小于0 的话
				document.body.removeChild(hearts[i].el);			// 移除 div元素
				hearts.splice(i, 1);				// 从数组中 下标为i位置 删除1个元素
				continue;
			}
			hearts[i].y--;					// 慢慢向上走	
			hearts[i].scale += 0.004;		// 定义2D缩放  慢慢变大
			hearts[i].alpha -= 0.013;      // 心型图案 透明度
			hearts[i].el.style.cssText = "left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i].alpha +
				";transform:scale(" + hearts[i].scale + "," + hearts[i].scale + ") rotate(45deg);background:" + hearts[i].color; //设置心的样式
																						// 因为 transform 覆盖了 之前的 transform ，所以这里还需要旋转45度
		}
		requestAnimationFrame(gameloop);		// 循环调用
	}

	function attachEvent() {
		var old = typeof window.onclick === "function" && window.onclick;			// 判断 是否是鼠标点击事件
		window.onclick = function(event) {			// 鼠标点击事件
			old && old();
			createHeart(event);							// 每点击一次 创建一个心
		}
	}

	function createHeart(event) {
		var d = document.createElement("div");
		d.className = "heart";		// 设置d的类
		hearts.push({				// 往hearts数组中添加内容 （内容为一个对象）
			el: d,
			x: event.clientX - 5,			//clientX  获取相当于body可视化的当前横坐标
			y: event.clientY - 5,
			scale: 1,						// 缩放大小
			alpha: 1,						// 透明度
			color: randomColor()
		});
		document.body.appendChild(d);		// body里面添加d 元素
	}

	function css(css) {
		var style = document.createElement("style");			// 创建元素
		style.type = "text/css";
		try {
			style.appendChild(document.createTextNode(css));	// 创建文本节点
		} catch (ex) {
			style.styleSheet.cssText = css;						// 如果try出现错误 执行这段
		}
		document.getElementsByTagName('head')[0].appendChild(style);  	// 在head标签里面加上 style 标签
	}

	function randomColor() {  	// 随机颜色  俩~~ 相当于 floor
		return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
	}
})(window, document);		// 自调用函数
