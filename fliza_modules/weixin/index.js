
Fui.Weixin = FClass.extend({
    config:{
        title:null,
        desc:null,
        link: String(window.location.href),
        appid:"",
        img_url:null,
        img_width:200,
        img_height:200
    },
    initial:function(){
        var me = this;
        // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            // 发送给好友
            WeixinJSBridge.on('menu:share:appmessage', function(argv){
                WeixinJSBridge.invoke('sendAppMessage',{
                    "appid":"",
                    "img_url": me.get('img_url'),
                    "img_width": me.get('img_width'),
                    "img_height": me.get('img_height'),
                    "link": me.get('link'),
                    "desc": me.get('desc'),
                    "title": me.get('title')
                }, function(res) {
                    //_report('send_msg', res.err_msg);
                });
            });
            // 分享到朋友圈
            WeixinJSBridge.on('menu:share:timeline', function(argv){
                WeixinJSBridge.invoke('shareTimeline',{
                    "img_url": me.get('img_url'),
                    "img_width": me.get('img_width'),
                    "img_height": me.get('img_height'),
                    "link": me.get('link'),
                    "desc": me.get('desc'),
                    "title": me.get('title')
                }, function(res) {
                    switch(res.err_msg){
                        case 'share:timeline:ok':
                            me.trigger('timeline',[true]);
                            break;
                        case 'share:timeline:cancel':
                            me.trigger('timeline',[false]);
                            break;
                    }
                });
            });
        }, false);
    }
});
