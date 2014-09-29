var URL = window.URL && window.URL.createObjectURL ? window.URL :
        window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL :
    null;
if (!URL) { throw Error("No createObjectURL function found to create blob url"); }

module.exports = Fui.ImgLoader = FClass.extend({
    config:{
        srcAttr:'data-src',
        totalSize:0//MB
    },
    onprogress:null,
    oncomplete:null,
    getSrc:null,
    initial:function(options){
        var me = this
            ,srcAttr = me.get('srcAttr')
            ,imgMap = {}
            ,getSrc = options.getSrc
            ,loadedNum = 0
            ,$srcAttr = $('['+srcAttr+']')
        ;
        me.oncomplete = options.oncomplete;
        if(!_.isFunction(getSrc)) getSrc = function(src){
            return src;
        };
        $srcAttr.each(function(i,a){
            var $this = $(this)
                ,src = getSrc($this.attr(srcAttr))
            ;
            var img  = new Image();
            img.onload = function(){
                loadedNum++;
                var ele = this.$.get(0);
                if(ele){
                    if(ele.nodeName.toLowerCase() == 'img'){
                        this.$.attr('src',this.src);
                    }else{
                        //bg will be loaded twice
                        this.$.css('backgroundImage','url('+this.src+')');
                    }
                }
                if(loadedNum == $srcAttr.length&& _.isFunction(me.oncomplete)){
                    me.oncomplete();
                }
            };
            img.src = src;
            img.$ = $this;

        });
    }
});
