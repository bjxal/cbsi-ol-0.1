/**
 * Created by ericai on 14-8-10.
 * Email: 330785652@qq.com
 */

Handlebars.registerHelper('range', function(items, options) {
    var out = '';
    for(var i = 0;i<items;i++) out += options.fn();
    return out;
});