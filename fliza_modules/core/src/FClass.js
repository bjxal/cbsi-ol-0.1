(function(global){




    // Helper function to correctly set up the prototype chain, for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    var extend = function(protoProps, staticProps) {
        var parent = this;
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ return parent.apply(this, arguments); };
        }

        // Add static properties to the constructor function, if supplied.
        _.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);

        // Set a convenience property in case the parent's prototype is needed
        // later.
//        child.super = parent.prototype;
        _.extend(child.prototype,{
            "super":parent.prototype
        });

        return child;
    };


    var XClass = function(options){
        options || (options = {});

        var config = {},superConfig = {},_super = this.super;
        var listeners = {},superListeners = {};

        while(_super){
            _.extend(superConfig,_super.config);
            _.extend(superListeners,_super.listeners);
            _super = _super.super;
        }
        _.extend(config,superConfig,this.config);
        _.extend(listeners,superListeners,this.listeners,options.listeners);

        var configKeys = _.keys(config);

        config = _.defaults(_.pick(options, configKeys),config);
        options = _.omit(options, configKeys);

        options.config = config;
//        _.extend(listeners,options.listeners);
        options.listeners = listeners;
        this.options = options;
        this.initial.call(this,options);
    };
    _.extend(XClass.prototype, {
        fid:0,
        config:{},
        events:{},
        listeners:{},
        initial:function(){},
        set:function(name,value){
            if(_.isObject(name)&&!value){
                for(var key in name){
                    if(name.hasOwnProperty(key))
                        this.set(key,name[key]);
                }
            }else if(_.isString(name)){
                var config = _.result(this.options,"config"),lis,old;
                if(typeof config[name] != 'undefined'){
                    if(_.isFunction(value)) value = value.call(null);
                    old = config[name];
                    this.options.config[name] = value;
                    lis = this.options.listeners[name+'Changed']||this.events[name+'changed'];
                    if(_.isFunction(lis)){
                        if(false === lis.apply(this,[value,old])){
                            this.options.config[name] = old;
                        }
                    }
                }
            }

        },
        get:function(name){
            var cfg = this.options.config[name];
            if(_.isFunction(cfg)) cfg = cfg.call(this);
            return cfg;
        },
        trigger:function(lis,params){

            lis = this.options.listeners[lis];
            if(_.isFunction(lis))
                lis.apply(this,params);
        }
    });

    XClass.extend = extend;

    global.FClass = global.F = XClass;
    global.log = console.log;
//    global.log = function(){
//        console.log('[log]',arguments);
//    };
//    global.error = function(){
//        console.error('[err]',arguments);
//    };





})(window);