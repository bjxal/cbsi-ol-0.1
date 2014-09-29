/**
 * Created by ericai on 14-8-9.
 * Email: 330785652@qq.com
 */

Fui.Form.Password = Fui.Form.Text.extend({
    ftype:'Fui.Form.Password',
    config:{
        type:'password',
        placeHolder:'密码',
        icon:'key'
    }
    ,validate:function(cb){
        var v = this.get('value'),msg = '';
        if(!v|| v.length <6){
            msg = '密码至少6位';
            cb(false);
        }else{
            cb(true);
        }
        this.setErrorMsg(msg);
    }
});