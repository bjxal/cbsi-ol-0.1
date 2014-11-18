$(document).ready(function(){
    ok_url = "http://www.onlylady.com/files/eventapi.php?c=Event&a=Fw";
    $(".logo_1").on("touchend",function(){
        var cname = $(".px").attr("class");
        if(cname.indexOf("height_88")!=-1){
            $(".px").removeClass("height_88");
        }
        else{
            $(".px").addClass("height_88");
        }
    });
    $(".px span").on("touchend",function(e){
        e.stopPropagation();
        e.preventDefault();
        var val = $(this).attr("data-px");
        var val_word = $(this).attr("data-word");
        var curr_val = $("#px_val").val();
        if(val != curr_val){
            $(".logo").find("span").eq(0).text(val_word);
            $("#px_val").val(val);
            $("#page").val(1);
            ajax_fun_list("clear");
        }
        $(".px").removeClass("height_88");
        $("html,body").animate({
            scrollTop:0
        },300);
    });
    $(".share_list").on("touchend",function(){
        $(".px").removeClass("height_88");
    });
    /*load data*/
    more = "true";
    $(window).scroll(function(e){
        var winHeight = $(window).height();
        var scrollNum = $(window).scrollTop();
        var bdHeight = $(document.body).height();
        if((winHeight + scrollNum) >= bdHeight-100){
            if(more=="true"){
                $(".loading").fadeIn();
                ajax_fun_list("add");
                more="false";
            }
        }
    });
    ajax_fun_list("add");
});
//list data
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
                $(".loading p").html("\u6ca1\u6709\u66f4\u591a\u6570\u636e\u4e86~");
            }
            setTimeout(function(){$(".loading").fadeOut();more="true";},1000);
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
    $(zan).bind("touchend",function(){
        var id = $(this).attr("zan_id");
        ajax_fun_zan($(this),id);
    });
}