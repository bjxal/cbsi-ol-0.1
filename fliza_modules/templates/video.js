Fui.Template.Video = Fui.Template.extend({
    className:'module module-video',
    config:{
        tpl: require('!tpl:./tpl/video'),
        // video cover layer css style
        videoPackCss:null,
        playBtnCss:null,
        closeBtnCss:null,

        platform:null,
        //youku
        clientId:'3e9659d488a5a018',
        vid:null,

        width:640,
        whRatio:16/9
    },
    listeners:{
        play:function(){
            var me = this,
                platform = me.get('platform');
            this.$videoPack.addClass('show');
            switch(platform){
                case 'youku':
                    youku();
            }
            function youku(){
                if(typeof YKU == 'undefined') return;
//                if(!me.player){
                    me.player = new YKU.Player('page-'+me.get('pageIndex')+'-video-player',{
                        styleid: '0',
                        client_id: me.get('clientId'),
                        vid: me.get('vid'),
                        autoplay: true,
                        show_related: false,
                        events:{
                            onPlayerReady: function(){ /*your code*/ },
                            onPlayStart: function(){ /*your code*/ },
                            onPlayEnd: function(){
                                me.player = null;
                                me.trigger('close');
                            }
                        }
                    });
//                }
                setTimeout(function(){
                    try{
                        me.player.playVideo();
                    }catch(e){}
                },10);
            }
        },
        close:function(){
            var me = this,
                platform = me.get('platform')
                ;
            this.$videoPack.removeClass('show');
            try{
                switch (platform){
                    case 'youku':
                        me.player.pauseVideo();
                        break;
                }
            }catch(e){}
        }
    },
    render:function(){
        var me = this
            ,$pack = me.$videoPack = me.$el.children('.video-pack')
            ,$i = $pack.children('.i')
        ;
        $pack.css(me.get('videoPackCss')||{});
        me.$el.find('.video-pack>.close').css(me.get('closeBtnCss')||{});
        me.$el.find('.play-icon').css(me.get('playBtnCss')||{});
        $i.css({
            width:me.get('width')
            ,height:me.get('width')/me.get('whRatio')
        });
    },
//    className:function(){
//        return this.super.className + ' module-video';
//    },

    getGestureItems:function(){
        var me = this;

        return [
            {
                gesture:'tap',
                name:'page-'+me.get('pageIndex')+'-video-play',
                callback: function(){
                    me.trigger('play');
                },
                caller:me
            }
            ,{
                gesture:'tap',
                name:'page-'+me.get('pageIndex')+'-video-close',
                callback: function(){
                    me.trigger('close');
                },
                caller:me
            }
        ];
    },
    save:function(cb){
        var me = this
            ,form = me.getForm()
            ,data = me.getData()
            ;
        new Fui.FileUpload({
            file:data.bg,
            name:'bg',
            listeners:{
                end:function(res,name){
                    console.log(arguments);
                    form.setData(name,res);
                    cb(true);
                },
                error:function(){
                    cb(false);
                }
            }
        });
    },
    getFormItems: function () {
        var me = this,
            $el = this.$el;
        return [
            {
                type:'ImagePicker',
                label:'背景：',
                name:'bg',
                listeners:{
                    change:function(src){
                        $el.css({
                            backgroundImage:'url('+src+')'
                        });
                    },
                    clear:function(){
                        me.clearBg();
                    }
                }
            },
            {
                type:'Select',
                label:'播放按钮样式：',
                data:[
                    {
                        text:'样式一',
                        value:0,
                        checked:true
                    }
                    ,{
                        text:'样式二',
                        value:1
                    }
                    ,{
                        text:'样式三',
                        value:2
                    }
                ],
                name:'playIconStyle',
                listeners:{
                    change:function(n,o){

                    }
                }
            }
            ,{
                type:'Select',
                label:'播放平台',
                name:'platform',
                data:[
                    {
                        text:'优酷',
                        value:'youku',
                        checked:true
                    }
                    ,{
                        text:'腾讯',
                        value:'qq'
                    }
                ],
                listeners:{
                    change:function(n){
                        me.set('platform',n);
                    }
                }
            }
            ,{
                type:'Text',
                label:'视频ID',
                name:'vid',
                placeHolder:'优酷视频的ID(vid)'
                ,listeners:{
                    change:function(n){
                        me.set('vid',n)
                    }
                }
            }

        ];
    }
});
/*
var letvcloud_player_conf =  { "uu":"cfdce463f4","vu":"b81b1db1fb","auto_play":1,"width":"100%","height":"100%" };
// ]]></script>
<script type="text/javascript" src="http://yuntv.letv.com/bcloud.js"></script>


player = new YKU.Player('youkuplayer',{
    styleid: '0',
    client_id: 'YOUR YOUKUOPENAPI CLIENT_ID',
    vid: '替换成优酷视频ID',
    autoplay: false,
    show_related: false
});

define(function(require, exports, module) {
    var $ = require("lib/zepto/zepto"), $ = require("lib/zepto/touch"), $ = require("lib/zepto/selector"), $ = require("lib/zepto/data"), youkuApi = require("lib/youku/jsapi");
    !function() {
        var playerIndex = 0,
            YoukuVideo = function($item, options) {
            var theClass = this;
            this.$target = $item.addClass("m-youkuVideo"), this.settings = null, this.player = null, this._playerID = "videoBody_" + ++playerIndex;
            var devID = this.$target.data("devid"), videoUrl = this.$target.data("src");
            this.settings = $.extend({
                devID: devID ? devID: "168eed9e805f5239",
                url: videoUrl && videoUrl.indexOf("youku") >= 0 ? videoUrl: "http://v.youku.com/v_show/id_XNzAyNDcyMzAw.html",
                onPlayerReady: function() {
                    console.log("event：准备就绪")
                },
                onPlayStart: function() {
                    console.log("event：播放开始")
                },
                onPlayEnd: function() {
                    console.log("event：播放结束")
                }
            }, options), this.$target.attr("id", this._playerID), this.player = new youkuApi.YKU.Player(this._playerID, {
                styleid: "0",
                client_id: theClass.settings.devID,
                vid: theClass._getVidByUrl(theClass.settings.url),
                show_related: !1,
                autoplay: !0,
                events: {
                    onPlayerReady: theClass.settings.onPlayerReady,
                    onPlayStart: function(e) {
                        theClass._isPlayStart=!0, theClass.settings.onPlayStart(e)
                    },
                    onPlayEnd: theClass.settings.onPlayEnd
                }
            }), this._isPlayStart=!1, this.$target.on($.isPC ? "click" : "tap", function() {
                theClass._isPlayStart || setTimeout(function() {
                    theClass.play()
                }, 200)
            })
        };
        YoukuVideo.prototype._getVidByUrl = function(url) {
            var vid = url ? vid = url.substring(url.indexOf("/id_") + 4, url.indexOf(".html")): "";
            return vid || console.log("error：视频地址不正确！"), vid
        }, YoukuVideo.prototype.play = function() {
            try {
                this.player.playVideo()
            } catch (e) {
                console.log(e)
            }
        }, YoukuVideo.prototype.pause = function() {
            try {
                this.player.pauseVideo()
            } catch (e) {
                console.log(e)
            }
        }, YoukuVideo.prototype.destroy = function() {
            this.$target.html("").data("plugin_video", null), delete this.player
        }, $.fn.youkuVideo = function(options) {
            var command = "init";
            switch (arguments.length > 0 && "string" == typeof arguments[0] && (command = arguments[0]), command) {
                case"init":
                    this.each(function(i, item) {
                        var $item = $(item), pluginObj = new YoukuVideo($item, options);
                        $item.data("plugin_video", pluginObj)
                    });
                    break;
                case"getPluginObject":
                    return this.data("plugin_video")
            }
            return this
        }
    }(), module.exports = $
});
*/
