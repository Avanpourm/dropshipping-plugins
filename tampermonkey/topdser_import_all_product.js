// ==UserScript==
// @name         Topdser import 所有商品
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://app.topdser.com/import
// @grant        none
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// ==/UserScript==
(function() {
    'use strict';
    // Your code here...
    setTimeout(function(){
        $(".topdser-pro-components-import-list-import-list-item-description").click()
        console.log("click description");
        setTimeout(function(){
            //$(".ant-radio-wrapper").not(".ant-radio-wrapper-checked").click();
            console.log($(".ant-radio-wrapper"))
            // let header = $(".topdser-pro-components-import-list-import-list-item-header")
            // console.log(header)
            let  items = $(".ant-radio-wrapper")
            for (let i = 0;i < items.length; i++) {
                let value = items[i].children[0].childNodes[0].attributes[2].value
                if(value == "1"){
                    console.log("click item ",i," :",items[i]);
                    items[i].click();
                }
            }
            setTimeout(function(){
                $(".topdser-pro-components-import-list-import-list-item-import").click()
                reload();
                console.log("import");
            }, 4000);
        },3000);
    }, 6000);
})();
function reload(){
    setTimeout(function(){
        location.reload()
    },3000);
}
