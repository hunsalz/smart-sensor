(function(e){function t(t){for(var n,s,o=t[0],c=t[1],u=t[2],l=0,d=[];l<o.length;l++)s=o[l],r[s]&&d.push(r[s][0]),r[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,s=1;s<a.length;s++){var o=a[s];0!==r[o]&&(n=!1)}n&&(i.splice(t--,1),e=c(c.s=a[0]))}return e}var n={},s={app:0},r={app:0},i=[];function o(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-bc018d0a":"ed40b0c1","chunk-2d0d3c86":"65b573f9","chunk-37f41dab":"db4193c3","chunk-e0b341ee":"8c273d6d"}[e]+".js"}function c(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(e){var t=[],a={"chunk-bc018d0a":1,"chunk-e0b341ee":1};s[e]?t.push(s[e]):0!==s[e]&&a[e]&&t.push(s[e]=new Promise(function(t,a){for(var n="css/"+({}[e]||e)+"."+{"chunk-bc018d0a":"26d32d61","chunk-2d0d3c86":"31d6cfe0","chunk-37f41dab":"31d6cfe0","chunk-e0b341ee":"17055c0b"}[e]+".css",r=c.p+n,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var u=i[o],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===n||l===r))return t()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){u=d[o],l=u.getAttribute("data-href");if(l===n||l===r)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var n=t&&t.target&&t.target.src||r,i=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");i.request=n,delete s[e],f.parentNode.removeChild(f),a(i)},f.href=r;var b=document.getElementsByTagName("head")[0];b.appendChild(f)}).then(function(){s[e]=0}));var n=r[e];if(0!==n)if(n)t.push(n[2]);else{var i=new Promise(function(t,a){n=r[e]=[t,a]});t.push(n[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=o(e),u=function(t){l.onerror=l.onload=null,clearTimeout(d);var a=r[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+n+": "+s+")");i.type=n,i.request=s,a[1](i)}r[e]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(a,n,function(t){return e[t]}.bind(null,n));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var f=l;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"07a3":function(e,t,a){"use strict";a.r(t);var n=a("29e5"),s=a("7672");for(var r in s)"default"!==r&&function(e){a.d(t,e,function(){return s[e]})}(r);var i=a("2877"),o=a("6544"),c=a.n(o),u=a("8336"),l=a("553a"),d=a("a722"),f=Object(i["a"])(s["default"],n["a"],n["b"],!1,null,"dd553534",null);t["default"]=f.exports,c()(f,{VBtn:u["a"],VFooter:l["a"],VLayout:d["a"]})},2500:function(e,t,a){var n={"./de.json":"edeb","./en.json":"bb69"};function s(e){var t=r(e);return a(t)}function r(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}s.keys=function(){return Object.keys(n)},s.resolve=r,e.exports=s,s.id="2500"},"29e5":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-footer",{attrs:{height:"auto",color:"primary",fixed:""}},[a("v-layout",{attrs:{"justify-center":"",row:""}},[a("v-btn",{attrs:{flat:"",href:"https://github.com/hunsalz/smart-sensor",target:"_blank",rel:"noreferrer"}},[a("span",{staticClass:"white--text"},[e._v("\n        GitHub\n      ")])])],1)],1)},s=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return s})},"2cd1":function(e,t,a){"use strict";a.d(t,"a",function(){return r}),a.d(t,"b",function(){return i});var n=a("0a0d"),s=a.n(n),r=function(e,t,a){var n=e.labels.length;return n>a?n-a:0},i=function(e,t,a){for(var n=s()()-t,r=e.labels.length-1;r>0;r--)if(n<new Date(e.labels[r]).getTime())break;return e.labels.length-r-1}},3418:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{"ma-0":"","pa-0":"",fluid:""}},[a("v-layout",{attrs:{row:""}},[a("v-flex",[a("v-card",[a("v-card-text",[a("div",{staticClass:"text-xs-center grey--text"},[e._v("\n            "+e._s(e.$t("units.temperature"))+"\n          ")])]),a("line-chart",{attrs:{"chart-data":e.computedTemperatures,options:e.options}}),a("v-card-text",[a("div",{staticClass:"text-xs-center grey--text"},[e._v("\n            "+e._s(e.$t("units.humidity"))+"\n          ")])]),a("line-chart",{attrs:{"chart-data":e.computedHumidities,options:e.options}}),a("v-card-text",[a("div",{staticClass:"text-xs-center grey--text"},[e._v("\n            "+e._s(e.$t("units.pressure"))+"\n          ")])]),a("line-chart",{attrs:{"chart-data":e.computedPressures,options:e.options}}),a("v-card-text",[a("div",{staticClass:"text-xs-center grey--text"},[e._v("\n            "+e._s(e.$t("units.altitude"))+"\n          ")])]),a("line-chart",{attrs:{"chart-data":e.computedAltitudes,options:e.options}})],1)],1)],1)],1)},s=[],r=a("1fca"),i=r["b"].reactiveProp,o={extends:r["a"],mixins:[i],props:["options"],mounted:function(){this.renderChart(this.chartData,this.options)}},c=a("2cd1"),u=a("4360"),l="LAST_1000_ENTRIES",d={name:"PanelCharts",components:{LineChart:o},props:{device:{type:String,required:!0},filter:{type:Object,default:function(){return{key:l,offsetFromNowInMillis:NaN,limit:1e3,reduceFunction:c["a"]}}}},data:function(){return{options:{fill:!0,legend:{display:!1},layout:{padding:{left:20,right:20,top:0,bottom:0}},scales:{xAxes:[{type:"time",distribution:"series",time:{unit:"minute",displayFormats:{minute:"HH:mm:ss"}},ticks:{source:"labels"}}],yAxes:[{ticks:{beginAtZero:!0}}]}}}},computed:{computedTemperatures:function(){var e=this.$store.getters[u["a"].BME280.getters.getSeries](this.device,this.filter.key);return{labels:e.labels,datasets:[{backgroundColor:"rgba(211, 47, 47, 0.3)",data:e.temperatures}]}},computedHumidities:function(){var e=this.$store.getters[u["a"].BME280.getters.getSeries](this.device,this.filter.key);return{labels:e.labels,datasets:[{backgroundColor:"rgba(2, 136, 209, 0.3)",data:e.humidities}]}},computedPressures:function(){var e=this.$store.getters[u["a"].BME280.getters.getSeries](this.device,this.filter.key);return{labels:e.labels,datasets:[{backgroundColor:"rgba(81, 45, 168, 0.3)",data:e.pressures}]}},computedAltitudes:function(){var e=this.$store.getters[u["a"].BME280.getters.getSeries](this.device,this.filter.key);return{labels:e.labels,datasets:[{backgroundColor:"rgba(69, 90, 100, 0.3)",data:e.altitudes}]}}},created:function(){this.$store.dispatch(u["a"].BME280.actions.loadSeries,{device:this.device,key:this.filter.key,offsetFromNowInMillis:this.filter.offsetFromNowInMillis,limit:this.filter.limit,reduceFunction:this.filter.reduceFunction})}},f=d,b=a("2877"),h=a("6544"),m=a.n(h),p=a("b0af"),v=a("99d9"),g=a("a523"),j=a("0e8f"),y=a("a722");a.d(t,"LAST_1000_ENTRIES",function(){return l});var w=Object(b["a"])(f,n,s,!1,null,"de90a12e",null);t["default"]=w.exports;m()(w,{VCard:p["a"],VCardText:v["b"],VContainer:g["a"],VFlex:j["a"],VLayout:y["a"]})},4360:function(e,t,a){"use strict";var n,s,r,i,o,c,u,l=a("bd86"),d=a("2b0e"),f=a("2f62"),b=a("bfa9"),h=a("a78e"),m=a.n(h),p={getPanels:"getPanels"},v={setPanels:"setPanels"},g={namespaced:!0,state:{panels:[]},getters:Object(l["a"])({},p.getPanels,function(e){return function(){return e.panels.slice()}}),mutations:Object(l["a"])({},v.setPanels,function(e,t){e.panels=t})},j=a("a4bb"),y=a.n(j),w=(a("ac6a"),a("7514"),a("0a0d")),k=a.n(w),x=a("bf48"),_=a.n(x),O=a("49b2"),S="@",E={subscribeToValues:"subscribeToValues",loadSeries:"loadSeries"},V={getValue:"getValue",getSeries:"getSeries"},L={setValue:"setValue",setSeries:"setSeries",updateSeries:"updateSeries"},T={namespaced:!0,actions:(n={},Object(l["a"])(n,E.subscribeToValues,function(e,t){var a=e.commit,n=new _.a.Query(O["a"]);n.equalTo("device",t).descending("createdAt").first().then(function(e){e&&a(L.setValue,e)}).then(function(){n.subscribe().on("create",function(e){a(L.setValue,e),a(L.updateSeries,e)})})}),Object(l["a"])(n,E.loadSeries,function(e,t){var a=e.commit,n=t.device,s=t.key,r=t.offsetFromNowInMillis,i=t.limit,o=t.reduceFunction,c=new _.a.Query(O["a"]);if(r){var u=k()()-r;c.greaterThan("createdAt",new Date(u))}c.equalTo("device",n).descending("createdAt").limit(i).find().then(function(e){var t=[],c=[],u=[],l=[],d=[];e.forEach(function(e){t.push(e.attributes.createdAt),c.push(e.attributes.temperature),u.push(e.attributes.humidity),l.push(e.attributes.pressure),d.push(e.attributes.altitude)}),a(L.setSeries,{device:n,key:s,series:{labels:t,temperatures:c,humidities:u,pressures:l,altitudes:d,offsetFromNowInMillis:r,limit:i,reduceFunction:o}})})}),n),getters:(s={},Object(l["a"])(s,V.getValue,function(e){return function(t){return void 0===e[t]?{device:t,temperature:NaN,humidity:NaN,pressure:NaN,altitude:NaN}:e[t]}}),Object(l["a"])(s,V.getSeries,function(e){return function(t,a){return void 0===e[t+S+a]?{labels:[],temperatures:[],humidities:[],pressures:[],altitudes:[],offsetFromNowInMillis:NaN,limit:1e3,reduceFunction:function(){}}:e[t+S+a]}}),s),mutations:(r={},Object(l["a"])(r,L.setValue,function(e,t){d["a"].set(e,t.get("device"),t.attributes)}),Object(l["a"])(r,L.setSeries,function(e,t){var a=t.device,n=t.key,s=t.series;d["a"].set(e,[a+S+n],s)}),Object(l["a"])(r,L.updateSeries,function(e,t){for(var a=t.get("device"),n=y()(e),s=0;s<n.length;s++){var r=n[s];if(-1!==r.indexOf(a+S)){var i=e[r];i.labels.unshift(t.get("createdAt")),i.temperatures.unshift(t.get("temperature")),i.humidities.unshift(t.get("humidity")),i.pressures.unshift(t.get("pressure")),i.altitudes.unshift(t.get("altitude"));var o=i.reduceFunction(i,i.offsetFromNowInMillis,i.limit),c=-1*o;i.labels.splice(c,o),i.temperatures.splice(c,o),i.humidities.splice(c,o),i.pressures.splice(c,o),i.altitudes.splice(c,o)}}}),r)},A=a("5176"),P=a.n(A),D={subscribeToDevices:"subscribeToDevices",saveDevices:"saveDevices"},N={getDevices:"getDevices"},$={setDevices:"setDevices",setLabel:"setLabel",pushDevice:"pushDevice"},C={namespaced:!0,state:{devices:[]},actions:(i={},Object(l["a"])(i,D.subscribeToDevices,function(e){var t=e.commit,a=new _.a.Query(O["b"]);a.find().then(function(e){var a=[];e.forEach(function(e){var t=P()({},e.attributes);t.id=e.id,a.push(t)}),t($.setDevices,a)}).then(function(){a.subscribe().on("create",function(e){var a=P()({},e.attributes);a.id=e.id,t($.pushDevice,a)})})}),Object(l["a"])(i,D.saveDevices,function(e){var t=e.state;t.devices.forEach(function(e){var t=new _.a.Query(O["b"]);t.get(e.id).then(function(t){t.get("label")!=e.label&&(t.set("label",e.label),t.save().then(function(){},function(e){console.error("Updating failed",e)}))})})}),i),getters:Object(l["a"])({},N.getDevices,function(e){return e.devices}),mutations:(o={},Object(l["a"])(o,$.setDevices,function(e,t){e.devices=t}),Object(l["a"])(o,$.setLabel,function(e,t){var a=t.index,n=t.label;e.devices[a].label=n}),Object(l["a"])(o,$.pushDevice,function(e,t){e.devices.push(t)}),o)},z=a("a18c"),M={login:"login",logout:"logout"},F={isAuthenticated:"isAuthenticated"},U={setAuthenticated:"setAuthenticated"},q={namespaced:!0,state:{authenticated:!1},actions:(c={},Object(l["a"])(c,M.login,function(e,t){var a=e.commit,n=t.email,s=t.password;_.a.User.logIn(n,s).then(function(){a(U.setAuthenticated,!0),z["a"].push({name:"home"})}).catch(function(){a(U.setAuthenticated,!1)})}),Object(l["a"])(c,M.logout,function(e){var t=e.commit;t(U.setAuthenticated,!1),z["a"].push({name:"login"}),_.a.User.logOut().then(function(){}).catch(function(){})}),c),getters:Object(l["a"])({},F.isAuthenticated,function(e){return function(){return e.authenticated}}),mutations:{setAuthenticated:function(e,t){e.authenticated=t}}};a.d(t,"a",function(){return Q}),d["a"].use(f["a"]);var I="AppPreferences",B="BME280",H="Device",R="User",Q=(u={},Object(l["a"])(u,I,{getters:{getPanels:I+"/"+p.getPanels},mutations:{setPanels:I+"/"+v.setPanels}}),Object(l["a"])(u,B,{actions:{subscribeToValues:B+"/"+E.subscribeToValues,loadSeries:B+"/"+E.loadSeries},getters:{getValue:B+"/"+V.getValue,getSeries:B+"/"+V.getSeries}}),Object(l["a"])(u,H,{actions:{subscribeToDevices:H+"/"+D.subscribeToDevices,saveDevices:H+"/"+D.saveDevices},getters:{getDevices:H+"/"+N.getDevices},mutations:{setLabel:H+"/"+$.setLabel}}),Object(l["a"])(u,R,{actions:{login:R+"/"+M.login,logout:R+"/"+M.logout},getters:{isAuthenticated:R+"/"+F.isAuthenticated}}),u),G="smart-sensor",Y=new b["a"]({key:G,restoreState:function(e,t){return m.a.getJSON(e)},saveState:function(e,t,a){return m.a.set(e,t,{expires:7})},modules:[R]}),Z=new b["a"]({key:G,storage:window.sessionStorage,modules:[B,H]}),J=new b["a"]({key:G,storage:window.localStorage,modules:[I]}),W=new f["a"].Store({strict:!1,namespaced:!0,modules:{AppPreferences:g,BME280:T,Device:C,User:q},plugins:[Y.plugin,Z.plugin,J.plugin]});t["b"]=W},4678:function(e,t,a){var n={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb718","./de-ch.js":"bb718","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function s(e){var t=r(e);return a(t)}function r(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}s.keys=function(){return Object.keys(n)},s.resolve=r,e.exports=s,s.id="4678"},"49b2":function(e,t,a){"use strict";a.d(t,"a",function(){return i}),a.d(t,"b",function(){return o}),a.d(t,"c",function(){return c});var n=a("bf48"),s=a.n(n),r=a("4360");s.a.initialize("10kYklW6wkvgiJ44gLl41yYPidmbhZrZB1fWTO7w","YVDahombQLPYzltGnijeYWKEiDw5O7GAeyD4xlSa"),s.a.serverURL="https://smart-sensor-app.back4app.io",s.a.liveQueryServerURL="wss://smart-sensor-app.back4app.io";var i=s.a.Object.extend("BME280"),o=s.a.Object.extend("Device"),c=function(e,t){console.error("Parse error:",t),console.warn("Force logout."),e.dispatch(r["a"].User.actions.logout)}},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("2b0e"),s=(a("a481"),a("ac6a"),a("8103")),r=a.n(s),i=a("bba4"),o=a.n(i),c=a("ffe0");c.keys().forEach(function(e){var t=c(e),a=r()(o()(e.replace(/^\.\//,"").replace(/\.\w+$/,"")));n["a"].component(a,t.default||t)});var u=a("c1df");a("b469"),n["a"].use(a("2ead"),{moment:u});a("49b2");var l=a("6afc");n["a"].use(l["a"]);var d=a("1dce"),f=a.n(d);n["a"].use(f.a);var b=a("bb71");a("da64");n["a"].use(b["a"],{iconfont:"md"});var h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",{attrs:{id:"app"}},[a("the-navigation"),a("v-content",{attrs:{transition:"slide-x-transition"}},[a("router-view")],1),a("the-footer")],1)},m=[],p={name:"App",created:function(){this.setTitle()},methods:{setTitle:function(){document.title=this.$t("app.name")}}},v=p,g=a("2877"),j=a("6544"),y=a.n(j),w=a("7496"),k=a("549c"),x=Object(g["a"])(v,h,m,!1,null,"a6311242",null),_=x.exports;y()(x,{VApp:w["a"],VContent:k["a"]});a("4917");var O=a("a925");function S(){var e=a("2500"),t={};return e.keys().forEach(function(a){var n=a.match(/([A-Za-z0-9-_]+)\./i);if(n&&n.length>1){var s=n[1];t[s]=e(a)}}),t}n["a"].use(O["a"]);var E=new O["a"]({locale:"de",fallbackLocale:"en",messages:S()}),V=a("a18c"),L=a("4360"),T=a("9483");Object(T["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),n["a"].prototype.$eventHub=new n["a"],n["a"].config.productionTip=!1,new n["a"]({i18n:E,router:V["a"],store:L["b"],render:function(e){return e(_)}}).$mount("#app")},7672:function(e,t,a){"use strict";a.r(t);var n=a("f9da"),s=a.n(n);for(var r in n)"default"!==r&&function(e){a.d(t,e,function(){return n[e]})}(r);t["default"]=s.a},a18c:function(e,t,a){"use strict";a("7f7f");var n=a("2b0e"),s=a("8c4f"),r=a("4360");n["a"].use(s["a"]);var i=new s["a"]({routes:[{path:"/",redirect:{name:"login"}},{path:"/login",name:"login",component:function(){return Promise.all([a.e("chunk-bc018d0a"),a.e("chunk-37f41dab")]).then(a.bind(null,"a55b"))}},{path:"/home",name:"home",component:function(){return a.e("chunk-e0b341ee").then(a.bind(null,"bb51"))},meta:{authRequired:!0}},{path:"/more",name:"more",component:function(){return Promise.all([a.e("chunk-bc018d0a"),a.e("chunk-2d0d3c86")]).then(a.bind(null,"5dde"))},meta:{authRequired:!0}},{path:"*",redirect:{name:"login"}}]});i.beforeEach(function(e,t,a){e.matched.some(function(e){return e.meta.authRequired})?r["b"].getters[r["a"].User.getters.isAuthenticated]()?a():a({name:"login"}):"login"===e.name&&r["b"].getters[r["a"].User.getters.isAuthenticated]()?a({name:"home"}):a()}),t["a"]=i},aeea:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{"ma-0":"","pa-0":"",fluid:""}},[a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs5:""}},[a("v-card",{attrs:{flat:""}},[a("v-card-text",[a("div",[a("div",{staticClass:"subheading"},[e._v("\n              "+e._s(e.computedLabel)+"\n            ")]),a("span",{staticClass:"font-weight-light grey--text caption"},[e._v("\n              "+e._s(e.device)+"\n            ")])])])],1)],1),a("v-flex",[a("v-card",{attrs:{flat:""}},[a("v-card-text",{staticClass:"font-weight-light caption"},[a("div",[a("div",[e._v("\n              "+e._s(e.$t("units.temperature"))+" "+e._s(e.computedValue.temperature)+" °\n            ")]),a("div",[e._v("\n              "+e._s(e.$t("units.humidity"))+" "+e._s(e.computedValue.humidity)+" %\n            ")]),a("div",[e._v("\n              "+e._s(e.$t("units.pressure"))+" "+e._s(e.computedValue.pressure)+" Pa\n            ")]),a("div",[e._v("\n              "+e._s(e.$t("units.altitude"))+" "+e._s(e.computedValue.altitude)+" m\n            ")])])])],1)],1)],1),a("v-layout",{attrs:{row:""}},[a("v-flex",[a("div",{staticClass:"text-xs-center grey--text font-weight-light caption"},[e._v("\n        "+e._s(e.$t("app.panel.lastUpdate"))+" : "+e._s(e.computedLastUpdateDate)+"\n      ")])])],1)],1)},s=[],r=a("c1df"),i=a.n(r),o=a("4360"),c={name:"PanelHeader",props:{device:{type:String,required:!0},label:{type:String,required:!1,default:""}},computed:{computedLabel:function(){return""===this.label?this.device:this.label},computedValue:function(){return this.$store.getters[o["a"].BME280.getters.getValue](this.device)},computedLastUpdateDate:function(){return i()(this.computedValue.createdAt).format("LLL")}},created:function(){this.$store.dispatch(o["a"].BME280.actions.subscribeToValues,this.device)}},u=c,l=a("2877"),d=a("6544"),f=a.n(d),b=a("b0af"),h=a("99d9"),m=a("a523"),p=a("0e8f"),v=a("a722"),g=Object(l["a"])(u,n,s,!1,null,"59480f33",null);t["default"]=g.exports;f()(g,{VCard:b["a"],VCardText:h["b"],VContainer:m["a"],VFlex:p["a"],VLayout:v["a"]})},bb69:function(e){e.exports={app:{name:"Smart Sensor",login:{name:"Login",email:"Email",password:"Password",btn:"Login"},logout:{name:"Logout"},panel:{lastUpdate:"Last update"},more:{name:"Change senor labels",btn:"save"}},units:{temperature:"Temperature",humidity:"Humidity",pressure:"Pressure",altitude:"Altitude"},tabs:{last4hours:"Last 4h",last24hours:"Last 24h",last7days:"Last 7 days",last10:"Last 10"},validations:{emailRequired:"Email is required",emailValid:"Must be a valid email",passwordRequired:"Password is required",passwordMinLength:"Password must be at least {0} characters long"}}},edeb:function(e){e.exports={app:{name:"Smart Sensor",login:{name:"Anmelden",email:"Email",password:"Passwort",btn:"Anmelden"},logout:{name:"Abmelden"},panel:{lastUpdate:"Letzte Aktualisierung"},more:{name:"Sensor-Bezeichnung ändern",btn:"speichern"}},units:{temperature:"Temperatur",humidity:"Luftfeuchtigkeit",pressure:"Luftdruck",altitude:"Höhe"},tabs:{last4hours:"Letzte 4h",last24hours:"Letzte 24h",last7days:"Letzte 7d",last10:"Letzte 10"},validations:{emailRequired:"Email erforderlich",emailValid:"Email muss gültig sein",passwordRequired:"Passwort erforderlich",passwordMinLength:"Passwort erfordert mindestens {0} Zeichen"}}},f39b:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-toolbar",{attrs:{app:"",prominent:"",dark:"",color:"primary"}},[a("v-toolbar-title",{staticClass:"headline text-uppercase"},[a("span",[e._v("Smart ")]),a("span",{staticClass:"font-weight-light"},[e._v("\n      SENSOR\n    ")])]),a("v-spacer"),a("v-btn",{directives:[{name:"show",rawName:"v-show",value:"home"===e.$route.name,expression:"$route.name === 'home'"}],attrs:{flat:"",icon:""},on:{click:e.togglePanels}},[a("v-icon",[e._v(e._s(e.toggleIcon))])],1),a("v-btn",{directives:[{name:"show",rawName:"v-show",value:"more"===e.$route.name,expression:"$route.name === 'more'"}],attrs:{flat:"",icon:""},on:{click:e.home}},[a("v-icon",[e._v("chevron_left")])],1),a("v-btn",{directives:[{name:"show",rawName:"v-show",value:"home"===e.$route.name,expression:"$route.name === 'home'"}],attrs:{flat:"",icon:""},on:{click:e.more}},[a("v-icon",[e._v("more_vert")])],1)],1)},s=[],r=a("a18c"),i=a("4360"),o={name:"TheNavigation",data:function(){return{toggleIcon:"expand_more"}},created:function(){var e=this;this.$eventHub.$on("update:toggleIcon",function(t){e.toggleIcon=t})},beforeDestroy:function(){this.$eventHub.$off("update:toggleIcon")},methods:{togglePanels:function(){"expand_more"===this.toggleIcon?this.toggleIcon="expand_less":this.toggleIcon="expand_more",this.$eventHub.$emit("update:togglePanels")},home:function(){r["a"].push({name:"home"})},logout:function(){this.$store.dispatch(i["a"].User.actions.logout)},more:function(){r["a"].push({name:"more"})}}},c=o,u=a("2877"),l=a("6544"),d=a.n(l),f=a("8336"),b=a("132d"),h=a("9910"),m=a("71d9"),p=a("2a7f"),v=Object(u["a"])(c,n,s,!1,null,"69401968",null);t["default"]=v.exports;d()(v,{VBtn:f["a"],VIcon:b["a"],VSpacer:h["a"],VToolbar:m["a"],VToolbarTitle:p["a"]})},f9da:function(e,t){},ffe0:function(e,t,a){var n={"./PanelCharts.vue":"3418","./PanelHeader.vue":"aeea","./TheFooter.vue":"07a3","./TheNavigation.vue":"f39b"};function s(e){var t=r(e);return a(t)}function r(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}s.keys=function(){return Object.keys(n)},s.resolve=r,e.exports=s,s.id="ffe0"}});
//# sourceMappingURL=app.5307e5a8.js.map