(function() {
    function Pie(el, config) {
        this.el = el;
        this.w = el.clientWidth;
        this.h = el.clientHeight;
        if(!config.value || isNaN(config.value)) {
            throw Error('必须设置value值')
        }
        this.option = Object.assign({
            radius: [0.6, 0.7],
            startAngle: 0,
            circleColor: '#eee',
            arcColor: '#f0f',
            linecap: 'round'
        }, config);
        this.init();
    }
    Pie.prototype = {
        init: function() {
            var svg = this._createSvgElement('svg');
            var circle = this._createSvgElement('circle');
            var path = this._createSvgElement('path');
            svg.style.width = '100%';
            svg.style.height = '100%';
            var _w = this.w, _h = this.h;
            var base = Math.min(_w, _h);
            var opt = this.option;
            var r1 = opt.radius[0], r2 = opt.radius[1];
            var dis = Math.round((r2 - r1) * base / 2);
            var r = Math.round(((r2 - r1) / 2 + r1) * base / 2);
            var circle_attrs = {
                cx: _w / 2,
                cy: _h / 2,
                r: r,
                stroke: opt.circleColor,
                'stroke-width': dis,
                fill: 'none'
            };
            this._setAttr(circle, circle_attrs);
            var sa = opt.startAngle;    // 起点的角度
            // var sdeg = sa * PI / 180;    // 起点的弧度  注意应该计算弧度终点的位置，而不是起点的位置
            var sxy = this._deg2xy(sa, r);    // 起点的坐标
            var sx = sxy.x;
            var sy = sxy.y;
            var va = opt.value * (360 / 100);    // value的角度
            var ea = sa + va;    // 终点角度 = value角度 + 起点角度
            var isLargeArc = opt.value > 50 ? 1 : 0;     // 是否为大角弧度 
            var exy = this._deg2xy(ea, r);
            var ex = exy.x;
            var ey = exy.y;
            var path_d = `M ${sx}, ${sy}`;
            path_d += `A ${r}, ${r}, 0, ${isLargeArc}, 1, ${ex}, ${ey}`;
            
            var path_attrs = {
                transform: `translate(${_w/2}, ${_h/2}) rotate(-90 0 0)`,
                d: path_d,
                'stroke-width': dis,
                stroke: opt.arcColor,
                'stroke-linecap': opt.linecap,
                'stroke-dashoffset': 0,
                'stroke-dasharray': '0 100%',
                fill: 'none',
            };
            this._setAttr(path, path_attrs);
            path.style.transition = 'stroke-dasharray .5s linear';
            svg.appendChild(circle);
            svg.appendChild(path);
            this._append(svg);
            setTimeout(function() {
                path.setAttribute('stroke-dasharray', '100% 100%')
                path.strokeDasharray = '100% 100%';
            }, 500)
        },
        _append: function(svg) {
            this.el.appendChild(svg);
        },
        _setAttr: function(el, attrs) {
            for(var key in attrs) {
                el.setAttribute(key, attrs[key]);
            }
        },
        _createSvgElement: function(tag) {
           return document.createElementNS("http://www.w3.org/2000/svg", tag);
        },
        _deg2xy: function(angle, r) {
            var pi = Math.PI;
            var deg = angle * pi / 180;
            var x = r * Math.cos(deg);
            var y = r * Math.sin(deg);
            if(angle === 90) {
                x = 0;
                y = r;
            }else if(angle === 180) {
                x = -r;
                y = 0
            }else if (angle === 270) {
                x = 0;
                y = -r;
            }else if (angle === 0) {
                x = r;
                y = 0;
            }
            return {
                x: x,
                y: y
            }
        } 
    }
    window.Pie = Pie;
})();