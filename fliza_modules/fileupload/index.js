//require('./src/jquery.fileupload');
//require('./src/jquery.iframe-transport');
//http://blog.csdn.net/tuhuolong/article/details/7634868

Fui.FileUpload = FClass.extend({
    config:{
        file:null,
        name:null
    },
    listeners:{
        start:null,
        progress:null,
        end:null,
        error:null
    },
    initial:function(){
        var me = this
            ,files = me.get('file')
            ,name = me.get('name')
            ,paths = []
            ;
        if(!files) return me.trigger('end',[null,name]);
        if(!_.isArray(files)) files = [files];
//        console.log('upload',me.get('name'));
        upload(function(){
//            console.log(paths);
            if(paths.length == 1) paths = paths[0];
            me.trigger('end',[paths,name]);
        });

        function upload(cb){
            if(files.length == 0){
                return cb();
            }
            var file = files.shift();
//            console.log('file',file);
            if(file&&file instanceof File){
                var formData = new FormData();
                formData.append('upfile',file);
                var xhr = new XMLHttpRequest();
                xhr.open('POST','http://www.36ap.com/do_media_upload',true);
                xhr.onload = function(){
                    if(xhr.status === 200){
                        var resp = JSON.parse(xhr.responseText||'');
                        success(resp.path);
                    }else{
                        me.trigger('error');
                    }
                };
                xhr.send(formData);
            }else{
                success(file);
            }
            function success(path){
                paths.push(path);
                upload(cb);
            }
        }

    }
});