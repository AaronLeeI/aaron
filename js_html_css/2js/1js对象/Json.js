/**
 * Created by Aaron_Lee_I on 2016/9/9.
 */
/**
 ********************************** location  *****************************
 */

$(function () {
    var jsons = [];
    jsons[0] = {name:'n1',id:1};
    jsons.push({name:'n2',id:2});
    console.log( $.toJSON(jsons));
    console.log( $.toJSON({xAxis:"3",Axis:"3",sku:"3" }));
})
