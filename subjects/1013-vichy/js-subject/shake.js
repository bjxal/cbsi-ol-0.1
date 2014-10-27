module.exports = shake = {
    speed:10,
    x:0,
    y:0,
    z:0,
    lastX:0,
    lastY:0,
    lastZ:0,
    liTime:0,
    curTime:0,
    init:function(callback){
        if(window.DeviceMotionEvent){//获取设备的移动速度
            window.addEventListener('devicemotion',function(){
                shake.liTime = new Date().getTime();
                if(shake.curTime > 10000 && (shake.liTime - shake.curTime) > 480){
                    shake.curTime = 0;
                    callback();
                }
                var acceleration =event.accelerationIncludingGravity;//DeviceMotionEvent特有的属性，获取移动时的xyz值。
                shake.x = acceleration.x;
                shake.y = acceleration.y;
                if(Math.abs(shake.x-shake.lastX) > shake.speed || Math.abs(shake.y-shake.lastY) > shake.speed) {
                    shake.curTime = new Date().getTime();
                    shake.liTime = shake.curTime;
                }
                shake.lastX = shake.x;
                shake.lastY = shake.y;
            },false);
        }else{
            return false;
        }
    }
}