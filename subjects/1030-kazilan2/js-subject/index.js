
Fui.Template.IMG_DIR = ImgDir('');

var slider = new Fui.PageSlider({
    el:'#pack',
    curPage:4,
    listeners:{
        gesture:function(e,gesture,$tar){
            var me = this
                ,pi = me.get('curPage')
            ;
            if(pi == 1){
                var $pl = $('#photo-list').find('.page2');
                if(gesture == 'leftSwipe'){
                    ensureListPage($pl,1);
                }
                if(gesture == 'rightSwipe'){
                    ensureListPage($pl,-1);
                }
            }
            function ensureListPage($tar,type){
                var $p = $tar.parent()
                    ;
                $p.children().removeClass('page1 page2 page3');
                if(type>0){
                    $tar.next().addClass('page2');
                    $tar.addClass('page1');
                    $tar.prev().addClass('page3');
                    $p.append($p.children().first());
                }else{
                    $tar.next().addClass('page1');
                    $tar.addClass('page3');
                    $tar.prev().addClass('page2');
                    $p.prepend($p.children().last());
                }
            }

        },
        gesture1:function(e,gesture,$tar){
            var dt = $tar.attr('data-'+gesture);
            switch (dt){
                case 'p0btn':break;
                case 'p1item':
                    p1();
                    break;
            }
            function p1(){
                if($tar.hasClass('page')){
                    $tar.children('img').removeClass('show');

                }else{
                    $tar.toggleClass('show').siblings('img').removeClass('show');
                }
            }
        }
    },
    data:[
        {
            template:'Base',
            bg:ImgDir('/p0/bg.jpg'),
            xtpl:'p0'
        }
        ,{
            template:'Base',
            bg:ImgDir('/p1/bg.jpg'),
            xtpl:'p1',
            getGestureItems:function(){

                return [
                    {
                        gesture:'tap',
                        name:'p1item',
                        callback:function(e,$tar,param){
                            if($tar.hasClass('page')){
                                $tar.children('img').removeClass('show');

                            }else{
                                $tar.toggleClass('show').siblings('img').removeClass('show');
                            }
                        }
                    }
                ];
            }
        }
        ,{
            template:'Base',
            bg:ImgDir('/p2/bg.jpg')
            ,xtpl:'p2'
        }
        ,{
            template:'Base',
            bg:ImgDir('/p3/bg.jpg')
            ,xtpl:'p3'
        }
        ,{
            template:'Base'
//            ,bg:ImgDir('/p4/bg.jpg')
            ,xtpl:'p4'
            ,css:{
                backgroundColor:'rgba(0,0,0,.35)'
            }
        }

    ]
});
slider.render();