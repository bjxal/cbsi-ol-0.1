module.exports = touchList = {
    init:function(){
        var me = this;
        me.share_fun();
    },
    share_fun:function(){
        touchList.touch_fun("btn",function(){
            $(".shadow").fadeIn();
        })
    },
    touch_fun:function(pname,cbfun){
        var default_mv = move_mv = {x:0};
        $("."+pname)
            .bind("touchstart",function(e){
                var me = this;
                me.pop = false;
                var tar = e.originalEvent.touches[0];
                default_mv = move_mv = {
                    x:tar.clientX,
                    y:tar.clientY
                };
            })
            .bind("touchmove",function(e){
                var me = this;
                var tar = e.originalEvent.touches[0];
                move_mv = {
                    x:tar.clientX,
                    y:tar.clientY
                };
            })
            .bind("touchend",function(e){
                var me = this;
                var move_c = move_mv.x-default_mv.x;
                if(move_c<10){
                    e.preventDefault();
                    e.stopPropagation();
                    cbfun(e);
                }
                else{
                    me.pop = false;
                }
            });
        $(".shadow").on("touchend",function(){
            $(this).fadeOut();
        });
    },
    ajax_fun:function(url,data,cbfun){
        //ajax
        $.ajax({
            type:"POST",
            cache:false,
            asnyc:false,
            data:data,
            url:url,
            dataType:"json",
            success:function(){
                cbfun();
            },
            error:function(){
                cbfun();
            }
        });
    },
    youku:function(){
        console.log(YKU)
		if(typeof YKU == 'undefined') return;
	//                if(!me.player){
		var player = new YKU.Player('video',{
			styleid: '0',
			client_id: "3e9659d488a5a018",
			vid: "XODAzOTUxMjEy",
			autoplay: true,
			show_related: false,
			events:{
				onPlayerReady: function(){ /*your code*/ },
				onPlayStart: function(){ /*your code*/ },
				onPlayEnd: function(){
					player = null;
				}
			}
		});
	//                }
		setTimeout(function(){
			try{
				player.playVideo();
			}catch(e){}
		},10);
	}
};