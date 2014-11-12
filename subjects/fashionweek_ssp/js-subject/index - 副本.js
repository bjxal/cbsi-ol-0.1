$(document).ready(function(){
    setTimeout(function(){
        $(".p1_3").css("opacity",1);
    },1000);
    ok_url = "http://www.onlylady.com/files/eventapi.php?c=Event&a=Fw";
    //camera
    var camera = new Camera();
    camera.init({id:"canvas",input:"touchInput"});
    addImg = function(bigUrl){
        var img = new Image();
        img.onload = function(){
            var w = $("#result")[0].width;
            var h = $("#result")[0].height;
            var curH = (200/w)*h;
            camera.context.drawImage(img,40,0,200,curH);
        }
        img.src = bigUrl;
        camera.imgUrl = bigUrl;
        //stage.addChild(bmp);
    }
    //change
    var touchInput = $("#touchInput");
    touchInput.on("change",function(e){
        var files = e.target.files,
            file;
        if(files && files.length>0){
            file = files[0];
            fileR = new FileReader();
            fileR.onloadend = function(e){
                var binary = new BinaryFile(this.result);
                var exif = EXIF.readFromBinaryFile(binary);
                var rot = exif.Orientation;
                try{
                    var URL = window.URL || window.webkitURL;
                    var imgUrl = URL.createObjectURL(file);
                    createImg(imgUrl,rot,file);
                    URL.revokeObjectURL(imgUrl);
                    setTimeout(function(){
                        $(".p2 .loading").fadeOut();
                    },1000);
                }
                catch(e){}
            }
            uploadCallBackFun();
            fileR.readAsBinaryString(file);
        }
    });
    var createImg = function(imgUrl,rot,file){
        var mpi = new MegaPixImage(file);
        var img = new Image();
        img.onload = function(){
            var w = img.width, h = img.height;
            if(w > h){
                y = 583;
                x = parseInt(583/2448*3264);
                setTimeout(function(){
                    mpi.render($("#result")[0], { width: x, height: y, orientation: rot });
                },200);
            }else{
                x = 583;
                y = parseInt(583/2448*3264);
                setTimeout(function(){
                    mpi.render($("#result")[0], { width: x, height: y, orientation: rot  });
                },200);
            }
        };
        img.src = imgUrl;
    };

    //list touch
    var default_xy = {x:0,y:0},
        move_xy = {x:0,y:0};
    $("#iscroll_ul li")
        .on("touchstart",function(e){
            var tar = e.originalEvent.touches || e.targetTouches.touches;
            default_xy = move_xy = {
                x:tar[0].pageX,
                y:tar[0].pageY
            }
        })
        .on("touchmove",function(e){
            var tar = e.originalEvent.touches || e.targetTouches.touches;
            move_xy = {
                x:tar[0].pageX,
                y:tar[0].pageY
            }
        })
        .on("touchend",function(e){
            if(Math.abs(default_xy.x-move_xy.x)<50){
                $(this).addClass("cur").siblings().removeClass("cur");
                var imgSrc = $(".mbList").find("img").attr("src");
                var index = $(this).index()+1;
                var strIndex = imgSrc.indexOf("/mb/");
                var newImg  =imgSrc.substring(0,strIndex)+"/mb/"+index+".png";
                $(".mbList").find("img").attr({"src":newImg,"data-index":index});
            }
    });
    //lottery_btn
    $(".lottery_btn").on("touchend",function(){
        $(".p2 .step_2").css("display","none");
        $(".p2 .step_3").fadeIn();
        $(".page .page_4").addClass("cur").siblings().removeClass("cur");
    });
    //button reset ok commit
    //reset
    $(".reset").on("touchend",function(){
        $(".p2").fadeOut();
        $(".p1").fadeIn();
    });
    //ok
    $(".ok").on("touchend",function(){
        if(camera.loading==false){
            $(".p2 .step_1").css("display","none");
            $(".p2 .step_2").fadeIn();
            $(".page .page_3").addClass("cur").siblings().removeClass("cur");
            var imgSrc = camera.canvas.toDataURL("image/png");
            var b64 = imgSrc.substring( 22 );
            var data = {"data":b64,"imgfile":Math.uuid(16)+'_'+(Math.random()*1000<<0)};
            ajax_fun(data);
        }
    });
    //commit
    $(".commit").on("touchend",function(){
        var nickName = $(".info #nickname").val();
        var name = $(".info #name").val();
        var mobile = $(".info #mobile").val();
        var myreg = /^(((13[0-9]{1})|159|153)+\d{8})$/;
        var imgUrl = $("#photoUrl").val();
        if(nickName!=""&&name!=""&&mobile!="" && myreg.test(mobile)){
            $(".p2 .step_3_1").css("display","none");
            $(".p2 .step_3_2").fadeIn();
            var data = {
                "action":"addevent",
                "data[2136]":nickName,
                "data[2137]":name,
                "data[2138]":mobile,
                "data[2139]":imgUrl
            };
            ajax_fun_jsonp(data);
        }
    });
    //list
    $(".logo").on("touchend",function(){
        var cname = $(".px").attr("class");
        if(cname.indexOf("height_88")!=-1){
            $(".px").removeClass("height_88");
        }
        else{
            $(".px").addClass("height_88");
        }
    });
    //px
    $(".px span").on("click",function(){
        var val = $(this).attr("data_px");
        var curr_val = $("#px_val").val();
        if(val != curr_val){
            $("#px_val").val(val);
            $("#page").val(1);
            ajax_fun_list("clear");
        }
        $(this).parent().removeClass("height_88");
    });
    $(".share_list").on("touchend",function(){
        $(".px").removeClass("height_88");
    });
    /*load data*/
    $(window).scroll(function(e){
        var winHeight = $(window).height();
        var scrollNum = $(window).scrollTop();
        var bdHeight = $(document.body).height();
        if((winHeight + scrollNum) >= bdHeight-100){
            $(".loading").fadeIn();
            ajax_fun_list("add");
        }
    });
});
//upload photo
function uploadCallBackFun(){
    $(".p1").fadeOut();
    $(".p2").fadeIn();
    $(".page .page_2").addClass("cur").siblings().removeClass("cur").parent().addClass("top");
    setTimeout(function(){
        iscroll();
    },1000);
}
//iscroll
function iscroll(){
    var length = $("#iscroll_ul").children().length;
    $("#scroller,#iscroll_ul").width(length*66);
    var isc = new iScroll('wrapper',{
        snap: "li",
        momentum: false,
        scrollbarClass:'scrollBar',
        hScrollbar: true,
        hideScrollbar: false,
        onScrollEnd: function () {}
    });
}
//commit photo
function ajax_fun(data){
    $.ajax({
        type:"POST",
        url:ok_url,
        data:data,
        async:false,
        cache:false,
        success:function(data){
            $("#photoUrl").val(data);
        },
        error:function(err){}
    });
}
//commit lottery
function ajax_fun_jsonp(data){
    $.ajax({
        type:"POST",
        url:ok_url,
        data:data,
        async:false,
        cache:false,
        dataType:"jsonp",
        jsonp:"callbackfun",
        jsonpCallback:"jsonpCallback",
        success:function(data){
            if(data=="ok"){
                ajax_fun_list("add");
                setTimeout(function(){
                    $("body").addClass("list");
                    $(".p2").css("display","none");
                    $(".p3").fadeIn();
                },2000);
            }
        },
        error:function(err){}
    });
}
//zan
function ajax_fun_zan($obj,id){
    var zan_val = parseInt($obj.text());
    $.ajax({
        type:"POST",
        url:ok_url,
        data:{
            "action":"vote",
            "eventid":id
        },
        async:false,
        cache:false,
        dataType:"jsonp",
        jsonp:"callbackfun",
        jsonpCallback:"jsonpCallback",
        success:function(data){
            if(data=="ok"){
                $obj.text(zan_val+1);
            }
        },
        error:function(err){}
    });
}
//list data
function ajax_fun_list(type){
    var page = parseInt($("#page").val());
    var px_val = $("#px_val").val();
    $.ajax({
        type:"POST",
        url:ok_url,
        data:{
            "action":px_val,
            "page":page
        },
        async:false,
        cache:false,
        dataType:"jsonp",
        jsonp:"callbackfun",
        jsonpCallback:"jsonpCallback",
        success:function(data){
            if(data.length>0){
                each(data,type);
                $("#page").val(page+1);
            }
            else{
                $(".loading p").html("没有更多数据了~");
            }
            setTimeout(function(){$(".loading").fadeOut();},1000);
        },
        error:function(err){}
    });
}
//each
function each(data,type){
    if(type=="clear"){
        $("#shareList").html("");
    }
    $.each(data,function(i,item){
        var rt = setUl(item);
        $("#shareList").append(rt);
    });
}
//set ul
function setUl(item){
    var li = document.createElement("li");
    var list_top = document.createElement("div");
    list_top.className="list_top";
    var name = document.createElement("span");
    name.className="name";
    name.innerText=item.msn;
    var time = document.createElement("span");
    time.className="time";
    time.innerText=item.createTime;
    var zan = document.createElement("span");
    zan.className="zan";
    zan.setAttribute("zan_id",item.id);
    zan.innerText=item.cntA;
    bindZan(zan);
    var share = document.createElement("a");
    share.className="share";
    share.innerHTML="\u5206\u4EAB";
    share.href="http://www.onlylady.com/files/eventapi.php?c=Event&a=Fw&action=details&eventid="+item.id;
    list_top.appendChild(name);
    list_top.appendChild(time);
    list_top.appendChild(zan);
    list_top.appendChild(share);
    var img = document.createElement("img");
    img.src=item.photo;
    li.appendChild(list_top);
    li.appendChild(img);
    return li;
}
//bind zan events
function bindZan(zan){
    //zan
    $(zan).bind("click",function(){
        var id = $(this).attr("zan_id");
        ajax_fun_zan($(this),id);
    });
}