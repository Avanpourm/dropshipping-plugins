webpackJsonp([1],{"3kCT":function(t,e){},"7a53":function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("/5sW"),i=a("BO1k"),n=a.n(i),o={name:"Index",data:function(){return{productList:[],api_key:this.$cookies.get("am-api-key"),input:"",currentPage:1,currentDate:new Date,pushNumber:0,pushNumberShow:!1,publishLoading:!1,organizationArray:["landon-test-01","dropshipping-release-incy","automizely-store"],organizationMap:{"landon-test-01":"9bba1ea4d5a144049772bef6b7a1841a","dropshipping-release-incy":"86cf3a92b2c04d849a6056e7cd82e043","automizely-store":"86cf3a92b2c04d849a6056e7cd82e043"},appData:{app:{key:"dropshipping-release-incy",name:"aftership",platform:"shopify"},organization:{id:"automizely-store"}},priceFactors:[{min:0,max:499,factor:"1.5",originFactor:"2.5"},{min:500,max:999,factor:"1.25",originFactor:"2"},{min:1e3,max:999999999,factor:"1.1",originFactor:"1.5"}]}},created:function(){},methods:{initOrganization:function(){this.appData.organization.id=this.organizationMap[this.appData.app.key]},handleCurrentChange:function(t){this.currentPage=t,this.getProductsList(this.currentPage)},getProductsList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=this,a={};e.api_key&&(e.$cookies.set("am-api-key",e.api_key),a["am-api-key"]=e.api_key);var r=e.input.split(/[\s\n]/),i="";r&&(i=r.join(","));var o={page:t,limit:50};o.external_vendor_product_ids=i,e.$axios.get("https://platform.automizelyapi.com/suppliers/v1/products",{params:o,headers:a}).then(function(t){var a=t.data.data.products,r=!0,i=!1,o=void 0;try{for(var s,p=n()(a);!(r=(s=p.next()).done);r=!0){var c=s.value,u=!0,l=!1,d=void 0;try{for(var v,h=n()(c.variants);!(u=(v=h.next()).done);u=!0){var f=v.value;f.price.amount=_.round(f.price.amount,0)}}catch(t){l=!0,d=t}finally{try{!u&&h.return&&h.return()}finally{if(l)throw d}}c=e.productsPricesHandler(c)}}catch(t){i=!0,o=t}finally{try{!r&&p.return&&p.return()}finally{if(i)throw o}}e.productList=a})},pushProductsList:function(){var t=this,e=this;e.initOrganization(),e.publishLoading=!0,e.pushNumberShow=!0,e.pushNumber=0;var a={"am-api-key":e.api_key},r=function(r){var i=_.cloneDeepWith(r);i.app=e.appData.app,i.organization=e.appData.organization,e.$axios.post("https://product.automizelyapi.com/dropshipping/v1/products",i,{headers:a}).then(function(t){e.pushNumber++;var a=t.data.data.id;e.publishProduct(a,r),e.$set(r,"requestSuccess","推送中，请稍后~")}).catch(function(i){if("Request failed with status code 409"==i.message){var n={universal_product_ids:r.universal_product_id,app_key:e.appData.app.key,app_platform:e.appData.app.platform,organization_id:e.organization.id};e.$axios.get("https://product.automizelyapi.com/dropshipping/v1/products",{headers:a,params:n}).then(function(t){console.log(t.data.data)}),t.$set(r,"requestSuccess","此商品曾被推送成功")}else t.$set(r,"requestSuccess",""),t.$set(r,"requestErrorMsg","推送失败: "+i.message)})},i=!0,o=!1,s=void 0;try{for(var p,c=n()(e.productList);!(i=(p=c.next()).done);i=!0){r(p.value)}}catch(t){o=!0,s=t}finally{try{!i&&c.return&&c.return()}finally{if(o)throw s}}},getDropshippingProductId:function(t){},publishProduct:function(t,e){var a=this,r=this,i={"am-api-key":r.api_key},n=r.appData;r.$axios.post("https://product.automizelyapi.com/dropshipping/v1/products/"+t+"/publish",n,{headers:i}).then(function(t){r.publishLoading=!1,a.$set(e,"requestSuccess","推送成功")}).catch(function(t){r.publishLoading=!1,console.log("推送失败")})},productsPricesHandler:function(t){if(0==t.shipping_prices.length)return t;var e={},a=!0,r=!1,i=void 0;try{for(var o,s=n()(t.shipping_prices);!(a=(o=s.next()).done);a=!0){var p=o.value,c=p.shipping_options,u=(p.external_vendor_variant_ids,_.keyBy(c,function(t){return t.country+"-"+t.shipping_method})),l=null;u["USA-USPS"]?l=_.cloneDeep(u["USA-USPS"]):u["USA-4PX"]?l=_.cloneDeep(u["USA-4PX"]):u["USA-US Express Shipping"]?l=_.cloneDeep(u["USA-US Express Shipping"]):u["USA-US Standard"]&&(l=_.cloneDeep(u["USA-US Standard"]));try{l.prices=_.keyBy(l.prices,"unit")}catch(t){console.log(l),console.log(u)}if(!l)return t;var d=!0,v=!1,h=void 0;try{for(var f,m=n()(p.universal_variant_ids);!(d=(f=m.next()).done);d=!0){e[f.value]=l}}catch(t){v=!0,h=t}finally{try{!d&&m.return&&m.return()}finally{if(v)throw h}}}}catch(t){r=!0,i=t}finally{try{!a&&s.return&&s.return()}finally{if(r)throw i}}var y=!0,g=!1,b=void 0;try{for(var x,k=n()(t.variants);!(y=(x=k.next()).done);y=!0){var S=x.value,w=e[S.universal_variant_id],z=0,P=!0,C=!1,D=void 0;try{for(var $,U=n()(this.priceFactors);!(P=($=U.next()).done);P=!0){var L=$.value;L.min<=S.price.amount&&S.price.amount<=L.max&&(z=_.round(_.multiply(S.price.amount,L.factor),0))}}catch(t){C=!0,D=t}finally{try{!P&&U.return&&U.return()}finally{if(C)throw D}}w.prices||(console.log("---------------------------"),console.log(w)),S.price.origin_amount=S.price.amount;try{S.price.shipping_amount=w.prices[1].amount}catch(t){console.log("----------"),console.log(t),console.log(w)}S.price.amount=_.round(_.add(z,w.prices[1].amount),0)}}catch(t){g=!0,b=t}finally{try{!y&&k.return&&k.return()}finally{if(g)throw b}}return t}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("el-form",[a("el-form-item",[a("el-input",{attrs:{type:"password",placeholder:"请输入API KEY"},model:{value:t.api_key,callback:function(e){t.api_key=e},expression:"api_key"}}),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.appData.app.key,callback:function(e){t.$set(t.appData.app,"key",e)},expression:"appData.app.key"}},t._l(t.organizationArray,function(t,e){return a("el-option",{key:t,attrs:{label:t,value:t}})})),t._v(" "),a("el-input",{attrs:{placeholder:"搜索内容",type:"textarea"},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){t.getProductsList(1)}}},[t._v("商品查询")]),t._v(" "),a("el-popconfirm",{attrs:{title:"确定要推送这些商品吗？？"},on:{onConfirm:t.pushProductsList}},[a("el-button",{attrs:{slot:"reference",size:"small",loading:t.publishLoading},slot:"reference"},[t._v("推送选中的所有商品")])],1),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.pushNumberShow,expression:"pushNumberShow"}]},[t._v("推送成功数量:"+t._s(t.pushNumber))])],1)],1),t._v(" "),a("div",{staticStyle:{width:"96%",margin:"0 auto"}},[a("el-row",t._l(t.productList,function(e){return a("el-col",{key:e,staticStyle:{"margin-right":"6px","margin-bottom":"6px"},attrs:{span:11}},[a("el-card",{attrs:{"body-style":{padding:"0px"}}},[a("img",{staticClass:"image",attrs:{src:e.image_urls[0]}}),t._v(" "),a("div",{staticStyle:{padding:"8px"}},[a("b",{staticClass:"title"},[t._v(t._s(e.title))]),t._v(" "),t._l(e.variants.slice(0,1),function(r){return a("div",[a("span",{staticClass:"price-title"},[t._v("销售价:")]),t._v(" "),a("span",{staticClass:"price"},[t._v("$"+t._s(r.price.amount/100))]),t._v(" "),a("span",{staticClass:"price-title"},[t._v("成本价:")]),t._v(" "),a("span",{staticClass:"price"},[t._v("$"+t._s(r.price.origin_amount/100))]),t._v(" "),a("br"),t._v(" "),a("span",{staticClass:"price-title"},[t._v("运费价:")]),t._v(" "),a("span",{staticClass:"price"},[t._v("$"+t._s(r.price.shipping_amount/100))]),t._v(" "),a("span",{staticClass:"product-id"},[t._v(t._s(e.external_vendor_product_id))])])}),t._v(" "),a("div",{staticClass:"bottom clearfix"},[a("b",{staticStyle:{color:"red"}},[t._v(t._s(e.requestErrorMsg)+" ")]),t._v(" "),a("b",{staticStyle:{color:"green"}},[t._v(t._s(e.requestSuccess))])])],2)])],1)})),t._v(" "),a("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":100,layout:"prev, pager, next, jumper",total:6e4},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e}}})],1)],1)},staticRenderFns:[]};var p={name:"App",components:{Index:a("VU/8")(o,s,!1,function(t){a("7a53")},"data-v-a7699518",null).exports}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("Index")],1)},staticRenderFns:[]};var u=a("VU/8")(p,c,!1,function(t){a("3kCT")},null,null).exports,l=a("mtWM"),d=a.n(l),v=(a("Rf8U"),a("mw3O")),h=a.n(v),f=a("zL8q"),m=a.n(f),y=(a("tvR6"),a("ppUw")),g=a.n(y),b=a("M4fF"),x=a.n(b);r.default.config.productionTip=!1,r.default.use(m.a),r.default.use(g.a),r.default.prototype.$axios=d.a,r.default.prototype.$qs=h.a,r.default.prototype._=x.a,d.a.defaults.headers.post["Content-Type"]="application/json",d.a.defaults.withCredentials=!0,new r.default({el:"#app",render:function(t){return t(u)}})},tvR6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.8656b2b78a6f2d4db973.js.map