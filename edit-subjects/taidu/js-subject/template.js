/**
 * Created by ericai on 14/11/7.
 * Email: 330785652@qq.com
 */

var COVER = Fui.Template.Base.extend({
    config:{
        template:'COVER',
        templateName:'首页',
        cls:'cover',
        tpl:'<div class="show-txt" data-tap="p0showtxt"></div><p class="txt" data-tap="p0txt">{{txt}}</p>',
        txt:''
    },
    getTplData:function(){
        return {
            txt:this.get('txt')
        };
    },
    getGestureItems:function(){
        return [{
            gesture:'tap',
            name:'p0showtxt',
            callback:function(){
                this.$el.children('.txt').toggleClass('show');

            }
        },{
            gesture:'tap',
            name:'p0txt',
            callback:function(){
                this.$el.children('.txt').removeClass('show');
            }
        }];
    }
});
var PERSON = Fui.Template.Base.extend({
    config:{
        template:'PERSON',
        templateName:'人物',
        tpl:'<img class="ani slide-in-left" data-src="{{txt}}"/>'
        ,txt:null
    },
    getTplData:function(){
        return {
            txt:this.get('txt')
        }
    }
});
var QA = Fui.Template.Base.extend({
    config:{
        template:'QA',
        templateName:'问答页',
        cls:'qa',
        tpl:require('!tpl:./tpl/qa')
        ,qaTitle:null
        ,qaName:null
        ,qaIcon:null
        ,qaList:null
    },
    design:function(){
        var me = this
            ,$qaList = me.$el.children('.inner')
        ;
        console.log('>>>>',$qaList);
    },
    getTplData:function(){
        return {
            qaTitle:this.get('qaTitle')
            ,qaName:this.get('qaName')
            ,qaList:this.get('qaList')
            ,qaIcon:this.get('qaIcon')
        };
    }
});
var EDITOR_TALK = Fui.Template.Base.extend({
    config:{
        template:'EDITOR_TALK',
        templateName:'小编手札'
        ,cls:'editor-talk'
        ,tpl:require('!tpl:./tpl/editor_talk')
        ,content:null
    }
    ,getTplData:function(){
        return {
            content:this.get('content')
        };
    }
});

Fui.Template.regTemplate('onlylady',{
    taidu:{
        COVER:COVER
        ,PERSON:PERSON
        ,QA:QA
        ,EDITOR_TALK:EDITOR_TALK
    }
});