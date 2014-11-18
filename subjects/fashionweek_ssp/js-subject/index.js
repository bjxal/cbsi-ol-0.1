$(document).ready(function(){
    var winHeight = $(window).height();
    if(window.localStorage && window.localStorage.getItem("showTips")==null){
        window.localStorage.setItem("showTips","true");
    }
    var showTips = window.localStorage.getItem("showTips");
    $("body").height(winHeight);
    setTimeout(function(){
        $(".p1_3").css("opacity",1);
        if(showTips=="true"){
            $(".cover").fadeIn();
            window.localStorage.setItem("showTips","false");
        }
    },1000);
    ok_url = "http://www.onlylady.com/files/eventapi.php?c=Event&a=Fw&indexsId=553";
    //dy
    $(".cover").on("touchend",function(){
        $(this).fadeOut();
    });
    //camera
    var camera = new Camera();
    camera.init({id:"canvas",input:"touchInput"});
    addImg = function(bigUrl){
        var img = new Image();
        img.onload = function(){
            var w = $("#result")[0].width;
            var h = $("#result")[0].height;
            var curH = (320/w)*h;
            camera.context.drawImage(img,0,0,320,curH);
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
                    },2000);
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
                $("#mb_id").val(index);//ģ��id
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
        camera.context.clearRect(-640,-420,1000,1000);
    });
    //ok
    $(".ok").on("touchend",function(){
        if(camera.loading==false){
            $(".p2 .step_1").css("display","none");
            $(".p2 .step_2").fadeIn();
            $(".page .page_3").addClass("cur").siblings().removeClass("cur");
            var imgSrc = camera.canvas.toDataURL("image/jpg");
            var b64 = imgSrc.substring( 22 );
            var mbId = $("#mb_id").val();
            var data = {"action":"upload","imgfile":b64,"data":mbId};
            ajax_fun(data);
        }
    });
    //commit
    $(".commit").on("touchend",function(){
        var nickName = $(".info #nickname").val();
        var name = $(".info #name").val();
        var mobile = $(".info #mobile").val();
        var myreg = /^(((1[3-8]{1}[0-9]{1})|159|153)+\d{8})$/;
        var imgUrl = $("#photoUrl").val();
        if(nickName!=""&&name!=""&&mobile!="" && myreg.test(mobile)){
            $(".p2 .step_3_1 .tips").fadeOut();
            $(".p2 .step_3_1").css("display","none");
            $(".p2 .step_3_2").fadeIn();
            var data = {
                "action":"addevent",
                "data[2251]":nickName,
                "data[2250]":name,
                "data[2249]":mobile,
                "data[2248]":imgUrl
            };
            ajax_fun_jsonp(data);
        }
        else{
            $(".p2 .step_3_1 .tips").fadeIn();
        }
    });
});
//upload photo
function uploadCallBackFun(){
    $(".p1").fadeOut();
    $(".p2").fadeIn();
    $(".page .page_2").addClass("cur").siblings().removeClass("cur").parent().parent().addClass("top");
    $(".view").fadeOut();
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
        bounce:false,
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
        dataType:"json",
        async:false,
        cache:false,
        success:function(data){
            var dt = data;
            $("#photoUrl").val(dt.img);
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
                //ajax_fun_list("add");
//                setTimeout(function(){
//                    $("body").addClass("list");
//                    $(".p2").css("display","none");
//                    $(".p3").fadeIn().find("#page").val(1);
//                },2000);
                setTimeout(function(){
                    window.location.href="http://www.onlylady.com/files/eventapi.php?c=Event&a=Fw&indexsId=553&action=list";
                },2000);
            }
        },
        error:function(err){}
    });
}