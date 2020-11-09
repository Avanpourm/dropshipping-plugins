// ==UserScript==
// @name         aliexpress to topdser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.aliexpress.com/wholesale*
// @grant        none
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// ==/UserScript==
(function() {
    'use strict';
    // Your code here...
    setTimeout(function(){
        // console.log($(".dsp-plugin-importBtn"));
        $(".dsp-plugin-importBtn").click()
        nextPage()
    }, 7000);
    // 滚动到底部
    toBottom()
})();
function toBottom(){
    let v = document.body.scrollHeight/6
    setTimeout(function(){
        // var ele = document.getElementById('root');
        //  ele.scrollTop = ele.scrollHeight;
        console.log("滚动到了底部");
        window.scrollTo(0,v);
    },1000);
    setTimeout(function(){
        // var ele = document.getElementById('root');
        //  ele.scrollTop = ele.scrollHeight;
        console.log("滚动到了底部");
        window.scrollTo(0,v*2);
    },2000);
    setTimeout(function(){
        // var ele = document.getElementById('root');
        //  ele.scrollTop = ele.scrollHeight;
        console.log("滚动到了底部");
        window.scrollTo(0,v*3);
    },3000);
    setTimeout(function(){
        // var ele = document.getElementById('root');
        //  ele.scrollTop = ele.scrollHeight;
        console.log("滚动到了底部");
        window.scrollTo(0,v*4);
    },4000);
    setTimeout(function(){
        // var ele = document.getElementById('root');
        //  ele.scrollTop = ele.scrollHeight;
        console.log("滚动到了底部");
        window.scrollTo(0,v*5);
    },5000);
    setTimeout(function(){
        // var ele = document.getElementById('root');
        //  ele.scrollTop = ele.scrollHeight;
        console.log("滚动到了底部");
        window.scrollTo(0,v*6);
    },6000);
}
// 下一页
function nextPage(){
    setTimeout(function(){
        console.log("点击了下一页");
        // $("next-pagination-item").click;
        $(".next-next").click();
        reload();
    },6000);
}
function reload(){
    setTimeout(function(){
        console.log("刷新");
        location.reload()
    },3000);
}
function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
}
