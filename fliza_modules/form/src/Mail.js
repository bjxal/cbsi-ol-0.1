/**
 * Created by ericai on 14-8-9.
 * Email: 330785652@qq.com
 */

Fui.Form.Mail = Fui.Form.Text.extend({
    config:{
        icon:'mail2',
        placeHolder:'邮箱'
    },
    validateUsed:function(cb){
        cb(true);
    },
    validate:function(cb){
        if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g.test(this.get('value'))){
            this.validateUsed(cb);
        }else{
            this.setErrorMsg('邮箱格式不正确');
            cb(false);
        }
    }
});