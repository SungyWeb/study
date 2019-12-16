function Pie (config) {
	this._dom = config.container;
	this._cvs = config.canvas;
	this._w = config.width;
	this._h = config.height;
	this.circle = {};	// 底色的圆圈
	this.arc = {};		// 数据圆弧
	this.dots = {};		// 两个端点的小圆
	this.timer = null;		// 动画定时器
	this._count = 0;
	this._step = Math.PI/25;	// 1000ms 走完 2PI, 每20ms走一步， (2PI/1000)*20 = step
	this.value = 0;
	this.radians = {
		cur: {
			start: null,
			end: null
		},
		old: {
			start: null,
			end:null
		}
	}
}
Pie.prototype = {
	render: function(config) {
		var opts = this.options || {
			bgcolor: '',	// canvas 的背景色
			radius: [0.7, 0.8],		// 圆环的宽度，用canvas的宽度乘以这两个数
			startAngle: 0,		// 角度0-360  0是12点方向
			colors: {
				circle: '#eee',		// 底色圆环
				arc: ['#50CDCC', '#557DFF'],		// 圆环颜色，字符串为单色，数组为从上向下的渐变色
				dot: ['#50CDCC', '#557DFF']		// 开始端点的颜色，和结束端点的颜色，必须数组
			},
			linecap: 'butt',	// 默认样式，可选值'round'，两端为圆球端点
			value: 56,		// 0-100
		};
		if(opts.value > 100 || opts.value < 0) {
			throw Error('数值必须在0-100之间')
		}
		this.options = Object.assign(opts, config);
		this._init();
	},
	_createLinearGradient: function(ctx, colorArr) {
		var gradient = ctx.createLinearGradient(this._w/2, 0, -this._w/2, 0);
		gradient.addColorStop(0, colorArr[0]);
		gradient.addColorStop(1, colorArr[1]);
		return gradient;
	},
	_init: function() {
		var ctx = this._cvs.getContext('2d');
		var container = this._dom;
		var opt = this.options;
		this.value = opt.value;
		var _w = this._w;
		var _h = this._h;
		var PI = Math.PI;
		var dis = _w/2 * (opt.radius[1] - opt.radius[0]);		// 圆环宽度
		var r1 = _w/2 * (opt.radius[1] + opt.radius[0])/2;		// 圆环半径
		var r2 = dis/2;		// 端点半径
		r1 = Math.floor(r1);
		var circle_x = _w/2;
		var circle_y = _w/2;
		var circle_r = r1;
		var circle_color = opt.colors.circle;
		var circle_lineWidth = parseInt(dis);
		var circle_startAngle = 0;
		var circle_endAngle = 2*PI;

		this.circle = {
			x: circle_x,
			y: circle_y,
			r: r1,
			lineWidth: circle_lineWidth,
			color: circle_color
		}
		this.arc = {
			x: circle_x,
			y: circle_y,
			r: r1,
			lineWidth: circle_lineWidth,
			color: opt.colors.arc
		}

		var hasDot = opt.linecap === 'round';
		// // 数据圆
		var initStart = 0;
		if(opt.startAngle) {
			initStart = opt.startAngle*(PI/180);
		}
		var startangle, targetEndAngle;
		if(hasDot) {
			var dis_arc = Math.atan(r2/r1);		// 弧度差
			startangle = initStart + dis_arc;
			targetEndAngle = initStart + ((opt.value/100) * 2 * PI) - dis_arc;
		}else {
			startangle = initStart;
			targetEndAngle = initStart + (opt.value / 100 * 2 * PI);
		}
		
		
		// this.radians.old = {
		// 	start: this.radians.cur.start,
		// 	end: this.radians.cur.end
		// }

		this.radians.cur = {
			start: startangle,
			end: targetEndAngle
		};
		// 角度 = 弧度 / (Math.PI / 180);
		// 弧度 = 弧长 / 半斤
		if(hasDot) {
			var dot_color = opt.colors.dot;
			var sxy = this._radian2xy(startangle, r1);	// 起点的xy
			var exy = this._radian2xy(targetEndAngle, r1);		// 终点的xy
			var f = typeof(dot_color) === 'string';
			
			this.dots = {
				start: {
					x: sxy.x,
					y: sxy.y,
					r: r2,
					color: f ? dot_color : dot_color[0] 
				},
				end: {
					x: exy.x,
					y: exy.y,
					r: r2,
					color: f ? dot_color : dot_color[1],
				}
			}
			
		}

		this._draw(ctx, opt);


	},
	_draw: function() {
		var ctx = this._cvs.getContext('2d');
		var container = this._dom;
		var opt = this.options;
		ctx.save();
		var _w = this._w;
		var _h = this._h;
		var PI = Math.PI;
		var circle = this.circle, arc = this.arc, dots = this.dots;
		if(opt.bgcolor) {
			ctx.fillStyle = opt.bgcolor;
			ctx.fillRect(0, 0, container.clientWidth, container.clientHeight);
		}
		// 偏移
		// ctx.translate(0.5, 0.5);
		ctx.clearRect(_w/2, _h/2, _w, _h);
		ctx.translate(_w/2, _h/2);
		ctx.rotate(-PI/2); 	// 旋转画布
		// ctx.scale(4, 4);

		// 底圆
		ctx.beginPath();
			ctx.arc(0, 0, circle.r, 0, 2*PI, false);
		ctx.closePath();
		ctx.strokeStyle = circle.color;
		ctx.lineWidth = circle.lineWidth;
		ctx.stroke();


		// 数据圆
		var _this = this;
		_this._count++;
		var hasDot = opt.linecap === 'round';
		// 数据圆
		// var initStart = 0;
		// if(opt.startAngle) {
		// 	initStart = opt.startAngle*(PI/180);
		// }
		// var startangle, targetEndAngle;
		// if(hasDot) {
		// 	var dis_arc = Math.atan(dots.start.r/arc.r);		// 弧度差
		// 	startangle = initStart + dis_arc;
		// 	targetEndAngle = initStart + ((opt.value/100) * 2 * PI) - dis_arc;
		// }else {
		// 	startangle = initStart;
		// 	targetEndAngle = initStart + (opt.value / 100 * 2 * PI);
		// }

		var cs = this.radians.cur.start;
		var ce = this.radians.cur.end;
		var os = this.radians.old.start;
		var oe = this.radians.old.end;
		var step = _this._step;
		var cur = null;		// 当前弧度
		var tar = null;		// 目标弧度
		if(os !== null && oe !== null) {
			// update 方法进入
			var isAnit = ce < oe; // 是否逆时针，即新值小于旧值
			if(isAnit){
				step *= -1;
				cur = oe + _this._count * step;
				tar = ce;
			}else {
				cur = oe + _this._count * step;
				tar = ce;
			}
		}else {
			// init 方法进入
			cur = cs + _this._count * _this._step;
			tar = ce;
			isStop = cur > tar;
		}

		var isStop = isAnit ? cur < tar : cur > tar;
		// var isStop = cur > tar;
		if(isStop){
			cur = tar;
		}
		
		ctx.beginPath();
			ctx.arc(0, 0, arc.r,cs, cur, false);
		// ctx.closePath();
		var arc_color = arc.color;
		
		if(typeof arc_color === 'string') {
			ctx.strokeStyle = arc_color;
		}else {
			ctx.strokeStyle = this._createLinearGradient(ctx, arc_color);
		}		
		ctx.stroke();


		// 端点
		if(hasDot) {
			var sdot = dots.start, edot = dots.end;
			
			ctx.beginPath();
				ctx.arc(sdot.x, sdot.y, sdot.r,0, 2*PI, true);
				ctx.fillStyle = sdot.color;
				ctx.fill();
			if(isStop) {
				ctx.beginPath();
				ctx.arc(edot.x, edot.y, edot.r,0, 2*PI, true);
				ctx.fillStyle = edot.color;
				ctx.fill();
			}
			
		}


		ctx.restore();

		if(isStop){
			if(_this.timer) {
				clearTimeout(_this.timer)
				_this.timer = null;
			}
			
		}else {
			_this.timer = setTimeout(function() {
				_this._draw();
			}, 20);
		}
	},
	_radian2xy: function(radian, radius) {

		return {
			x: radius * Math.cos(radian),
			y: radius * Math.sin(radian)
		}
	},
	update: function(num) {
		num = parseInt(num);
		if(num > 100 || num < 0) {
			throw Error('数值必须在0-100之间')
		}
		var radian = (num/100) * 2 * Math.PI;
		this.radians.old.start = this.radians.cur.start;
		this.radians.old.end = this.radians.cur.end;
		this.radians.cur.end = radian;
		var enddotxy = this._radian2xy(radian, this.arc.r);
		this.dots.end.x = enddotxy.x;
		this.dots.end.y = enddotxy.y;
		this._count = 0;
		this._draw();
	}
}
Pie.init = function(dom) {
	var w = dom.clientWidth;
	var h = dom.clientHeight;
	var cvs = document.createElement('canvas');
	var dpr = window.devicePixelRatio || 1;

	cvs.style.width = '100%';
	cvs.style.height = '100%';
	var rect = cvs.getBoundingClientRect();
	cvs.width = w * dpr;
	cvs.height = h * dpr;
	dom.appendChild(cvs)

	return new Pie({
		canvas: cvs,
		container: dom,
		width: w,
		height: h,
	});
}