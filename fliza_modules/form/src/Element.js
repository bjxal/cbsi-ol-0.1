/**
 *
 * Created by ericai on 14-8-9.
 * Email: 330785652@qq.com
 */

Fui.Form.Element = Fui.extend({
    className:'fui-form-ele',
    config:{
        name:null,
        value:null,
        label:null,
        grid:0
    },
    initialize:function(){
    },
    getData:function(){
        return null;
    },
    validate:function(cb){
        cb(true);
    }
});