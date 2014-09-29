
var delegateEventSplitter = /^(\S+)\s*(.*)$/;

var viewOptions = ['config','ftype','model', 'collection', 'el', 'id', 'attributes','css', 'className', 'tagName', 'events'];

window.Fui =  module.exports = FClass.extend({
    el:null,
    $el:null,
    tagName:'div',
    config:null,
    model:null,
    collection:null,
    attributes:null,
    css:null,
    className:null,

    events:{},
    initialize:function(){},
    initial:function(options){
        this.cid = _.uniqueId('fui');
        //events
        _.extend(this.events,options.events||{});
        _.extend(this, _.omit(options,['events']));
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents();
    },
    render:function(){},
    /*
    * 调用父类的名称为 name 的方法，默认为 render 方法
    * */
    callParent:function(name){
        if(!_.isString(name)) name = 'render';
        var fn = this.super[name];
        if(_.isFunction(fn)) fn = fn.call(this);
        return fn;
    },
    show:function(){
        this.$el.show();
    },
    hide:function(){
        this.$el.hide();
    },
    refresh:null,
    remove: function() {
        this.$el.remove();
        this.stopListening();
        this.onRemove();
        return this;
    },
    onRemove:function(){},
//    trigger:function(name,params){
//        var fn = this.events[name];
//        if(_.isFunction(fn)){
//            fn.apply(this,params);
//        }
//    },
    undelegateEvents: function() {
        this.$el.off('.delegateEvents' + this.cid);
        return this;
    },
    delegateEvents: function(events) {
        if (!(events || (events = _.result(this, 'events')))) return this;
        this.undelegateEvents();
        for (var key in events) {
            var method = events[key];
            if (!_.isFunction(method)) method = this[events[key]];
            if (!method) continue;

            var match = key.match(delegateEventSplitter);
            var eventName = match[1], selector = match[2];
            method = _.bind(method, this);
            eventName += '.delegateEvents' + this.cid;
            if (selector === '') {
                this.$el.on(eventName, method);
            } else {
                this.$el.on(eventName, selector, method);
            }
        }
        return this;
    },
    setElement: function(element, delegate) {
        if (this.$el) this.undelegateEvents();
        this.$el = element instanceof $ ? element : $(element);
        this.el = this.$el[0];

        var attrs = _.extend({}, _.result(this, 'attributes'));
        var css = _.extend({}, _.result(this, 'css'));
        if (this.id) attrs.id = _.result(this, 'id');
        var cls = _.result(this, 'className');
        if(_.isFunction(cls)) cls = cls.apply(this);
        if(_.isArray(cls)) cls = cls.join(' ');
        this.$el.attr(attrs).css(css).addClass(cls);

        if (delegate !== false) this.delegateEvents();
        return this;
    },
    _ensureElement: function() {
        if (!this.el) {
            var $el = $('<' + _.result(this, 'tagName') + '>');
            this.setElement($el, false);
        } else {
            this.setElement(_.result(this, 'el'), false);
        }
    },
    stopListening: function(obj, name, callback) {
        var listeningTo = this._listeningTo;
        if (!listeningTo) return this;
        var remove = !name && !callback;
        if (!callback && typeof name === 'object') callback = this;
        if (obj) (listeningTo = {})[obj._listenId] = obj;
        for (var id in listeningTo) {
            obj = listeningTo[id];
            obj.off(name, callback, this);
            if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
        }
        return this;
    }
},{
    emptyFunc:function(){},
    deviceType:function(){
        var w = this.WIN_W;
        if(w < 640){
            return 1;
        }else if(w < 960){
            return 2;
        }else if(w < 1280){
            return 3;
        }else{
            return 4;
        }
    },
    getLocationParam:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    isM:function(){
        return this.deviceType() == 1;
    },
    WIN_W:$(window).width(),
    WIN_H:$(window).height(),
    SCROLL_TOP:function(){
        return $(document).scrollTop();
    }
    ,Msg:function(msg,type){
        type = type||'info';
        console.log('['+type+"] "+msg);
    }
});