
Fui.Form.Cancel = Fui.Button.extend({
    className:function(){
        return this.callParent('className').concat('fui-form-button');// fui-form-cancel
    },
    noValidate:true,
    config:{
//        size:'lg'
    }
});