(function(e){function t(t){for(var s,n,o=t[0],c=t[1],u=t[2],d=0,l=[];d<o.length;d++)n=o[d],r[n]&&l.push(r[n][0]),r[n]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);f&&f(t);while(l.length)l.shift()();return i.push.apply(i,u||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],s=!0,n=1;n<a.length;n++){var o=a[n];0!==r[o]&&(s=!1)}s&&(i.splice(t--,1),e=c(c.s=a[0]))}return e}var s={},n={app:0},r={app:0},i=[];function o(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-2d0d3c86":"291cb57e","chunk-55fe5a19":"fdefb1cc","chunk-568cac6c":"9c1bd543"}[e]+".js"}function c(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(e){var t=[],a={"chunk-55fe5a19":1,"chunk-568cac6c":1};n[e]?t.push(n[e]):0!==n[e]&&a[e]&&t.push(n[e]=new Promise(function(t,a){for(var s="css/"+({}[e]||e)+"."+{"chunk-2d0d3c86":"31d6cfe0","chunk-55fe5a19":"79e1a117","chunk-568cac6c":"0db17709"}[e]+".css",r=c.p+s,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var u=i[o],d=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(d===s||d===r))return t()}var l=document.getElementsByTagName("style");for(o=0;o<l.length;o++){u=l[o],d=u.getAttribute("data-href");if(d===s||d===r)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var s=t&&t.target&&t.target.src||r,i=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");i.request=s,delete n[e],f.parentNode.removeChild(f),a(i)},f.href=r;var m=document.getElementsByTagName("head")[0];m.appendChild(f)}).then(function(){n[e]=0}));var s=r[e];if(0!==s)if(s)t.push(s[2]);else{var i=new Promise(function(t,a){s=r[e]=[t,a]});t.push(s[2]=i);var u,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=o(e),u=function(t){d.onerror=d.onload=null,clearTimeout(l);var a=r[e];if(0!==a){if(a){var s=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+s+": "+n+")");i.type=s,i.request=n,a[1](i)}r[e]=void 0}};var l=setTimeout(function(){u({type:"timeout",target:d})},12e4);d.onerror=d.onload=u,document.head.appendChild(d)}return Promise.all(t)},c.m=e,c.c=s,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)c.d(a,s,function(t){return e[t]}.bind(null,s));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/smart-sensor/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],d=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var f=d;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},2500:function(e,t,a){var s={"./de.json":"edeb","./en.json":"bb69"};function n(e){var t=r(e);return a(t)}function r(e){var t=s[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}n.keys=function(){return Object.keys(s)},n.resolve=r,e.exports=n,n.id="2500"},3418:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{"ma-0":"","pa-0":"",fluid:""}},[a("v-layout",{attrs:{row:""}},[a("v-flex",[a("v-card",[a("v-card-text",[a("div",{staticClass:"text-xs-center grey--text"},[e._v("\n            "+e._s(e.$t("units.temperature"))+"\n          ")])]),a("line-chart",{attrs:{"chart-data":e.computedTemperatures,options:e.options}}),a("v-card-text",[a("div",{staticClass:"text-xs-center grey--text"},[e._v("\n            "+e._s(e.$t("units.humidity"))+"\n          ")])]),a("line-chart",{attrs:{"chart-data":e.computedHumidities,options:e.options}}),a("v-card-text",[a("div",{staticClass:"text-xs-center grey--text"},[e._v("\n            "+e._s(e.$t("units.pressure"))+"\n          ")])]),a("line-chart",{attrs:{"chart-data":e.computedPressures,options:e.options}}),a("v-card-text",[a("div",{staticClass:"text-xs-center grey--text"},[e._v("\n            "+e._s(e.$t("units.altitude"))+"\n          ")])]),a("line-chart",{attrs:{"chart-data":e.computedAltitudes,options:e.options}})],1)],1)],1)],1)},n=[],r=a("1fca"),i=r["b"].reactiveProp,o={extends:r["a"],mixins:[i],props:["options"],mounted:function(){this.renderChart(this.chartData,this.options)}},c="LAST_1000_ENTRIES",u={name:"PanelCharts",components:{LineChart:o},props:{device:{type:String,required:!0},filter:{type:Object,default:function(){return{key:c,offsetFromNowInMillis:NaN,limit:1e3,reduceFunction:function(e,t,a){var s=e.labels.length;return s>a?s-a:0}}}}},data:function(){return{options:{fill:!0,legend:{display:!1},layout:{padding:{left:20,right:20,top:0,bottom:0}},scales:{xAxes:[{type:"time",distribution:"series",time:{unit:"minute",displayFormats:{minute:"HH:mm:ss"}},ticks:{source:"labels"}}],yAxes:[{ticks:{beginAtZero:!0}}]}}}},computed:{computedTemperatures:function(){var e=this.$store.getters["BME280/getSeries"](this.device,this.filter.key);return{labels:e.labels,datasets:[{backgroundColor:"rgba(211, 47, 47, 0.3)",data:e.temperatures}]}},computedHumidities:function(){var e=this.$store.getters["BME280/getSeries"](this.device,this.filter.key);return{labels:e.labels,datasets:[{backgroundColor:"rgba(2, 136, 209, 0.3)",data:e.humidities}]}},computedPressures:function(){var e=this.$store.getters["BME280/getSeries"](this.device,this.filter.key);return{labels:e.labels,datasets:[{backgroundColor:"rgba(81, 45, 168, 0.3)",data:e.pressures}]}},computedAltitudes:function(){var e=this.$store.getters["BME280/getSeries"](this.device,this.filter.key);return{labels:e.labels,datasets:[{backgroundColor:"rgba(69, 90, 100, 0.3)",data:e.altitudes}]}}},created:function(){this.$store.dispatch("BME280/loadSeries",{device:this.device,key:this.filter.key,offsetFromNowInMillis:this.filter.offsetFromNowInMillis,limit:this.filter.limit,reduceFunction:this.filter.reduceFunction})}},d=u,l=a("2877"),f=a("6544"),m=a.n(f),h=a("b0af"),p=a("99d9"),b=a("a523"),v=a("0e8f"),g=a("a722"),j=Object(l["a"])(d,s,n,!1,null,"0607a144",null);t["default"]=j.exports;m()(j,{VCard:h["a"],VCardText:p["b"],VContainer:b["a"],VFlex:v["a"],VLayout:g["a"]})},4360:function(e,t,a){"use strict";var s=a("2b0e"),n=a("2f62"),r=a("bfa9"),i=a("a78e"),o=a.n(i),c=(a("ac6a"),a("7514"),a("0a0d")),u=a.n(c),d=a("a4bb"),l=a.n(d),f=a("bf48"),m=a.n(f),h=a("a18c"),p="-",b=m.a.Object.extend("BME280"),v={namespaced:!0,mutations:{setValue:function(e,t){s["a"].set(e,t.get("device"),t.attributes)},setSeries:function(e,t){var a=t.device,n=t.key,r=t.series;s["a"].set(e,[a+p+n],r)},updateSeries:function(e,t){for(var a=t.get("device"),s=l()(e),n=0;n<s.length;n++){var r=s[n];if(-1!==r.indexOf(a+p)){var i=e[r];i.labels.unshift(t.get("createdAt")),i.temperatures.unshift(t.get("temperature")),i.humidities.unshift(t.get("humidity")),i.pressures.unshift(t.get("pressure")),i.altitudes.unshift(t.get("altitude"));var o=i.reduceFunction(i,18e5,i.limit),c=-1*o;i.labels.splice(c,o),i.temperatures.splice(c,o),i.humidities.splice(c,o),i.pressures.splice(c,o),i.altitudes.splice(c,o)}}}},actions:{subscribeToValues:function(e,t){var a=e.commit,s=new m.a.Query(b);s.equalTo("device",t).descending("createdAt").first().then(function(e){e&&a("setValue",e)}).then(function(){s.subscribe().on("create",function(e){a("setValue",e),a("updateSeries",e)})})},loadSeries:function(e,t){var a=e.commit,s=t.device,n=t.key,r=t.offsetFromNowInMillis,i=t.limit,o=t.reduceFunction,c=new m.a.Query(b);if(r){var d=u()()-r;c.greaterThan("createdAt",new Date(d))}c.equalTo("device",s).descending("createdAt").limit(i).find().then(function(e){var t=[],c=[],u=[],d=[],l=[];e.forEach(function(e){t.push(e.attributes.createdAt),c.push(e.attributes.temperature),u.push(e.attributes.humidity),d.push(e.attributes.pressure),l.push(e.attributes.altitude)}),a("setSeries",{device:s,key:n,series:{labels:t,temperatures:c,humidities:u,pressures:d,altitudes:l,offsetFromNowInMillis:r,limit:i,reduceFunction:o}})})}},getters:{getValue:function(e){return function(t){return void 0===e[t]?{device:t,temperature:NaN,humidity:NaN,pressure:NaN,altitude:NaN}:e[t]}},getSeries:function(e){return function(t,a){return void 0===e[t+p+a]?{labels:[],temperatures:[],humidities:[],pressures:[],altitudes:[],offsetFromNowInMillis:NaN,limit:1e3,reduceFunction:function(){}}:e[t+p+a]}}}},g={namespaced:!0,state:{devices:[]},mutations:{setDevices:function(e,t){e.devices=t}},actions:{getDevices:function(e){var t=e.commit,a=m.a.Object.extend("Device"),s=new m.a.Query(a);s.find().then(function(e){var a=[];e.forEach(function(e){a.push(e.attributes)}),t("setDevices",a)})}},getters:{getDevices:function(e){return e.devices}}},j={namespaced:!0,state:{authenticated:!1},mutations:{setAuthenticated:function(e,t){e.authenticated=t}},actions:{login:function(e,t){var a=e.commit,s=t.email,n=t.password;m.a.User.logIn(s,n).then(function(){a("setAuthenticated",!0),h["a"].push({name:"home"})}).catch(function(){a("setAuthenticated",!1)})},logout:function(e){var t=e.commit;m.a.User.logOut().then(function(){}).catch(function(){}),t("setAuthenticated",!1),h["a"].push({name:"login"})}},getters:{isAuthenticated:function(e){return e.authenticated}}};s["a"].use(n["a"]);var y="smart-sensor",k=new r["a"]({key:y,restoreState:function(e,t){return o.a.getJSON(e)},saveState:function(e,t,a){return o.a.set(e,t,{expires:7})},modules:["User"]}),w=new r["a"]({key:y,storage:window.sessionStorage,modules:["BME280","Device"]}),x=new n["a"].Store({strict:!1,namespaced:!0,modules:{BME280:v,Device:g,User:j},plugins:[k.plugin,w.plugin]});t["a"]=x},4678:function(e,t,a){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb718","./de-ch.js":"bb718","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(e){var t=r(e);return a(t)}function r(e){var t=s[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}n.keys=function(){return Object.keys(s)},n.resolve=r,e.exports=n,n.id="4678"},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var s=a("2b0e"),n=(a("a481"),a("ac6a"),a("8103")),r=a.n(n),i=a("bba4"),o=a.n(i),c=a("ffe0");c.keys().forEach(function(e){var t=c(e),a=r()(o()(e.replace(/^\.\//,"").replace(/\.\w+$/,"")));s["a"].component(a,t.default||t)});var u=a("c1df");a("b469"),s["a"].use(a("2ead"),{moment:u});var d=a("bf48"),l=a.n(d);l.a.initialize("1IFq8uk57NzXVMvzb1EYtytchOCj4OEUMyCawK1a","jtl8Wgy2RajOIMqxlQjuAjJFqfZoMLLlL5yLWooY"),l.a.serverURL="https://smart-sensor.back4app.io",l.a.liveQueryServerURL="wss://smart-sensor.back4app.io",s["a"].use(l.a);var f=a("1dce"),m=a.n(f);s["a"].use(m.a);var h=a("bb71");a("da64");s["a"].use(h["a"],{iconfont:"md"});var p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",{attrs:{id:"app"}},[a("the-navigation"),a("v-content",{attrs:{transition:"slide-x-transition"}},[a("router-view")],1),a("v-footer",{attrs:{height:"auto",color:"primary"}},[a("v-layout",{attrs:{"justify-center":"",row:""}},[a("v-btn",{attrs:{flat:"",href:"https://github.com/hunsalz/smart-sensor",target:"_blank",rel:"noreferrer"}},[a("span",{staticClass:"white--text"},[e._v("\n          GitHub\n        ")])])],1)],1)],1)},b=[],v={name:"App",created:function(){this.setTitle()},methods:{setTitle:function(){document.title=this.$t("app.name")}}},g=v,j=a("2877"),y=a("6544"),k=a.n(y),w=a("7496"),x=a("8336"),_=a("549c"),E=a("553a"),L=a("a722"),S=Object(j["a"])(g,p,b,!1,null,null,null),N=S.exports;k()(S,{VApp:w["a"],VBtn:x["a"],VContent:_["a"],VFooter:E["a"],VLayout:L["a"]});a("4917");var A=a("a925");function C(){var e=a("2500"),t={};return e.keys().forEach(function(a){var s=a.match(/([A-Za-z0-9-_]+)\./i);if(s&&s.length>1){var n=s[1];t[n]=e(a)}}),t}s["a"].use(A["a"]);var O=new A["a"]({locale:"de",fallbackLocale:"en",messages:C()}),V=a("a18c"),z=a("4360"),T=a("9483");Object(T["a"])("".concat("/smart-sensor/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),s["a"].config.productionTip=!1,new s["a"]({i18n:O,router:V["a"],store:z["a"],render:function(e){return e(N)}}).$mount("#app")},a18c:function(e,t,a){"use strict";a("7f7f");var s=a("2b0e"),n=a("8c4f"),r=a("4360");s["a"].use(n["a"]);var i=new n["a"]({routes:[{path:"/",redirect:{name:"login"}},{path:"/login",name:"login",component:function(){return a.e("chunk-55fe5a19").then(a.bind(null,"a55b"))}},{path:"/home",name:"home",component:function(){return a.e("chunk-568cac6c").then(a.bind(null,"bb51"))},meta:{authRequired:!0}},{path:"/more",name:"more",component:function(){return a.e("chunk-2d0d3c86").then(a.bind(null,"5dde"))},meta:{authRequired:!0}},{path:"*",redirect:{name:"login"}}]});i.beforeEach(function(e,t,a){e.matched.some(function(e){return e.meta.authRequired})?r["a"].getters["User/isAuthenticated"]?a():a({name:"login"}):"login"===e.name&&r["a"].getters["User/isAuthenticated"]?a({name:"home"}):a()}),t["a"]=i},aeea:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{"ma-0":"","pa-0":"",fluid:""}},[a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs5:""}},[a("v-card",{attrs:{flat:""}},[a("v-card-text",[a("div",[a("div",{staticClass:"subheading"},[e._v("\n              "+e._s(e.computedLabel)+"\n            ")]),a("span",{staticClass:"font-weight-light grey--text caption"},[e._v("\n              "+e._s(e.device)+"\n            ")])])])],1)],1),a("v-flex",[a("v-card",{attrs:{flat:""}},[a("v-card-text",{staticClass:"font-weight-light caption"},[a("div",[a("div",[e._v(e._s(e.$t("units.temperature"))+" "+e._s(e.computedValue.temperature)+" °")]),a("div",[e._v(e._s(e.$t("units.humidity"))+" "+e._s(e.computedValue.humidity)+" %")]),a("div",[e._v(e._s(e.$t("units.pressure"))+" "+e._s(e.computedValue.pressure)+" Pa")]),a("div",[e._v(e._s(e.$t("units.altitude"))+" "+e._s(e.computedValue.altitude)+" m")])])])],1)],1)],1),a("v-layout",{attrs:{row:""}},[a("v-flex",[a("div",{staticClass:"text-xs-center grey--text font-weight-light caption"},[e._v("\n        "+e._s(e.$t("app.panel.lastUpdate"))+" : "+e._s(e.computedLastUpdateDate)+"\n      ")])])],1)],1)},n=[],r=a("c1df"),i=a.n(r),o={name:"PanelHeader",props:{device:{type:String,required:!0},label:{type:String,required:!1,default:""}},computed:{computedLabel:function(){return""===this.label?this.device:this.label},computedValue:function(){return this.$store.getters["BME280/getValue"](this.device)},computedLastUpdateDate:function(){return i()(this.computedValue.createdAt).format("LLL")}},created:function(){this.$store.dispatch("BME280/subscribeToValues",this.device)}},c=o,u=a("2877"),d=a("6544"),l=a.n(d),f=a("b0af"),m=a("99d9"),h=a("a523"),p=a("0e8f"),b=a("a722"),v=Object(u["a"])(c,s,n,!1,null,"0936c492",null);t["default"]=v.exports;l()(v,{VCard:f["a"],VCardText:m["b"],VContainer:h["a"],VFlex:p["a"],VLayout:b["a"]})},bb69:function(e){e.exports={app:{name:"Smart Sensor",login:{name:"Login",email:"Email",password:"Password",btn:"Login"},logout:{name:"Logout"},panel:{lastUpdate:"Last update"}},units:{temperature:"Temperature",humidity:"Humidity",pressure:"Pressure",altitude:"Altitude"},tabs:{last4hours:"Last 4h",last24hours:"Last 24h",last7days:"Last 7 days",last10:"Last 10"},validations:{emailRequired:"Email is required",emailValid:"Must be a valid email",passwordRequired:"Password is required",passwordMinLength:"Password must be at least {0} characters long"}}},edeb:function(e){e.exports={app:{name:"Smart Sensor",login:{name:"Anmelden",email:"Email",password:"Passwort",btn:"Anmelden"},logout:{name:"Abmelden"},panel:{lastUpdate:"Letzte Aktualisierung"}},units:{temperature:"Temperatur",humidity:"Luftfeuchtigkeit",pressure:"Luftdruck",altitude:"Höhe"},tabs:{last4hours:"Letzte 4h",last24hours:"Letzte 24h",last7days:"Letzte 7d",last10:"Letzte 10"},validations:{emailRequired:"Email erforderlich",emailValid:"Email muss gültig sein",passwordRequired:"Passwort erforderlich",passwordMinLength:"Passwort erfordert mindestens {0} Zeichen"}}},f39b:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-toolbar",{attrs:{app:"",prominent:"",dark:"",color:"primary"}},[a("v-toolbar-title",{staticClass:"headline text-uppercase"},[a("span",[e._v("Smart ")]),a("span",{staticClass:"font-weight-light"},[e._v("\n      SENSOR\n    ")])]),a("v-spacer"),e.isAuthenticated?a("div",[a("v-btn",{attrs:{flat:""},on:{click:e.logout}},[e._v("\n      "+e._s(e.$t("app.logout.name"))+"\n    ")])],1):e._e(),a("v-btn",{directives:[{name:"show",rawName:"v-show",value:"more"===e.$route.name,expression:"$route.name === 'more'"}],attrs:{flat:"",icon:""},on:{click:e.home}},[a("v-icon",[e._v("chevron_left")])],1),a("v-btn",{directives:[{name:"show",rawName:"v-show",value:"home"===e.$route.name,expression:"$route.name === 'home'"}],attrs:{flat:"",icon:""},on:{click:e.more}},[a("v-icon",[e._v("more_vert")])],1)],1)},n=[],r=a("a18c"),i={name:"TheNavigation",computed:{isAuthenticated:function(){return this.$store.getters["User/isAuthenticated"]}},methods:{home:function(){r["a"].push({name:"home"})},logout:function(){this.$store.dispatch("User/logout")},more:function(){r["a"].push({name:"more"})}}},o=i,c=a("2877"),u=a("6544"),d=a.n(u),l=a("8336"),f=a("132d"),m=a("9910"),h=a("71d9"),p=a("2a7f"),b=Object(c["a"])(o,s,n,!1,null,"a439bbca",null);t["default"]=b.exports;d()(b,{VBtn:l["a"],VIcon:f["a"],VSpacer:m["a"],VToolbar:h["a"],VToolbarTitle:p["a"]})},ffe0:function(e,t,a){var s={"./PanelCharts.vue":"3418","./PanelHeader.vue":"aeea","./TheNavigation.vue":"f39b"};function n(e){var t=r(e);return a(t)}function r(e){var t=s[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}n.keys=function(){return Object.keys(s)},n.resolve=r,e.exports=n,n.id="ffe0"}});
//# sourceMappingURL=app.d25e29c1.js.map