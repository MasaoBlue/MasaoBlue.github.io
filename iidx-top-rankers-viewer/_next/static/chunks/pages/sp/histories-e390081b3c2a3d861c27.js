(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[482],{20144:function(e,n,r){"use strict";r.r(n),r.d(n,{SpHistoriesPage:function(){return I},default:function(){return F}});var t=r(85893),a=r(65558),i=r(60329),u=r(99409),o=r(47125),c=r(8656),s=r.n(c),d=function(){var e=function(e,n){return function(r,a){var i="function"===typeof n?n(a):n;return{children:(0,t.jsx)("div",{children:(0,u.Q2)(e(a))}),props:i}}};return[{dataIndex:"version",title:"ver",defaultSortOrder:"descend",sorter:(0,u.RO)((function(e){return e.version.num})),render:e((function(e){return e.version.shortName})),className:s().version,width:"7em"},{dataIndex:"title",title:"title",sorter:(0,u.RO)((function(e){return e.title})),render:e((function(e){return e.title})),defaultSortOrder:"ascend",width:"13em",className:s().title},{dataIndex:"difficulty",title:"dif",sorter:function(e,n){return(0,i.E)(e.difficulty.num,n.difficulty.num)},render:e((function(e){return e.difficulty.shortName}),(function(e){return{className:s()[e.difficulty.name]}})),width:"3em",className:s().difficulty},{dataIndex:"level",title:"Lv",sorter:(0,u.RO)((function(e){return e.level})),render:e((function(e){return e.level})),className:s().level,width:"3em"},{dataIndex:"notes",title:"notes",sorter:(0,u.RO)((function(e){return e.notes})),render:e((function(e){return e.notes})),className:s().notes,width:"4em"},{dataIndex:"djName",title:"name",sorter:(0,u.RO)((function(e){return e.djName})),render:e((function(e){return e.djName})),className:s().prefecture,width:"5em"},{dataIndex:"rank",title:"rank",sorter:(0,u.RO)((function(e){return e.rank.num})),render:e((function(e){return e.rank.rank})),className:s().rank,width:"4em"},{dataIndex:"score",title:"score",sorter:(0,u.RO)((function(e){return e.score})),render:e((function(e){return e.score})),className:s().score,width:"4em"},{dataIndex:"rate",title:"rate",sortDirections:["descend","ascend"],sorter:(0,u.RO)((function(e){return e.rate.rate})),render:e((function(e){if(void 0===e.rate.rate)return(0,t.jsx)(t.Fragment,{children:"\xa0"});var n=e.rate.rate;return(0,t.jsx)("div",{className:s().rateBarContainer,children:n>0&&(0,t.jsxs)("div",{className:s().rateBar,style:{width:"".concat(100*n,"%")},children:[e.rate.percent,"%"]})})})),className:s().rate,width:"9em"},{title:"around",className:s().groupHeader,children:[{dataIndex:"aroundRank",title:"rank",sorter:(0,u.RO)((function(e){return e.rank.around.num})),render:e((function(e){return e.rank.around.rank})),width:"3em",className:s().rank},{dataIndex:"aroundRankDiff",title:"diff",sorter:(0,u.RO)((function(e){return e.rank.around.diff})),render:e((function(e){return(0,o.S2)(e.rank.around.diff)})),className:s().diff,width:"4em"}]},{title:"next",className:s().referenceGroupHeader,children:[{dataIndex:"nextRank",title:"rank",sorter:(0,u.RO)((function(e){return e.rank.next.num})),render:e((function(e){return e.rank.next.rank})),width:"3em",className:s().referenceRank},{dataIndex:"nextRankDiff",title:"diff",sorter:(0,u.RO)((function(e){return e.rank.next.diff})),render:e((function(e){return(0,o.S2)(e.rank.next.diff)})),className:s().referenceDiff,width:"4em"}]},{title:"prev",className:s().referenceGroupHeader,children:[{dataIndex:"prevRank",title:"rank",sorter:(0,u.RO)((function(e){return e.rank.prev.num})),render:e((function(e){return e.rank.prev.rank})),width:"3em",className:s().referenceRank},{dataIndex:"prevRankDiff",title:"diff",sorter:(0,u.RO)((function(e){return e.rank.prev.diff})),render:e((function(e){return(0,o.S2)(e.rank.prev.diff)})),className:s().referenceDiff,width:"4em"}]}]},f=r(74897),l=(r(92015),r(4863)),m=function(){return(0,t.jsx)(l.default,{type:"error",message:"\u3053\u306e\u90fd\u9053\u5e9c\u770c\u3068\u30d0\u30fc\u30b8\u30e7\u30f3\u306e\u30c7\u30fc\u30bf\u306f\u5b58\u5728\u3057\u307e\u305b\u3093\u3002"})},v=r(58308),p=r(67294),h=r(2811),k=[{id:"difficulty",name:"Difficulty",value:function(e){return e.difficulty.num},label:function(e){return e.difficulty.name.toLocaleUpperCase()}},{id:"version",name:"Version",value:function(e){return e.version.num},label:function(e){return e.version.name},sort:function(e){return e.version.num}},{id:"level",name:"Level",value:function(e){return e.level},label:function(e){return e.level?"\u2606".concat(e.level):"?"},sort:function(e){return e.level},width:"9em"},(0,u.TF)(),{id:"rate",name:"Score Rate",value:function(e){return e.rate.percentFloor},label:function(e){return isNaN(e.rate.percentFloor)?"?":"".concat(e.rate.percentFloor,"%")},width:"9em"},(0,u.DK)(),{id:"prefecture",name:"Prefecture",value:function(e){return e.prefecture.name},sort:function(e){return e.prefecture.num},width:"9em"},{id:"djName",name:"DJ Name",value:function(e){return e.djName},sort:function(e){return e.djName},width:"9em"}],x=function(e){var n=e.searchKeyword,r=e.version,a=e.prefecture,i=e.isFilterOpen,u=e.onFilterToggle,c=e.onFilterChange,s=(0,p.useState)({}),l=s[0],x=s[1],N=(0,p.useState)({}),w=N[0],y=N[1],g=(0,p.useState)(),R=g[0],C=g[1],j=(0,p.useMemo)((function(){return d()}),[]),O=(0,p.useMemo)((function(){return a&&r?[(0,h.AT)(r,a)]:[]}),[r,a]),b=(0,p.useCallback)((function(){u(!1)}),[u]),I=(0,p.useCallback)((function(e,n){y(e),c(n)}),[y,c]),F=(0,p.useCallback)((function(e,n){x(e),C(n)}),[]);return(0,p.useEffect)((function(){y({}),x({})}),[a,r,y,x]),(0,p.useMemo)((function(){return(0,h.vv)(a,r)}),[a,r])?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v.Z,{filterTypes:k,filterChecks:w,filterCounts:l,filterSummary:R,isFilterOpen:i,onChangeFilterChecks:I,onClose:b}),(0,t.jsx)(f.z,{columns:j,rowsCreator:o.OA,scoreCsvPaths:O,filterTypes:k,filterChecks:w,onLoaded:F,searchKeyword:n})]}):(0,t.jsx)(m,{})},N=r(59999),w=r(51436),y=r(17625),g=function(e){var n=function(e){return function(n,r){return function(a,i){var o=e.current.includes(i.key),c="function"===typeof r?r(i):r,d=(0,u.Q2)(n(i));return{children:o?(0,t.jsx)("div",{className:s().expandedCellInner,children:(0,t.jsx)("div",{className:s().commonCell,children:d})}):d,props:c}}}}(e),r=function(e){return function(n,r){return function(r,a){return e.current.includes(a.key)?{children:(0,t.jsx)("div",{children:(0,N.Z)(a.childRows||[]).map((function(e,r){var i,u,o=(null===(i=e.playVersion)||void 0===i?void 0:i.num)===(null===(u=a.topPlayVersion)||void 0===u?void 0:u.num),c=n(e),d=null!==c&&void 0!==c?c:"-";return(0,t.jsx)("div",{className:o?s().top:s().histories,id:e.key,children:d},e.key||r)}))}),props:{className:s().expandedIndividualCell}}:(0,u.Q2)(n(a))}}}(e);return[{dataIndex:"version",title:"ver",defaultSortOrder:"descend",sorter:(0,u.RO)((function(e){return e.version.num})),render:n((function(e){return e.version.shortName})),className:s().version,width:"7em"},{dataIndex:"title",title:"title",sorter:(0,u.RO)((function(e){return e.title})),render:n((function(e){return e.title})),defaultSortOrder:"ascend",width:"13em",className:s().title},{dataIndex:"difficulty",title:"dif",sorter:function(e,n){return(0,i.E)(e.difficulty.num,n.difficulty.num)},render:n((function(e){return e.difficulty.shortName}),(function(e){return{className:s()[e.difficulty.name]}})),width:"3em",className:s().difficulty},{dataIndex:"level",title:"Lv",sorter:(0,u.RO)((function(e){return e.level})),render:n((function(e){return e.level})),className:s().level,width:"3em"},{dataIndex:"notes",title:"notes",sorter:(0,u.RO)((function(e){return e.notes})),render:n((function(e){return e.notes})),className:s().notes,width:"4em"},{dataIndex:"playVersion",title:(0,t.jsxs)("span",{children:["play",(0,t.jsx)("br",{}),"ver"]}),sorter:(0,u.RO)((function(e){return e.playVersion.num})),render:r((function(e){return e.playVersion.shortName})),className:s().playVersion,width:"4em"},{dataIndex:"no",title:"No",render:r((function(e){return e.aggregate?0===e.aggregate.ranking?(0,t.jsx)(y.G,{icon:w.kWN}):e.aggregate.ranking:(0,t.jsx)(t.Fragment,{children:"\xa0"})})),className:s().prefecture,width:"3em"},{dataIndex:"prefecture",title:(0,t.jsxs)("div",{children:["prefe-",(0,t.jsx)("br",{}),"cture"]}),sorter:(0,u.RO)((function(e){return e.prefecture.num})),render:r((function(e){return e.prefecture.name})),className:s().prefecture,width:"5em"},{dataIndex:"djName",title:"name",sorter:(0,u.RO)((function(e){return e.djName})),render:r((function(e){return e.djName})),className:s().prefecture,width:"5em"},{dataIndex:"rank",title:"rank",sorter:(0,u.RO)((function(e){return e.rank.num})),render:r((function(e){return e.rank.rank})),className:s().rank,width:"4em"},{dataIndex:"score",title:"score",sorter:(0,u.RO)((function(e){return e.score})),render:r((function(e){return e.score})),className:s().score,width:"4em"},{dataIndex:"rate",title:"rate",sortDirections:["descend","ascend"],sorter:(0,u.RO)((function(e){return e.rate.rate})),render:r((function(e){if(void 0===e.rate.rate)return(0,t.jsx)(t.Fragment,{children:"\xa0"});var n=e.rate.rate;return(0,t.jsx)("div",{className:s().rateBarContainer,children:n>0&&(0,t.jsxs)("div",{className:s().rateBar,style:{width:"".concat(100*n,"%")},children:[e.rate.percent,"%"]})})})),className:s().rate,width:"9em"},{title:"around",className:s().groupHeader,children:[{dataIndex:"aroundRank",title:"rank",sorter:(0,u.RO)((function(e){return e.rank.around.num})),render:r((function(e){return e.rank.around.rank})),width:"3em",className:s().rank},{dataIndex:"aroundRankDiff",title:"diff",sorter:(0,u.RO)((function(e){return e.rank.around.diff})),render:r((function(e){return(0,o.S2)(e.rank.around.diff)})),className:s().diff,width:"4em"}]},{dataIndex:"topDiff",title:(0,t.jsxs)("span",{children:["top",(0,t.jsx)("br",{}),"diff"]}),render:r((function(e){return e.aggregate?0===e.aggregate.ranking?"-":(0,o.S2)(e.aggregate.diff.top):(0,t.jsx)(t.Fragment,{children:"\xa0"})})),className:s().topDiff,width:"4em"},{title:"next",className:s().referenceGroupHeader,children:[{dataIndex:"nextRank",title:"rank",sorter:(0,u.RO)((function(e){return e.rank.next.num})),render:r((function(e){return e.rank.next.rank})),width:"3em",className:s().referenceRank},{dataIndex:"nextRankDiff",title:"diff",sorter:(0,u.RO)((function(e){return e.rank.next.diff})),render:r((function(e){return(0,o.S2)(e.rank.next.diff)})),className:s().referenceDiff,width:"4em"}]},{title:"prev",className:s().referenceGroupHeader,children:[{dataIndex:"prevRank",title:"rank",sorter:(0,u.RO)((function(e){return e.rank.prev.num})),render:r((function(e){return e.rank.prev.rank})),width:"3em",className:s().referenceRank},{dataIndex:"prevRankDiff",title:"diff",sorter:(0,u.RO)((function(e){return e.rank.prev.diff})),render:r((function(e){return(0,o.S2)(e.rank.prev.diff)})),className:s().referenceDiff,width:"4em"}]}]},R=r(39399),C=[{id:"difficulty",name:"Difficulty",value:function(e){return e.difficulty.num},label:function(e){return e.difficulty.name.toLocaleUpperCase()}},{id:"version",name:"Version",value:function(e){return e.version.num},label:function(e){return e.version.name},sort:function(e){return e.version.num}},{id:"level",name:"Level",value:function(e){return e.level},label:function(e){return e.level?"\u2606".concat(e.level):"?"},sort:function(e){return e.level},width:"9em"},(0,u.TF)(),{id:"rate",name:"Score Rate",value:function(e){return e.rate.percentFloor},label:function(e){return isNaN(e.rate.percentFloor)?"?":"".concat(e.rate.percentFloor,"%")},width:"9em"},(0,u.DK)(),{id:"topVersion",name:"Top Version",value:function(e){return e.topPlayVersion.name},label:function(e){return e.topPlayVersion.name},sort:function(e){return e.topPlayVersion.num}},{id:"prefecture",name:"Prefecture",value:function(e){return e.prefecture.name},sort:function(e){return e.prefecture.num},width:"9em"},{id:"djName",name:"DJ Name",value:function(e){return e.djName},sort:function(e){return e.djName},width:"9em"}],j=function(e){var n=e.searchKeyword,r=e.prefecture,a=e.isFilterOpen,i=e.onFilterToggle,u=e.onFilterChange,c=e.version,s=(0,p.useRef)([]),d=(0,p.useState)({}),l=d[0],k=d[1],x=(0,p.useState)({}),N=x[0],w=x[1],y=(0,p.useState)(),j=y[0],O=y[1],b=(0,p.useMemo)((function(){return g(s)}),[s]),I=(0,p.useMemo)((function(){return r&&c?(0,R.Ft)(r,c).reverse().map((function(e){return(0,h.AT)(e.num,r)})):[]}),[r,c]),F=(0,p.useCallback)((function(e){s.current=e}),[]),_=(0,p.useCallback)((function(){i(!1)}),[i]),S=(0,p.useCallback)((function(e,n){w(e),u(n)}),[u,w]),D=(0,p.useCallback)((function(e,n){k(e),O(n)}),[]);return(0,p.useEffect)((function(){w({}),k({})}),[r,c,w,k]),(0,p.useMemo)((function(){return(0,h.vv)(r,c)}),[r,c])?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v.Z,{filterTypes:C,filterChecks:N,filterCounts:l,filterSummary:j,isFilterOpen:a,onChangeFilterChecks:S,onClose:_}),(0,t.jsx)(f.z,{columns:b,rowsCreator:o.OA,scoreCsvPaths:I,onExpandedRowsChange:F,filterTypes:C,filterChecks:N,onLoaded:D,searchKeyword:n})]}):(0,t.jsx)(m,{})},O=r(75517),b=r(74462),I=function(){var e=(0,p.useState)(""),n=e[0],r=e[1],i=(0,p.useState)(""),u=i[0],o=i[1],c=(0,p.useState)(""),s=c[0],d=c[1],f=(0,p.useState)(!1),l=f[0],m=f[1],v=(0,p.useState)([]),h=v[0],k=v[1],N=(0,p.useCallback)((function(e){r(e)}),[r]),w=(0,p.useCallback)((function(e){d(e)}),[d]),y=(0,p.useCallback)((function(e){o(e)}),[o]),g=(0,p.useCallback)((function(e){m(e)}),[m]),R=(0,p.useCallback)((function(e){k(e)}),[k]);return(0,t.jsx)(a.Z,{condition:(0,t.jsx)(O.Z,{onKeywordChange:N,onPrefectureChange:y,onVersionChange:w,onFilterToggle:g,isFilterOpen:l,enableAllPrefecture:!1,filteredNames:h}),table:s===b.PW||s===b.zv?(0,t.jsx)(j,{isFilterOpen:l,searchKeyword:n,prefecture:u,version:s,onFilterToggle:g,onFilterChange:R}):(0,t.jsx)(x,{isFilterOpen:l,searchKeyword:n,version:s,prefecture:u,onFilterToggle:g,onFilterChange:R})})};I.layout={contentHeaderSticky:!0};var F=I},73840:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/sp/histories",function(){return r(20144)}])},8656:function(e){e.exports={normal:"ed959b5e",hyper:"e35c8620",another:"_8a50ec9e",leggendaria:"f13317de",beginner:"c36dd898",title:"_74858e92",score:"a5b07af1",rate:"_3128cb49",rateBarContainer:"_6c5235c8",rateBar:"dbde30f5",notes:"_76bb4ecc",level:"_78400124",difficulty:"_477ad1e3",rank:"aade9ffc",expand:"ccb85f65",version:"_623138f2",diff:"_057c4a8b",prefecture:"f2e1c7d7",playVersion:"_3626aa38",topDiff:"_74e1d1fb",commonCell:"_4fa1ca08",expandedCellInner:"_6f776562",top:"_9005ef0a",histories:"ec446d09",expandedIndividualCell:"_56d1900b",groupHeader:"_324a1592",reference:"_412fabcd",referenceGroupHeader:"a8ff9d27",referenceRank:"af3ca4a7",referenceDiff:"e9161e9e"}}},function(e){e.O(0,[67,657,39,810,774,888,179],(function(){return n=73840,e(e.s=n);var n}));var n=e.O();_N_E=n}]);