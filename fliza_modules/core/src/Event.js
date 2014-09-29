
var event = Fui.Event = function(options){
    this.options = _.defaults(options,{
        /**
         * {
         *      orient:'h/v'
         * }
         * */
        iscroll:false
    });
    this.bindEvents();
};
event.prototype = {
    _event_start:false,
    _event_start_p:{x:0,y:0,ts:0},
    _event_cur_p:{x:0,y:0,ts:0},
    _event_cur_dis:{x:0,y:0},
    _event_del_p:{x:0,y:0,ts:0},
    _event_cur_speed:{x:0,y:0},
    gesture:null,//tap leftSwipe rightSwipe upSwipe downSwipe
    startGesture:null,//leftSwipe rightSwipe upSwipe downSwipe
    unbindEvents: function () {
        var h = this.options.hoster;
        h.$el.undelegate('.'+ h.cid);
        delete this;
    },
    getAngle: function (dx,dy) {
        var a = Math.atan(Math.abs(dy/ dx))*180/Math.PI;
        if(dx<0){
            a= 180 - a;
        }
        if(dy>0)a = -a;//屏幕上的Y轴与习惯上是反的
        return a;
    },
    getCurAngle:function(){
        var me = this
            ,p = me._event_del_p
            ,angle
        ;
        angle = Math.atan(-p.y/ p.x)*180/Math.PI;
        if(p.x < 0) angle += 90;
        return angle;
    },
    checkOrientGesture:function(orient){
        return ('x'==orient&&/^left|right/.test(this.startGesture))||('y'==orient&&/^up|down/.test(this.startGesture));
    },
    bindEvents: function () {
        var me = this,
            hoster = this.options.hoster
            ,cid = hoster.cid
            ,$el = hoster.$el
            ,$ele = $el.children().first()
            ,iscroll = $ele.length?me.options.iscroll:false,minX = 0,minY = 0
            ,isV = 'y' == iscroll,isVG = false
            ,isH = 'x' == iscroll,isHG = false
            ,sp,cp
            ,p2,p1
            ,dx,dy,dt
            ,isDown = false
            ,isDrag = false
            ;
        if(iscroll){
            $ele.css({
                webkitTransform:'translate(0,0) translateZ(0) scale(1)',
                webkitTransition:'-webkit-transform 0ms cubic-bezier(0.33,0.66,0.66,1)',
                webkitTransformOrigin:'0px 0px'
            });
        }
        function getTransform(){
            var trans = getComputedStyle($ele[0],null).webkitTransform;
            if(!/^matrix/.test(trans)) return 0;
            var reg = /matrix\(([\d\,\.\-\s]*)\)/g.exec(trans)[1];
            return reg.split(',');
        }
        function _start(e) {
//            e.stopPropagation();
//            e.preventDefault();
            var t = e.originalEvent.touches?e.originalEvent.touches[0]:e.originalEvent;
            me._event_start = true;
            sp = me._event_start_p = me._event_cur_p = p1 = p2 = {
                x: t.clientX,
                y: t.clientY,
                ts: Date.now()
            };
            me._event_cur_speed = {
                x:0,
                y:0
            };
            me._event_cur_dis = {
                x:0,
                y:0
            };
            isDown = true;
            if(iscroll){
                var matrix = getTransform();
                var dis = me._event_start_dis = {
                    x:matrix[4]<<0,
                    y:matrix[5]<<0
                };
                $ele.css({
                    webkitTransform:'translate('+dis.x+'px,'+dis.y+'px) translateZ(0) scale(1)',
                    webkitTransitionDuration:'0'
                });
            }

            me.gesture = null;
            me.startGesture = null;
            if(_.isFunction(hoster._onstart))
                hoster._onstart(e);
        }
        function _move(e) {
//            e.stopPropagation();
//            e.preventDefault();
            var t = e.originalEvent.touches?e.originalEvent.touches[0]:e.originalEvent
                ;
            if(isDown){
                isDrag = true;
            }
            cp = me._event_cur_p = {
                x: t.clientX,
                y: t.clientY,
                ts: Date.now()
            };
            p1 = p2;
            p2 = cp;
            var _dxy = me._event_cur_dis = {
                x : cp.x - sp.x
                ,y: cp.y - sp.y
            };

            if(me.startGesture == null){
                if(Math.abs(_dxy.x) > 10 || Math.abs(_dxy.y) > 10){
                    var a = me.getAngle(_dxy.x,_dxy.y)
                        ,_speed = me._event_cur_speed
                        ;

                    if(Math.abs(a)<=30||Math.abs(a)>=150){
                        if(_speed.x>0) me.startGesture = 'rightSwipe';
                        if(_speed.x<0) me.startGesture = 'leftSwipe';
                    }else{
                        if(_speed.y>0) me.startGesture = 'downSwipe';
                        if(_speed.y<0) me.startGesture = 'upSwipe';
                    }
                }
            }


            if(iscroll&&me.startGesture){
                var trans = {};
                isVG = isV&&(me.startGesture == 'upSwipe'||me.startGesture == 'downSwipe');
                isHG = isH&&(me.startGesture == 'leftSwipe'||me.startGesture == 'rightSwipe');
                if(isVG||isHG){
                    if(isV){
                        var delY = me._event_start_dis.y+_dxy.y;
                        trans = 'translate(0,'+(delY)+'px) translateZ(0) scale(1)';
                    }else{
                        trans = 'translate('+(me._event_start_dis.x+_dxy.x)+'px,0) translateZ(0) scale(1)';
                    }

                    $ele.css({
                        webkitTransform:trans,
                        webkitTransition:'-webkit-transform 0ms cubic-bezier(0.33,0.66,0.66,1)'
                    });
                }
            }


            if(p2.ts - p1.ts > 5){
                dx = p2.x - p1.x;
                dy = p2.y - p1.y;
                dt = p2.ts - p1.ts;
                me._event_del_p = {
                    x:dx,
                    y:dy,
                    ts:dt
                };
                me._event_cur_speed = {
                    x: dx/dt,
                    y: dy/dt
                };
                if(_.isFunction(hoster._onmove))
                    hoster._onmove(e);
            }
        }
        function _end(e) {
//            e.stopPropagation();
//            e.preventDefault();
            var _dx = me._event_cur_dis.x
                ,_dy = me._event_cur_dis.y
                ,gesture = me.gesture
                ;
            var _Y = $el.height()
                ,minY = _Y - $ele.height(),
                _X = $el.width()
                ;
            if(Math.abs(_dx) > 10 || Math.abs(_dy) > 10){

                var a = me.getAngle(_dx,_dy)
                    ,_speed = me._event_cur_speed
                    ;

                if(Math.abs(a)<=30||Math.abs(a)>=150){
                    if(Math.abs(_speed.x)>0.5||Math.abs(_dx)>_X/2){
                        if(_speed.x>0) me.gesture = 'rightSwipe';
                        if(_speed.x<0) me.gesture = 'leftSwipe';
                    }
                }else{
                    if(Math.abs(_speed.y)>0.5||Math.abs(_dy)>_Y/2){
                        if(_speed.y>0) me.gesture = 'downSwipe';
                        if(_speed.y<0) me.gesture = 'upSwipe';
                    }
                }

            }else{
                me.gesture = 'tap';
                //tap
                if(isDown&&!isDrag){
                    if(e.target.tagName.toLowerCase() == 'input'){
                        e.target.focus();
                    }else{
                        if(_.isFunction(hoster._ontap))
                            hoster._ontap(e);
                    }
                }
            }
            hoster.onGesture(me.gesture,$(e.target),e);
            if(_.isFunction(hoster._onend))
                hoster._onend(e);

            isDown = false;
            isDrag = false;

            var speed = me._event_cur_speed[iscroll];
            //iscroll

            if(iscroll){
                if(Math.abs(speed)>0.1){
                    var trans = '',matrix = getTransform(),
                        y = (matrix[5]<<0)+(Math.round(speed)*150);
                    if(y>0) y/=2;
                    if(y<minY) y = (minY - y)/2+y;
                    if(isVG||isHG){
                        if('y' == iscroll){
                            trans = 'translate(0,'+(y)+'px) translateZ(0) scale(1)';
                        }
                        $ele.css({
                            webkitTransform:trans,
                            webkitTransition: '-webkit-transform 300ms cubic-bezier(0.33,0.66,0.66,1)'//'+((Math.abs(speed)*150)<<0)+'
                        }).one('webkitTransitionEnd',checkEnd);
                    }
                }else{
                    checkEnd();
                }
                function checkEnd(){
                    var _y = getTransform()[5];
                    if(_y >0) _y=0;
                    if(_y < minY) _y = minY;
                    $ele.css({
                        webkitTransform:'translate(0,'+_y+'px) translateZ(0) scale(1)',
                        webkitTransition: '-webkit-transform 150ms cubic-bezier(0.33,0.66,0.66,1)'
                    });
                }
            }

        }
        var mouseDown = false;
        $el
            .on('touchstart.'+cid, _start)
            .on('touchmove.'+cid, _move)
            .on('touchend.'+cid, _end)

            .on('mousedown.'+cid,function(e){
                mouseDown = true;
                _start(e);
            })
            .on('mousemove.'+cid,function(e){
                if(mouseDown){
                    _move(e);
                }
            })
            .on('mouseup.'+cid,function(e){
                if(mouseDown){
                    _end(e);
                    mouseDown = false;
                }
            })
            .on('mouseout.'+cid,function(e){
                if(mouseDown){
                    _end(e);
                    mouseDown = false;
                }
            })

        ;

    }
};


