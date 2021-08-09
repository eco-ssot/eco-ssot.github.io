(this["webpackJsonpeco-ssot-frontend"]=this["webpackJsonpeco-ssot-frontend"]||[]).push([[0],{229:function(e,t,a){var r=a(133);delete r.lightBlue,e.exports={purge:["./src/**/*.{js,jsx,ts,tsx}","./public/index.html"],darkMode:"media",theme:{colors:r,extend:{colors:{primary:r.teal,header:"#30494D",panel:"#203033",divider:"#707070"},height:{18:"4.5rem","1/2":"50%","1/3":"33.33%","2/3":"66.67%","1/4":"25%","2/4":"50%","3/4":"75%","1/5":"20%","2/5":"40%","3/5":"60%","4/5":"80%","1/6":"16.67%","2/6":"33.33%","3/6":"50%","4/6":"66.67%","5/6":"83.33%",header:"4rem",page:"calc(100vh - 4rem)","page-panel":"calc(100vh - 6rem)"},padding:{18:"4.5rem"},borderRadius:{"1/2":"50%"},minWidth:{1:"0.25rem",2:"0.5rem",3:"0.75rem",4:"1rem"},minHeight:{1:"0.25rem",2:"0.5rem",3:"0.75rem",4:"1rem",page:"calc(100vh - 4rem)","page-panel":"calc(100vh - 6rem)"}}},variants:{extend:{}},plugins:[]}},506:function(e,t,a){},507:function(e,t,a){"use strict";a.r(t);var r=a(0),l=a.n(r),i=a(89),c=a.n(i),n=a(21),s=a(514),o=a(46),d=a(13),u=a(6),j=a(232),b=a(4),m=a(1);function h(e){var t=e.className,a=e.children;return Object(m.jsx)("div",{className:"min-h-page h-auto w-full p-4",children:Object(m.jsx)("div",{className:Object(b.a)("bg-panel rounded min-h-page-panel h-auto p-4 space-y-4",t),children:a})})}function x(e){var t=e.children,a=e.className,r=e.to,l=e.title,i=void 0===l?null:l,c=e.subtitle,n=void 0===c?null:c;return Object(m.jsxs)("div",{className:Object(b.a)("bg-panel rounded shadow p-4 h-full",a),children:[Object(m.jsxs)("div",{className:"h-1/6 flex justify-between",children:[Object(m.jsx)(o.b,{className:"text-gray-200 hover:text-white",to:r,children:i}),n]}),Object(m.jsx)("div",{className:"h-5/6",children:t})]})}var f=a(138);function v(e){var t=e.className,a=e.direction,r=void 0===a?null:a;return null===r?null:"up"===r?Object(m.jsx)(f.b,{className:Object(b.a)("transform rotate-45",t)}):Object(m.jsx)(f.a,{className:Object(b.a)("transform -rotate-45",t)})}var p=[{title:"\u7528\u96fb\u91cf",unit:"(\u5ea6)",overall:"10%",direction:"down",color:"text-green-500",data:[{key:2020,value:100},{key:2021,value:90}]},{title:"\u71df\u696d\u984d",unit:"(\u5341\u5104\u81fa\u5e63)",overall:"10%",direction:"down",color:"text-green-500",data:[{key:2020,value:100},{key:2021,value:90}]},{title:"\u7528\u6c34\u91cf",unit:"(M\xb3)",overall:"10%",direction:"up",color:"text-red-500",data:[{key:2020,value:90},{key:2021,value:100}]},{title:"\u592a\u967d\u80fd\u767c\u96fb\u91cf",unit:"(\u5ea6)",overall:"10%",direction:"up",color:"text-green-500",data:[{key:2020,value:100},{key:2021,value:90}]},{title:"\u7e3d\u7bc0\u96fb\u91cf",unit:"(\u5ea6)",overall:"210",direction:null,color:null,data:[{key:"\u6578\u4f4d\u5316",value:100},{key:"\u6280\u6539\u53ca\u7ba1\u7406",value:110}]}];function O(e){var t=e.className;return Object(m.jsx)("div",{className:Object(b.a)("grid grid-cols-5 h-full w-full divide-x divide-gray-500",t),children:p.map((function(e){var t=e.title,a=e.unit,r=e.overall,l=e.direction,i=e.color,c=e.data;return Object(m.jsxs)("div",{className:"h-full px-4",children:[Object(m.jsxs)("div",{className:"h-1/6",children:[t," ",a]}),Object(m.jsxs)("div",{className:"flex h-1/2 items-center justify-center",children:[Object(m.jsx)(v,{className:"w-1/4 h-3/4 ".concat(i),direction:l}),Object(m.jsx)("div",{className:"text-4xl ".concat(i),children:r})]}),Object(m.jsx)("div",{className:"grid items-center h-1/4 ring-1 ring-primary-500 rounded px-4 divide-x divide-primary-500 grid-cols-2",children:c.map((function(e){var t=e.key,a=e.value;return Object(m.jsxs)("div",{className:"flex justify-around w-full h-3/4 items-center",children:[Object(m.jsx)("div",{className:"text-gray-400",children:t}),Object(m.jsx)("div",{className:"text-2xl",children:a})]},t)}))})]},t)}))})}var y=a(36),g=a(513),w=a(11),N=a.n(w);a(302),a(320),a(327),a(338),a(344),a(355),a(356);function k(e){var t=e.className,a=e.option,l=void 0===a?{}:a,i=Object(g.a)(),c=Object(y.a)(i,2),n=c[0],s=c[1],o=s.width,d=s.height,u=Object(r.useRef)();return Object(r.useEffect)((function(){var e={dispose:function(){}};return o>0&&d>0&&(e=N.a.init(u.current)).setOption(l),function(){return e.dispose()}}),[u,l,o,d]),Object(m.jsx)("div",{ref:n,className:Object(b.a)("w-96 h-96",t),children:Object(m.jsx)("div",{ref:u,style:{width:o,height:d}})})}var S=a(228),C=a.n(S),L=a(229),B=a.n(L),P=C()(B.a).theme.colors;function W(e){var t=e.className,a=e.dotClassName,r=e.labelClassName,l=e.label;return Object(m.jsxs)("div",{className:Object(b.a)("flex items-center space-x-2",t),children:[Object(m.jsx)("div",{className:Object(b.a)("min-h-3 min-w-3 rounded-1/2",a)}),Object(m.jsx)("div",{className:Object(b.a)(r),children:l})]})}var T=a(137),R=a.n(T);function A(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.separator,r=void 0===a?",":a,l=t.symbol,i=void 0===l?"":l,c=t.precision,n=void 0===c?0:c,s=t.unit,o=void 0===s?1:s,d=t.suffix,u=void 0===d?"":d,j=t.defaultValue,b=void 0===j?"-":j;try{var m=R()(e,{errorOnInvalid:!0});return"".concat(R()(m.divide(o),{separator:r,symbol:i,precision:n,errorOnInvalid:!0}).format()).concat(u)}catch(h){return b}}var H={xAxis:{type:"category",data:["2016","2020","2021"],axisTick:{show:!1},axisLine:{lineStyle:{color:P.primary[500]}},axisLabel:{color:"#fff"}},yAxis:{type:"value",splitLine:{show:!1},axisLine:{show:!1}},series:[{data:[{value:311265,itemStyle:{color:P.yellow[500],barBorderRadius:[4,4,0,0]}},{value:295172,itemStyle:{color:P.blue[500],barBorderRadius:[4,4,0,0]}},{value:78763,itemStyle:{color:P.green[500],barBorderRadius:[4,4,0,0]}}],type:"bar",barWidth:32,label:{show:!0,position:"top",color:"#fff",formatter:function(e){return A(e.value)}},animationDuration:2e3}],grid:{top:16,bottom:24,left:16,right:32,containerLabel:!0}};function D(){var e=Object(u.a)({},H);return Object(m.jsxs)("div",{className:"flex w-full h-full items-center justify-around",children:[Object(m.jsx)(k,{className:"flex w-3/5 h-full",option:e}),Object(m.jsxs)("div",{className:"flex flex-col h-full justify-center items-start space-y-4",children:[Object(m.jsx)(W,{dotClassName:"bg-yellow-500",label:"\u57fa\u6e96\u5e74"}),Object(m.jsx)(W,{dotClassName:"bg-gray-300",label:"\u7da0\u8b49"}),Object(m.jsx)(W,{dotClassName:"bg-orange-500",label:"Target : \u5c0d\u6bd4\u57fa\u6e96\u5e74 -21%"}),Object(m.jsx)("div",{children:"\u55ae\u4f4d\uff1a\u516c\u5678"})]})]})}var E={xAxis:{type:"category",data:["2016 Total","2020 1-6\u6708","2021 1-6\u6708"],axisTick:{show:!1},axisLine:{lineStyle:{color:P.primary[500]}},axisLabel:{color:"#fff"}},yAxis:{type:"value",splitLine:{show:!1},axisLine:{show:!1}},series:[{data:[{value:110,itemStyle:{color:P.blue[500],barBorderRadius:[4,4,0,0]}},{value:90,itemStyle:{color:P.emerald[700],barBorderRadius:[4,4,0,0]}},{value:60,itemStyle:{color:P.green[500],barBorderRadius:[4,4,0,0]}}],type:"bar",barWidth:32,label:{show:!0,position:"top",color:"#fff"},animationDuration:2e3,markLine:{data:[{yAxis:100}],symbol:"none",lineStyle:{color:P.orange[500]}}}],grid:{top:16,bottom:24,left:16,right:32,containerLabel:!0}};function F(){var e=Object(u.a)({},E);return Object(m.jsxs)("div",{className:"flex w-full h-full items-center justify-around",children:[Object(m.jsx)(k,{className:"w-3/5 h-full",option:e}),Object(m.jsxs)("div",{className:"flex flex-col h-full justify-center items-start space-y-4",children:[Object(m.jsx)(W,{dotClassName:"bg-orange-500",label:"Target : \u5c0d\u6bd4\u53bb\u5e74 -2%"}),Object(m.jsx)("div",{children:"\u55ae\u4f4d\uff1a\u5ea6/\u5341\u5104\u81fa\u5e63"})]})]})}var M={tooltip:{show:!1},legend:{show:!1},series:[{type:"pie",radius:["70%","90%"],avoidLabelOverlap:!1,center:["50%","50%"],label:{show:!1,position:"center"},labelLine:{show:!1},data:[{value:49,name:"\u4e0d\u53ef\u518d\u751f\u80fd\u6e90",itemStyle:{color:P.blue[500]}},{value:2,name:"\u81ea\u5efa\u592a\u967d\u80fd",itemStyle:{color:P.yellow[500]}},{value:49,name:"\u96fb\u7db2\u5305\u542b",itemStyle:{color:P.green[500]}},{value:0,name:"\u7da0\u8b49",itemStyle:{color:P.gray[300]}}]}],grid:{top:16,bottom:24,left:16,right:0,containerLabel:!0}};function I(){var e=Object(u.a)({},M);return Object(m.jsxs)("div",{className:"flex w-full h-full items-center justify-between",children:[Object(m.jsxs)("div",{className:"w-1/2 h-full flex items-center justify-center",children:[Object(m.jsx)(k,{className:"w-full h-full",option:e}),Object(m.jsxs)("div",{className:"absolute text-center",children:[Object(m.jsx)("div",{children:"Target:"}),Object(m.jsx)("div",{children:"\u53ef\u518d\u751f\u80fd\u6e90 > 60%"})]})]}),Object(m.jsxs)("div",{className:"flex flex-col px-8 justify-center w-1/2 space-y-4",children:[Object(m.jsx)(W,{dotClassName:"bg-blue-500",labelClassName:"flex w-4/5 justify-between",label:Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("div",{children:"\u4e0d\u53ef\u518d\u751f\u80fd\u6e90"}),Object(m.jsx)("div",{children:"49%"})]})}),Object(m.jsx)(W,{dotClassName:"bg-yellow-500",labelClassName:"flex w-4/5 justify-between",label:Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("div",{children:"\u81ea\u5efa\u592a\u967d\u80fd"}),Object(m.jsx)("div",{children:"2%"})]})}),Object(m.jsx)(W,{dotClassName:"bg-green-500",labelClassName:"flex w-4/5 justify-between",label:Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("div",{children:"\u96fb\u7db2\u5305\u542b"}),Object(m.jsx)("div",{children:"49%"})]})}),Object(m.jsx)(W,{dotClassName:"bg-gray-300",labelClassName:"flex w-4/5 justify-between",label:Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("div",{children:"\u7da0\u8b49"}),Object(m.jsx)("div",{children:"0%"})]})})]})]})}var G={xAxis:{type:"category",data:["2016 Total","2020 1-6\u6708","2021 1-6\u6708"],axisTick:{show:!1},axisLine:{lineStyle:{color:P.primary[500]}},axisLabel:{color:"#fff"}},yAxis:{type:"value",splitLine:{show:!1},axisLine:{show:!1}},series:[{data:[{value:111,itemStyle:{color:P.blue[500],barBorderRadius:[4,4,0,0]}},{value:90,itemStyle:{color:P.emerald[700],barBorderRadius:[4,4,0,0]}},{value:60,itemStyle:{color:P.green[500],barBorderRadius:[4,4,0,0]}}],type:"bar",barWidth:32,label:{show:!0,position:"top",color:"#fff"},animationDuration:2e3,markLine:{data:[{yAxis:100}],symbol:"none",lineStyle:{color:P.orange[500]}}}],grid:{top:16,bottom:24,left:16,right:32,containerLabel:!0}};function Q(){var e=Object(u.a)({},G);return Object(m.jsxs)("div",{className:"flex w-full h-full items-center justify-around",children:[Object(m.jsx)(k,{className:"w-3/5 h-full",option:e}),Object(m.jsxs)("div",{className:"flex flex-col h-full justify-center items-start space-y-4",children:[Object(m.jsx)(W,{dotClassName:"bg-orange-500",label:"Target : \u5c0d\u6bd4\u53bb\u5e74 -1%"}),Object(m.jsx)("div",{children:"\u55ae\u4f4d\uff1a\u5ea6/\u81fa"})]})]})}var q={xAxis:{type:"category",data:["2018 Total","2021 1-6\u6708"],axisTick:{show:!1},axisLine:{lineStyle:{color:P.primary[500]}},axisLabel:{color:"#fff"}},yAxis:{type:"value",splitLine:{show:!1},axisLine:{show:!1}},series:[{data:[{value:51.43,itemStyle:{color:P.yellow[500],barBorderRadius:[4,4,0,0]}},{value:53.76,itemStyle:{color:P.green[500],barBorderRadius:[4,4,0,0]}}],type:"bar",barWidth:32,label:{show:!0,position:"top",color:"#fff"},animationDuration:2e3,markLine:{data:[{yAxis:50.4}],symbol:"none",lineStyle:{color:P.orange[500]}}}],grid:{top:16,bottom:24,left:16,right:32,containerLabel:!0}};function z(){var e=Object(u.a)({},q);return Object(m.jsxs)("div",{className:"flex w-full h-full items-center justify-around",children:[Object(m.jsx)(k,{className:"w-3/5 h-full",option:e}),Object(m.jsxs)("div",{className:"flex flex-col h-full justify-center items-start space-y-4",children:[Object(m.jsx)(W,{dotClassName:"bg-yellow-500",label:"\u57fa\u6e96\u5e74"}),Object(m.jsx)(W,{dotClassName:"bg-orange-500",label:"Target : \u5c0d\u6bd4\u57fa\u6e96\u5e74 -6%"}),Object(m.jsx)("div",{children:"\u55ae\u4f4d\uff1a\u516c\u5678/\u5341\u5104\u81fa\u5e63"})]})]})}var U={xAxis:{type:"category",data:["2016 Total","2020 Total","2020 1-6\u6708","2021 1-6\u6708"],axisTick:{show:!1},axisLine:{lineStyle:{color:P.primary[500]}},axisLabel:{color:"#fff"}},yAxis:{type:"value",splitLine:{show:!1},axisLine:{show:!1}},series:[{data:[{value:111,itemStyle:{color:P.yellow[500],barBorderRadius:[4,4,0,0]}},{value:100,itemStyle:{color:P.blue[500],barBorderRadius:[4,4,0,0]}},{value:90,itemStyle:{color:P.emerald[700],barBorderRadius:[4,4,0,0]}},{value:70,itemStyle:{color:P.green[500],barBorderRadius:[4,4,0,0]}}],type:"bar",barWidth:32,label:{show:!0,position:"top",color:"#fff"},animationDuration:2e3,markLine:{data:[{yAxis:80}],symbol:"none",lineStyle:{color:P.orange[500]}}}],grid:{top:16,bottom:24,left:16,right:32,containerLabel:!0}};function J(){var e=Object(u.a)({},U);return Object(m.jsxs)("div",{className:"flex w-full h-full items-center justify-around",children:[Object(m.jsx)(k,{className:"w-3/5 h-full",option:e}),Object(m.jsxs)("div",{className:"flex flex-col h-full justify-center items-start space-y-4",children:[Object(m.jsx)(W,{dotClassName:"bg-yellow-500",label:"\u57fa\u6e96\u5e74"}),Object(m.jsx)(W,{dotClassName:"bg-orange-500",label:"Target : \u5c0d\u6bd4\u57fa\u6e96\u5e74 -6%"}),Object(m.jsx)("div",{children:"\u55ae\u4f4d\uff1a\u516c\u5678/\u5341\u5104\u81fa\u5e63"})]})]})}function V(e){var t=e.className,a=e.children;return Object(m.jsx)("div",{className:Object(b.a)("flex h-8 pt-1 rounded shadow px-2 bg-primary-900 border-l-4 border-primary-600",t),children:a})}var Z=a(95);function K(e){var t=e.className,a=e.options,l=void 0===a?[]:a,i=e.defaultValue,c=void 0===i?l[0]||{}:i,n=Object(r.useState)(c),s=Object(y.a)(n,2),o=s[0],d=s[1];return Object(m.jsx)("div",{className:Object(b.a)("relative z-0 inline-flex shadow-sm rounded-md",t),children:l.map((function(e,t){var a=e.label,r=e.key,i=void 0===r?a:r;return Object(m.jsx)("button",{type:"button",className:Object(b.a)("relative inline-flex items-center px-4 py-2 border border-header bg-transparent text-sm font-medium text-gray-50",0===t&&"rounded-r-none",t===l.length-1&&"rounded-l-none",o.label===a&&"bg-header"),onClick:function(){return d({label:a,key:i})},children:a},i)}))})}var X=a(230),$=function(){return{}};function Y(e){var t=e.columns,a=void 0===t?[]:t,r=e.data,l=void 0===r?[]:r,i=e.getHeaderProps,c=void 0===i?$:i,n=e.getColumnProps,s=void 0===n?$:n,o=e.getRowProps,d=void 0===o?$:o,j=e.getCellProps,h=void 0===j?$:j,x=Object(X.useTable)({columns:a,data:l}),f=x.getTableProps,v=x.getTableBodyProps,p=x.headerGroups,O=x.rows,y=x.prepareRow;return Object(m.jsx)("div",{className:"flex flex-col shadow overflow-auto rounded-t-lg",children:Object(m.jsxs)("table",Object(u.a)(Object(u.a)({},f()),{},{className:"min-w-full divide-y divide-gray-200",children:[Object(m.jsx)("thead",{className:"bg-header",children:p.map((function(e){return Object(m.jsx)("tr",Object(u.a)(Object(u.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(m.jsx)("th",Object(u.a)(Object(u.a)({},e.getHeaderProps([{className:Object(b.a)("px-6 py-3 text-center font-medium text-white uppercase tracking-wider",e.className),style:e.style},s(e),c(e)])),{},{children:e.render("Header")}))}))}))}))}),Object(m.jsx)("tbody",Object(u.a)(Object(u.a)({},v()),{},{className:"bg-transparent",children:O.map((function(e){return y(e),Object(m.jsx)("tr",Object(u.a)(Object(u.a)({},e.getRowProps(d(e))),{},{children:e.cells.map((function(e){return Object(m.jsx)("td",Object(u.a)(Object(u.a)({},e.getCellProps([{className:Object(b.a)("px-6 py-4 text-center whitespace-nowrap text-gray-50",e.column.className),style:e.column.style},s(e.column),h(e)])),{},{children:e.render("Cell")}))}))}))}))}))]}))})}var _=function(e){return A(e.value)},ee=function(e){return A(e.value,{unit:.01,suffix:"%"})},te=[{Header:"Site",accessor:"site"}].concat(Object(Z.a)([{key:"electricity",name:"\u7528\u96fb\u91cf (\u5ea6)"},{key:"water",name:"\u7528\u6c34\u91cf (M\xb3)"},{key:"revenue",name:"\u71df\u696d\u984d (\u5341\u5104\u81fa\u5e63)"},{key:"asp",name:"ASP (\u5341\u5104\u81fa\u5e63/\u767e\u842c\u53f0)"}].map((function(e){var t=e.key;return{Header:e.name,columns:[{id:[t,2020].join(),Header:"2020\u5e74",accessor:[t,2020].join("."),className:"text-right",Cell:_},{id:[t,2021].join(),Header:"2021\u5e74",accessor:[t,2021].join("."),className:"text-right",Cell:_},{id:[t,"weight"].join(),Header:"\u6b0a\u91cd",accessor:[t,"weight"].join("."),className:"text-right",Cell:ee},{id:[t,"delta"].join(),Header:"\u589e\u6e1b\u7387 *",accessor:[t,"delta"].join("."),className:"text-right",Cell:ee}]}})))),ae=[{site:"WNH",electricity:{2020:13209805,2021:15507280,weight:.11,delta:.17},water:{2020:169416,2021:199831,weight:.13,delta:.18},revenue:{2020:28.7,2021:39.3,weight:.14,delta:.37},asp:{2020:8.4,2021:7.6,weight:.09,delta:-.1}},{site:"WHC",electricity:{2020:13209805,2021:15507280,weight:.11,delta:.17},water:{2020:169416,2021:199831,weight:.13,delta:.18},revenue:{2020:28.7,2021:39.3,weight:.14,delta:.37},asp:{2020:8.4,2021:7.6,weight:.09,delta:-.1}},{site:"WIH",electricity:{2020:13209805,2021:15507280,weight:.11,delta:.17},water:{2020:169416,2021:199831,weight:.13,delta:.18},revenue:{2020:28.7,2021:39.3,weight:.14,delta:.37},asp:{2020:8.4,2021:7.6,weight:.09,delta:-.1}},{site:"WKS",electricity:{2020:13209805,2021:15507280,weight:.11,delta:.17},water:{2020:169416,2021:199831,weight:.13,delta:.18},revenue:{2020:28.7,2021:39.3,weight:.14,delta:.37},asp:{2020:8.4,2021:7.6,weight:.09,delta:-.1}},{site:"WZS",electricity:{2020:13209805,2021:15507280,weight:.11,delta:.17},water:{2020:169416,2021:199831,weight:.13,delta:.18},revenue:{2020:28.7,2021:39.3,weight:.14,delta:.37},asp:{2020:8.4,2021:7.6,weight:.09,delta:-.1}},{site:"WCQ",electricity:{2020:13209805,2021:15507280,weight:.11,delta:.17},water:{2020:169416,2021:199831,weight:.13,delta:.18},revenue:{2020:28.7,2021:39.3,weight:.14,delta:.37},asp:{2020:8.4,2021:7.6,weight:.09,delta:-.1}},{site:"WCD",electricity:{2020:13209805,2021:15507280,weight:.11,delta:.17},water:{2020:169416,2021:199831,weight:.13,delta:.18},revenue:{2020:28.7,2021:39.3,weight:.14,delta:.37},asp:{2020:8.4,2021:7.6,weight:.09,delta:-.1}},{site:"WMX",electricity:{2020:13209805,2021:15507280,weight:.11,delta:.17},water:{2020:169416,2021:199831,weight:.13,delta:.18},revenue:{2020:28.7,2021:39.3,weight:.14,delta:.37},asp:{2020:8.4,2021:7.6,weight:.09,delta:-.1}},{site:"WCZ",electricity:{2020:13209805,2021:15507280,weight:.11,delta:.17},water:{2020:169416,2021:199831,weight:.13,delta:.18},revenue:{2020:28.7,2021:39.3,weight:.14,delta:.37},asp:{2020:8.4,2021:7.6,weight:.09,delta:-.1}},{footer:!0,site:"Total",electricity:{2020:13209805,2021:15507280,weight:.11,delta:.17},water:{2020:169416,2021:199831,weight:.13,delta:.18},revenue:{2020:28.7,2021:39.3,weight:.14,delta:.37},asp:{2020:8.4,2021:7.6,weight:.09,delta:-.1}}];var re=[{path:"/home",title:"\u9996\u9801",component:function(){return Object(m.jsxs)("div",{className:"grid grid-rows-3 grid-cols-3 p-4 pt-20 -mt-16 gap-4 h-screen w-screen overflow-hidden",children:[Object(m.jsx)(x,{className:"row-span-1 col-span-3",title:"\u5404\u6578\u503c Overview",to:"/overview",subtitle:Object(m.jsx)(V,{children:"\u7d2f\u8a08\u5340\u9593\uff1a2021.01 - 06"}),children:Object(m.jsx)(O,{})}),Object(m.jsx)(x,{className:"row-span-1 col-span-1",title:"\u78b3\u6392\u653e\u91cf",to:"/carbon",children:Object(m.jsx)(D,{})}),Object(m.jsx)(x,{className:"row-span-1 col-span-1",title:"\u53ef\u518d\u751f\u80fd\u6e90\u5360\u6bd4",to:"/renewable-energy",children:Object(m.jsx)(I,{})}),Object(m.jsx)(x,{className:"row-span-1 col-span-1",title:"\u7528\u96fb\u5f37\u5ea6",to:"/electricity",children:Object(m.jsx)(F,{})}),Object(m.jsx)(x,{className:"row-span-1 col-span-1",title:"\u5ee2\u68c4\u7269\u7522\u751f\u5bc6\u5ea6",to:"/waste",children:Object(m.jsx)(z,{})}),Object(m.jsx)(x,{className:"row-span-1 col-span-1",title:"\u7528\u6c34\u5f37\u5ea6",to:"/water",children:Object(m.jsx)(J,{})}),Object(m.jsx)(x,{className:"row-span-1 col-span-1",title:"\u55ae\u81fa\u7528\u96fb",to:"/unit-electricity",children:Object(m.jsx)(Q,{})})]})}},{path:"/overview",title:"\u7e3d\u89bd\u6bd4\u8f03",component:function(){var e=Object(r.useMemo)((function(){return te}),[]),t=Object(r.useMemo)((function(){return ae}),[]);return Object(m.jsxs)(h,{children:[Object(m.jsx)("div",{children:"\u7528\u96fb\u3001\u7528\u6c34\u3001\u71df\u6536\u53caASP\u6bd4\u8f03"}),Object(m.jsxs)("div",{className:"flex flex-col w-full justify-center items-center space-y-4",children:[Object(m.jsx)(K,{options:[{label:"\u7576\u5e74\u5ea6"},{label:"\u6b77\u53f2\u5e74\u5ea6"}]}),Object(m.jsx)("div",{className:"w-full",children:Object(m.jsx)(Y,{columns:e,data:t,getRowProps:function(e){return{className:e.original.footer?"border-b-2 border-t-2 border-primary-500 font-bold":"border-b border-gray-400"}}})})]})]})}},{path:"/carbon",title:"\u78b3\u6392\u653e\u91cf",component:function(){return Object(m.jsx)(h,{children:"CarbonPage"})}},{path:"/renewable-energy",title:"\u53ef\u518d\u751f\u80fd\u6e90",component:function(){return Object(m.jsx)(h,{children:"RenewableEnergyPage"})}},{path:"/electricity",title:"\u7528\u96fb\u5f37\u5ea6",component:function(){return Object(m.jsx)(h,{children:"ElectricityPage"})}},{path:"/waste",title:"\u5ee2\u68c4\u7269\u7522\u751f",component:function(){return Object(m.jsx)(h,{children:"UnitElectricity"})}},{path:"/water",title:"\u7528\u6c34\u5f37\u5ea6",component:function(){return Object(m.jsx)(h,{children:"WastePage"})}},{path:"/unit-electricity",title:"\u55ae\u81fa\u7528\u96fb",component:function(){return Object(m.jsx)(h,{children:"WaterPage"})}}];function le(e){var t=e.className,a=Object(d.g)().pathname;return Object(m.jsx)("div",{className:Object(b.a)("flex flex-grow space-x-4",t),children:re.map((function(e){var t=e.path,r=e.title;return Object(m.jsx)("div",{className:a===t?"border-primary-500 text-white inline-flex items-center px-1 pt-1 border-b-2":"border-b-2 border-header text-gray-300 hover:text-gray-100 inline-flex items-center px-1 pt-1",children:Object(m.jsx)(o.b,{to:t,className:"text-current text-lg font-medium",children:r})},t)}))})}function ie(e){var t=e.className;return Object(m.jsx)("div",{className:Object(b.a)("h-4 mx-4 border-0 border-r border-gray-500",t)})}var ce=a(511),ne=a(512),se=a(139);function oe(e){var t=e.className,a=e.options,l=void 0===a?[]:a,i=Object(r.useState)(l[0]||{}),c=Object(y.a)(i,2),n=c[0],s=c[1];return Object(m.jsx)(ce.a,{value:n,onChange:s,children:function(e){var a=e.open;return Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)("div",{className:Object(b.a)("mt-1 relative",t),children:[Object(m.jsxs)(ce.a.Button,{className:Object(b.a)("bg-transparent relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 hover:border-primary-500 sm:text-sm",a?"border-primary-500":"border-header"),children:[Object(m.jsx)("span",{className:"block truncate text-lg",children:n.value}),Object(m.jsx)("span",{className:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",children:Object(m.jsx)(se.b,{className:"h-5 w-5 text-gray-400","aria-hidden":"true"})})]}),Object(m.jsx)(ne.a,{show:a,as:r.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:Object(m.jsx)(ce.a.Options,{static:!0,className:"absolute z-10 mt-1 w-full bg-panel shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto border border-gray-300 focus:outline-none sm:text-sm",children:l.map((function(e){return Object(m.jsx)(ce.a.Option,{className:function(e){var t=e.active;return Object(b.a)(t?"text-white bg-primary-600":"text-gray-900 dark:text-gray-50","cursor-default select-none relative py-2 pl-3 pr-9")},value:e,children:function(t){var a=t.selected,r=t.active;return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("span",{className:Object(b.a)(a?"font-semibold":"font-normal","block truncate"),children:e.value}),a?Object(m.jsx)("span",{className:Object(b.a)(r?"text-white":"text-primary-600","absolute inset-y-0 right-0 flex items-center pr-4"),children:Object(m.jsx)(se.a,{className:"h-5 w-5","aria-hidden":"true"})}):null]})}},e.key)}))})})]})})}})}var de=a(510);function ue(e){var t=e.className,a=Object(r.useState)(new Date),l=Object(y.a)(a,2),i=l[0],c=l[1];return Object(r.useEffect)((function(){var e=setInterval((function(){return c(new Date)}),1e3);return function(){clearInterval(e)}}),[]),Object(m.jsx)("div",{className:Object(b.a)(t),children:Object(de.a)(i,"yyyy\u5e74 MM\u6708 dd\u65e5 HH:mm")})}var je=a(134),be=a(94),me=a(20),he=Object(be.a)({reducerPath:"weatherApi",baseQuery:Object(me.d)({baseUrl:"https://api.openweathermap.org/data/2.5/"}),endpoints:function(e){return{getWeatherById:e.query({query:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"1668338";return"weather?id=".concat(e,"&appid=12e58ba7c668780614ff867c4d0d91c3&units=metric")}})}}}),xe=he.useGetWeatherByIdQuery;function fe(){var e=Object(r.useState)({}),t=Object(y.a)(e,2),a=t[0],l=t[1],i=xe().data;return Object(r.useEffect)((function(){var e=Object(je.get)(i,"main");e&&l(e)}),[i]),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("div",{children:["\u6eab\u5ea6\uff1a",A(a.temp)," \xbaC"]}),Object(m.jsxs)("div",{children:["\u6fd5\u5ea6\uff1a",A(a.humidity)," %"]})]})}function ve(e){var t=e.className;return Object(m.jsxs)("div",{className:Object(b.a)("flex h-16 px-4 bg-header shadow-lg items-center z-10",t),children:[Object(m.jsx)("div",{className:"font-medium text-2xl",children:"ESG \u7e3e\u6548\u7ba1\u7406\u5e73\u53f0"}),Object(m.jsx)(ie,{className:"h-1/2"}),Object(m.jsx)(oe,{className:"w-28",options:[{key:"WT",value:"WT"},{key:"WSD",value:"WSD"},{key:"ALL",value:"ALL"}]}),Object(m.jsx)(ie,{className:"h-1/2"}),Object(m.jsx)(le,{}),Object(m.jsx)(ie,{className:"h-1/2"}),Object(m.jsxs)("div",{className:"flex space-x-4",children:[Object(m.jsx)(ue,{}),Object(m.jsx)(fe,{})]})]})}function pe(e){var t=e.children;return Object(m.jsxs)("div",{className:"dark:bg-gray-900 dark:text-gray-50",children:[Object(m.jsx)(ve,{}),t]})}var Oe=["location","component"];function ye(e){e.location;var t=e.component,a=Object(j.a)(e,Oe);return Object(m.jsx)(d.b,Object(u.a)(Object(u.a)({},a),{},{render:function(e){return Object(m.jsx)(pe,{match:e.match,children:Object(m.jsx)(t,Object(u.a)({},e))})}}))}function ge(){return Object(m.jsx)("div",{children:"LoginPage"})}function we(){return Object(m.jsx)(o.a,{children:Object(m.jsxs)(d.d,{children:[re.map((function(e){var t=e.path,a=e.component;return Object(m.jsx)(ye,{exact:!0,path:t,component:a},t)})),Object(m.jsx)(d.b,{path:"/login",component:ge}),Object(m.jsx)(d.a,{from:"/",to:"/home"})]})})}function Ne(){return Object(s.a)((function(){document.documentElement.classList.add("dark")})),Object(m.jsx)(we,{})}var ke=a(68),Se=a(3),Ce=Object(be.a)({reducerPath:"pokemonApi",baseQuery:Object(me.d)({baseUrl:"https://pokeapi.co/api/v2/"}),endpoints:function(e){return{getPokemonByName:e.query({query:function(e){return"pokemon/".concat(e)}})}}}),Le=(Ce.useGetPokemonByNameQuery,a(92)),Be=a.n(Le),Pe=a(231);function We(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return new Promise((function(t){return setTimeout((function(){return t({data:e})}),500)}))}var Te,Re=Object(Se.c)("counter/fetchCount",function(){var e=Object(Pe.a)(Be.a.mark((function e(t){var a;return Be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,We(t);case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ae=Object(Se.d)({name:"counter",initialState:{value:0,status:"idle"},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}},extraReducers:function(e){e.addCase(Re.pending,(function(e){e.status="loading"})).addCase(Re.fulfilled,(function(e,t){e.status="idle",e.value+=t.payload}))}}),He=Ae.actions,De=(He.increment,He.decrement,He.incrementByAmount,Ae.reducer),Ee=Object(Se.a)({reducer:(Te={counter:De},Object(ke.a)(Te,Ce.reducerPath,Ce.reducer),Object(ke.a)(Te,he.reducerPath,he.reducer),Te),middleware:function(e){return[].concat(Object(Z.a)(e()),[Ce.middleware,he.middleware])}});Object(me.e)(Ee.dispatch);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(506);c.a.render(Object(m.jsx)(l.a.StrictMode,{children:Object(m.jsx)(n.a,{store:Ee,children:Object(m.jsx)(Ne,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})),console.log=function(){}}},[[507,1,2]]]);
//# sourceMappingURL=main.46117b79.chunk.js.map