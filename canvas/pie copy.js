
function Pie (config) {
    this._dom = config.container;
    this._cvs = config.canvas;
    this._ctx = config.ctx;
    this._w = config.width;
    this._h = config.height;
    this.dpr = config.dpr;
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
    };
}
Pie.prototype = {
    _testColor: function (color) {
        var re1 = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i
        var re2 = /^rgb\(([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\)$/i
        var re3 = /^rgba\(([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,(1|1.0|0.[0-9])\)$/i
        return re2.test(color) || re1.test(color) || re3.test(color);
    },
    _error: function(msg) {
        throw Error(msg)
    },
    _check: function(config) {
        var msg1 = '不是合法的色值';
        var that = this;
        // bgcolor
        if(config.bgcolor && !this._testColor(config.bgcolor)) {
            this._error('\"bgcolor\"' + msg1);
        }
        // radius
        var r = config.radius;
        if(Array.isArray(r) && r.length === 2) {
            r.forEach(function(v) {
                if(isNaN(v)) {
                    that._error('\"radius\"必须是数字')
                }
                if(v >= 1 || v <= 0) {
                    that._error('\"radius\"必须大于0且小于1')
                }
            })
        }else {
            this._error('\"radius\"必须是有两项的数组')
        }
        // startAngle 
        if(isNaN(config.startAngle)) {
            that._error('\"startAngle\"必须是数字');
        }
        if(config.startAngle > 360 || config.startAngle < 0) {
            that._error('\"startAngle\"必须大于0且小于360');
            
        }
        // circlecolor 
        if(config.circleColor && !this._testColor(config.circleColor)) {
            this._error('\"circleColor\"' + msg1);
        }
        // arcColor
        var arc = config.arcColor;
        if(Array.isArray(arc)) {
            arc.forEach(function(v) {
                if(!that._testColor(v)){
                    that._error('\"arcColor\"'+msg1);
                }
            })
        }else if(this._testColor(arc)) {
            // nothing to do
        }else {
            this._error('\"arcColor\"'+msg1);
        }
        // dotColor
        var dot = config.dotColor;
        if(dot !== null) {
            if(Array.isArray(dot)){
                dot.forEach(function(v) {
                    if(!that._testColor(v)){
                        that._error('\"dotColor\"'+msg1);
                    }
                })
            }
        }
        // lineCap
        if(config.lineCap && (config.lineCap !== 'round' && config.lineCap !== 'butt')) {
            this._error('\"lineCap\"必须是\"round\"或\"butt\"');
        } 
        // value
        if(config.value < 0 || config.value > 100) {
            this._error('\"value\"必须大于等于0且小于等于100');
        }
    },
    render: function(config) {
        var opts =  {
            bgcolor: '',	// canvas 的背景色
            radius: [0.7, 0.8],		// 圆环的宽度，用canvas的宽度乘以这两个数
            startAngle: 0,		// 角度0-360  0是12点方向
            circleColor: '#eee',    // 圆环底色
            arcColor: '#50CDCC',    // 数据环颜色，可以为数组（渐变色）
            dotColor: null,    // 两个端点的颜色，必须为2项的数组['red', 'blue'],第一个是开始端点的颜色，第二个是结束端点的颜色
            lineCap: 'round',	// 默认样式，可选值'round'，两端为圆球端点，'butt'两端为非球形端点
            value: 56,		// 0-100
        };
        this.options = Object.assign(opts, config);
        this._check(this.options);     // 检查各配置项是否合法
        /*
        * ***注意*** 所有的颜色不支持英文单词 如 red blue
        * ***边缘处理***
        *   1. lineCap为'butt'是直角边缘
        *   2. lineCap为'round'是圆角边缘，此时，如果dotColor有值，则两个端点为小圆球，如果dotColor无值，则两个端点为数据圆环的颜色
        */
        this._init();
    },
    _createLinearGradient: function(ctx, colorArr) {
        if(!colorArr.length) return;
        var gradient = ctx.createLinearGradient(this._w/2, 0, -this._w/2, 0);
        var step = 1 / (colorArr.length - 1);
        colorArr.forEach(function(color, idx) {
            gradient.addColorStop(idx * step, color);
        })
        gradient.addColorStop(1, colorArr[1]);
        return gradient;
    },
    _init: function() {
        // var ctx = this.ctx;
        // var container = this._dom;
        var opt = this.options;
        this.value = opt.value;
        var _w = this._w;
        var _h = this._h;
        var PI = Math.PI;
        var base = Math.min(_w, _h);
        var dis = base/2 * (Number(opt.radius[1]) - Number(opt.radius[0]));		// 圆环宽度
        var r1 = base/2 * (Number(opt.radius[1]) + Number(opt.radius[0]))/2;		// 圆环半径
        var r2 = dis/2;		// 端点半径
        r1 = Math.floor(r1);
        var circle_x = _w/2;
        var circle_y = _w/2;
        var circle_color = opt.circleColor;
        var circle_lineWidth = parseInt(dis);

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
            color: opt.arcColor
        }

        var hasDot = opt.lineCap === 'round';
        var hasDotColor = opt.dotColor !== null;    // 是否设置了端点颜色
        // // 数据圆
        var initStart = 0;
        if(opt.startAngle) {
            initStart = Number(opt.startAngle)*(PI/180);
        }
        var startangle, targetEndAngle;
        if(hasDot && hasDotColor) {
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
            var dot_color = opt.dotColor;
            var sxy = this._radian2xy(startangle, r1);	// 起点的xy
            var exy = this._radian2xy(targetEndAngle, r1);		// 终点的xy
            var dot_color = opt.dotColor;
            var f = dot_color !== null;

            this.dots = {
                start: {
                    x: sxy.x,
                    y: sxy.y,
                    r: r2,
                    color: f ? dot_color[0] : '#000'
                },
                end: {
                    x: exy.x,
                    y: exy.y,
                    r: r2,
                    color: f ? dot_color[1] : '#000'
                }
            }

        }

        this._draw();


    },
    _draw: function() {
        var ctx = this._ctx;
        var container = this._dom;
        var opt = this.options;
        var dpr = this.dpr;

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
        ctx.scale(dpr, dpr);
        // ctx.translate(0.5, 0.5);
        ctx.clearRect(_w/2, _h/2, _w, _h);
        ctx.translate(_w/2, _h/2);
        ctx.rotate(-PI/2); 	// 旋转画布

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
        var hasDot = opt.lineCap === 'round';
        var hasDotColor = opt.dotColor !== null;    // 是否单独设置了dot的颜色

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
        if(hasDot) {
            if(hasDotColor) {
                ctx.lineCap = 'butt';
            }else {
                ctx.lineCap = 'round';
            }
        }else {
            ctx.lineCap = 'butt';
        }
        ctx.stroke();


        // 端点
        if(hasDot && hasDotColor) {
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
    var c = cvs.getContext('2d');
    var dpr = (window.devicePixelRatio || 1) / (
        c.webkitBackingStorePixelRatio ||
        c.mozBackingStorePixelRatio ||
        c.msBackingStorePixelRatio ||
        c.oBackingStorePixelRatio ||
        c.backingStorePixelRatio || 1
    );

    cvs.style.width = w + 'px';
    cvs.style.height = h + 'px';
    cvs.width = w * dpr;
    cvs.height = h * dpr;
    dom.appendChild(cvs)

    return new Pie({
        canvas: cvs,
        container: dom,
        ctx: c,
        width: w,
        height: h,
        dpr: dpr
    });
}