var c=document.querySelector(".c");
var w,h,
    ctx=c.getContext('2d'),
    x0,y0,x,y,
    t=0,t_step=1/20,
    tmp,
    exp = Math.exp, pow = Math.pow, sqrt = Math.sqrt, 
    PI = Math.PI, sin = Math.sin, cos = Math.cos;
var rand = function(max, min) {
    var b = (max === 0 || max) ? max : 1, a = min || 0; 
    return a + (b - a)*Math.random();
};
var trimUnit = function(input_str, unit) {
  return parseInt(input_str.split(unit)[0], 10);
};
var initCanvas = function() {
  var s = getComputedStyle(c);
  
  w = c.width = trimUnit(s.width, 'px');
  h = c.height = trimUnit(s.height, 'px');
};
var wave = function() {
    x0 = -1, y0 = h/4; 
    ctx.clearRect(0, 0, w, h);
    tmp = pow(t, 1.75)/19;
    for(x = 0; x < w; x = x + 3) {
        y=9*sqrt(x)*sin(x/23/PI + t/3 + sin(x/29 + t)) +
                32*sin(t)*cos(x/19 + t/7) + 
                16*cos(t)*sin(sqrt(x)) + h/3;   
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x, y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFCC';
        ctx.stroke();

        x0 = x;
        y0 = y;
    }
    t += t_step;
    if(t<20){
        requestAnimationFrame(wave);//重绘动画画面
    }
    if(t>=20){
        ctx.clearRect(0, 0, w, h);
        var div=document.getElementById('div');
        div.style.display="block";
    }
};
/* START THE MADNESS */
setTimeout(function() {
    initCanvas();
    wave(); 
    /* fix looks on resize */
    addEventListener('resize', initCanvas, false);
}, 15);