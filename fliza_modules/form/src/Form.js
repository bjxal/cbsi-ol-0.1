/**
 * Created by ericai on 14-8-9.
 * Email: 330785652@qq.com
 */

Fui.Form = Fui.extend({
    className: function(){
        return ['fui-form','fui-form-'+this.get('size')]
    },
    config:{
        title:'Form',
        size:'normal',//normal
        /*
        * {
        *   type:'text',    --> text|image|select
        *   name:'name'     --> unique ,require
        * }
        * */
        tpl: require('!tpl:../tpl/form'),
        grid:1,
        //@deprecated
        actions:null,
        items:[]
    },
    listeners:{
        submit:null
    },
    itemsMap:{},
    initialize:function(options){
        this.options  = options;
        this.render();
    },
    setData:function(key,value){
        var me = this,
            items = this.get('items');
        if(_.isObject(key)&&typeof value == 'undefined'){
            _.each(key,function(a,k){
//                console.log(k,a);
                me.setData(k,a);
            });
        }else{
            _.each(items,function(a){
                if(a.get('name') == key){
                    a.set('value',value);
                }
            });
        }

    },
    getData:function(){
        var items = this.get('items'),re = {};
        _.each(items,function(a){
            if(_.isFunction(a.getData)){
                var d = a.getData();
                if(d)
                    re[d.name] = d.value;
            }
        });
        return re;
    },
    upload:function(cb){
        var me = this
            ,items = me.get('items')
            ,total = 0,i=0
        ;
        _.each(items,function(item){
            if(item.upload){
                total++;
            }
        });
        _.each(items,function(item){
            if(item.upload){
                item.upload(function(flag){
                    if(!flag) return cb(false);
                    if(++i == total){
                        cb(true);
                    }
                });
            }
        });

    },
    getItem:function(name){
        var me = this
            ,items = me.get('items');
        for(var i= 0,ln=items.length;i<ln;i++){
            if(name == items[i].get('name')){
                return items[i];
            }
        }
    },
    validate:function(cb){
        var me = this
            ,items = me.get('items')
            ,i= 0,j= 0,ln = items.length
            ;
        _.each(items,function(a){
            if(_.isFunction(a.validate)){
                a.validate(success);
            }else if(!!a.noValidate){
                success(true);
            }else{
                console.log('FormItem has no validate :',a);
            }
        });
        function success(flag){
            if(flag)i++;
            if(++j == ln){
                cb(i == ln);
            }
        }
    },
    _submit:function(){
        var me = this;
        this.validate(function(flag){
            flag?me.trigger('submit',[me.getData()]):0
        });
    },
    render:function(){
        var me = this
            ,$el = me.$el
            ,items = me.get('items')
            ,tpl = Handlebars.compile(me.get('tpl'))
        ;
        if(!_.isArray(items)) return error('Form need an array[Form.Element] for items');

        var gridT = 0,grid = me.get('grid');

        _.each(items,function(a){
            if(isNaN(a.grid))a.grid = grid;
            gridT+= a.grid;
        });
        $el.html(tpl({
            title:me.get('title'),
            lines:Math.floor(gridT/grid)
        }));
        gridT = 0;
        var $items = $el.find('[data-fui-key=ele-list]')
            ,$lis = $items.children('li')
            ,lines = 0
            ;

        _.each(items,function(a,i){
            var type = a.type;
            switch (a.type){
                case 'Submit':
                    a.listeners = {
                        tap:function(){
                            me._submit();
                        }
                    };
                    break;
                case 'Cancel':
                    a.listeners = {
                        tap:function(){
                            me.trigger('cancel');
                        }
                    };
                    break;
            }
            //栅格
            if(isNaN(a.grid))a.grid = grid;
            var Clazz = Fui.Form[type],ins = null;
            delete a.type;
            if(_.isFunction(Clazz)){
                ins = new Clazz(a);
                items.splice(i,1,ins);
                $lis.eq(Math.floor(gridT)).append(ins.$el);
                gridT += a.grid;
                if(a.grid < grid){
                    ins.$el.addClass('inline').css({
                        width: 100*a.grid/grid+'%'
                    });
                }
            }
        });

        //@deprecated
        var actions = me.get('actions');
        if(actions){
            if(_.isFunction(actions.submit)){
                //actions
                var submit = new Fui.Button({
                    type:'primary',
                    text:'提交',
                    listeners:{
                        tap:function(){
                            if(_.isFunction(actions.submit)){
                                actions.submit.call(me);
                            }
                        }
                    }

                });
                $lis.last().append(submit.$el);
            }
            if(_.isFunction(actions.cancel)){
                var cancel = new Fui.Button({
                    text:'取消',
                    listeners:{
                        tap:function(){
                            if(_.isFunction(actions.cancel)){
                                actions.cancel.call(me);
                            }
                        }
                    }

                });
                $lis.last().append(cancel.$el);
            }
        }else{
//            $lis.last().hide();
        }

    },
    events:{
        'click':function(e){
            e.stopPropagation();
        }
    }
});