
Fui.Form.Submit = Fui.Button.extend({
    className:function(){
        return this.callParent('className').concat('fui-form-button ');//fui-form-submit
    },
    noValidate:true,
    config:{
        type:'primary'
//        size:'lg'
    }
});