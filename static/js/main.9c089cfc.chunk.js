(this["webpackJsonprental-app"]=this["webpackJsonprental-app"]||[]).push([[0],{54:function(e,t,n){e.exports=n(69)},59:function(e,t,n){},68:function(e,t,n){},69:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(6),o=n.n(c),u=n(10),i=(n(59),n(18)),l=n(12),s=n(16),m=n(11),d=n.n(m),f=n(13),p=n(98),b=n(97),v=n(14),E=n(35);n(61);E.initializeApp({apiKey:"AIzaSyDllzovC1YT7zlssPkY9ZqXiysgutS19I4",authDomain:"forum-app-12822.firebaseapp.com",databaseURL:"https://forum-app-12822.firebaseio.com",projectId:"forum-app-12822",storageBucket:"forum-app-12822.appspot.com",messagingSenderId:"247227593406",appId:"1:247227593406:web:daf730938741ea99ab24ef",measurementId:"G-8ZN98439B5"});var g=E.firestore(),j=g.collection("accounts"),O=g.collection("posts");function x(){var e=Object(f.a)(["\n  margin: 15px;\n  font-size: smaller;\n  padding: 5px;\n"]);return x=function(){return e},e}function h(){var e=Object(f.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  margin-bottom: 10px;\n"]);return h=function(){return e},e}function w(){var e=Object(f.a)(["\n  font-size: 10px;\n  color: grey;\n  text-align: right;\n"]);return w=function(){return e},e}function y(){var e=Object(f.a)(["\n  display: flex;\n  flex-direction: column;\n  margin: 10px auto auto auto;\n  width: 90vw;\n"]);return y=function(){return e},e}function k(){var e=Object(f.a)(["\n  margin: 10px;\n  background: #d3d3d3;\n  padding: 5px;\n"]);return k=function(){return e},e}function S(){var e=Object(f.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n"]);return S=function(){return e},e}var T=v.a.div(S()),A=v.a.div(k()),C=v.a.div(y()),P=v.a.div(w()),I=v.a.div(h()),N=v.a.div(x()),_={weekday:"long",year:"numeric",month:"long",day:"numeric"},R=function(){var e=Object(a.useContext)(K).state,t=Object(a.useState)({}),n=Object(u.a)(t,2),c=n[0],o=n[1],m=Object(a.useState)(""),f=Object(u.a)(m,2),v=f[0],E=f[1],g=Object(a.useState)({}),j=Object(u.a)(g,2),x=j[0],h=j[1];function w(){var e;return d.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return e={},t.next=3,d.a.awrap(O.get().then((function(t){return d.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,d.a.awrap(t.forEach((function(t){var n=t.data(),a=t.id;e[a]={topic:n.topic,topicAuthor:n.topicAuthor,topicTime:n.topicTime,comments:n.comments}})));case 2:case"end":return n.stop()}}))})));case 3:o(e);case 4:case"end":return t.stop()}}))}return Object(a.useEffect)((function(){w()}),[]),r.a.createElement(C,null,r.a.createElement(T,null,r.a.createElement(b.a,{id:"standard=basic",label:"New Topic",onChange:function(e){return E(e.target.value)},value:v}),r.a.createElement(p.a,{size:"small",color:"primary",onClick:function(){return d.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(""===v){t.next=5;break}return O.add({topic:v,topicAuthor:e.username,topicTime:Date.now(),comments:[]}),t.next=4,d.a.awrap(w());case 4:E("");case 5:case"end":return t.stop()}}))}},"Create")),r.a.createElement("div",null,Object.keys(c).map((function(t,n){var a=c[t];return r.a.createElement(A,{key:"post-".concat(n)},r.a.createElement(I,{key:"post-topic-block-".concat(t)},r.a.createElement("div",null,a.topic),r.a.createElement("div",null,r.a.createElement(P,null,a.topicAuthor),r.a.createElement(P,null,new Date(a.topicTime).toLocaleDateString(void 0,_)))),r.a.createElement(I,{key:"post-comment-block-".concat(t)},r.a.createElement("div",{key:"new-comment-".concat(n)},r.a.createElement(b.a,{label:"Your Comment",multiline:!0,rows:"3",key:"new-comment-".concat(t),onChange:function(e){return n=t,a=e.target.value,void h(Object(i.a)({},x,Object(l.a)({},n,a)));var n,a},defaultValue:"",value:x[t]})),r.a.createElement("div",null,r.a.createElement(p.a,{variant:"contained",size:"small",onClick:function(){return function(t){var n=x[t],a=Object(i.a)({},c[t],{comments:[].concat(Object(s.a)(c[t].comments),[{comment:n,commentAuthor:e.username,commentTime:Date.now()}])});o(Object(i.a)({},c,Object(l.a)({},t,a))),O.doc(t).update(Object(i.a)({},a)),h(Object(i.a)({},x,Object(l.a)({},t,"")))}(t)}},"Comment"))),r.a.createElement(N,{key:"obj-".concat(t,"-comment-block")},a.comments.map((function(e,n){return r.a.createElement(I,{key:"obj-".concat(t,"-comment-").concat(n)},r.a.createElement("div",null,e.comment),r.a.createElement("div",null,r.a.createElement(P,null,e.commentAuthor),r.a.createElement(P,null,new Date(e.commentTime).toLocaleDateString(void 0,_))))}))))}))))},L=n(45);function G(){var e=Object(f.a)(["\n  text-align: center;\n  color: red;\n"]);return G=function(){return e},e}function U(){var e=Object(f.a)(["\n  margin: 5px;\n  text-align: center;\n  align-items: center;\n"]);return U=function(){return e},e}function z(){var e=Object(f.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return z=function(){return e},e}function D(){var e=Object(f.a)(["\n  display: flex;\n  justify-content: space-around;\n  align-items: flex-end;\n  text-align: center;\n  margin: 5vh auto;\n  max-width: 95vw;\n"]);return D=function(){return e},e}var M,Y=v.a.div(D()),B=v.a.div(z()),Z=v.a.div(U()),J=v.a.div(G()),q=function(){var e=Object(a.useContext)(K).dispatch,t=Object(a.useState)(""),n=Object(u.a)(t,2),c=n[0],o=n[1],i=Object(a.useState)(""),l=Object(u.a)(i,2),s=l[0],m=l[1],f=Object(a.useState)(!1),v=Object(u.a)(f,2),E=v[0],g=v[1],O=Object(a.useState)(!1),x=Object(u.a)(O,2),h=x[0],w=x[1],y=Object(a.useState)(!1),k=Object(u.a)(y,2),S=k[0],T=k[1],A=Object(a.useState)(!0),C=Object(u.a)(A,2),P=C[0],I=C[1],N=Object(a.useState)(!1),_=Object(u.a)(N,2),R=_[0],G=_[1];function U(){var e;return d.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return e=!1,t.next=3,d.a.awrap(j.get().then((function(t){t.forEach((function(t){c===t.data().username&&s===t.data().password&&(e=!0)}))})));case 3:return t.abrupt("return",e);case 4:case"end":return t.stop()}}))}return r.a.createElement("div",null,r.a.createElement(Y,null,r.a.createElement(B,null,r.a.createElement(Z,null,r.a.createElement(b.a,{id:"standard-basic",label:"Username",onChange:function(e){return o(e.target.value)}})),r.a.createElement(Z,null,r.a.createElement(b.a,{id:"standard-basic",label:"Password",onChange:function(e){return m(e.target.value)}}))),r.a.createElement(Z,null,r.a.createElement(L.a,{sitekey:"6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",onChange:function(e){return function(e){null!==e&&(g(!0),T(!1))}(e)}}))),r.a.createElement(Z,null,r.a.createElement(p.a,{variant:"contained",onClick:function(){return d.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(G(!1),""===c||""===s){t.next=13;break}if(E){t.next=6;break}T(!0),t.next=11;break;case 6:return T(!1),t.next=9,d.a.awrap(U());case 9:t.sent?e({username:c,currentPage:"Forum",type:M.SET_LOGIN}):I(!1);case 11:t.next=14;break;case 13:w(!0);case 14:case"end":return t.stop()}}))}},"Login")),r.a.createElement(Z,null,r.a.createElement(p.a,{variant:"contained",onClick:function(){return d.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:if(""===c||""===s){e.next=12;break}if(w(!1),E){e.next=6;break}T(!0),e.next=10;break;case 6:return e.next=8,d.a.awrap(U());case 8:!e.sent&&E&&(j.add({username:c,password:s}),I(!0),G(!0));case 10:e.next=13;break;case 12:w(!0);case 13:case"end":return e.stop()}}))}},"Register")),r.a.createElement(J,null,r.a.createElement("div",null,h&&r.a.createElement("div",null,"Please fill in all the fields.")),r.a.createElement("div",null,S&&r.a.createElement("div",null,"Please let us know you are not a robot.")),r.a.createElement("div",null,!P&&r.a.createElement("div",null,"You might enter your username or password wrong, or do not have an account with us. Please register.")),r.a.createElement("div",null,R&&r.a.createElement("div",null,"You may login again now."))))};!function(e){e.SET_CURRENT_PAGE="SET_CURRENT_PAGE",e.SET_USERNAME="SET_USERNAME",e.SET_LOGIN="SET_LOGIN"}(M||(M={}));var F={currentPage:"Login",username:"user3"},K=Object(a.createContext)({});function V(e,t){switch(t.type){case M.SET_CURRENT_PAGE:return Object(i.a)({},e,{currentPage:t.currentPage});case M.SET_USERNAME:return Object(i.a)({},e,{username:t.username});case M.SET_LOGIN:return Object(i.a)({},e,{username:t.username,currentPage:t.currentPage});default:return e}}var W={Login:q,Forum:R},X=function(){var e=Object(a.useReducer)(V,F),t=Object(u.a)(e,2),n=t[0],c=t[1],o=W[n.currentPage];return r.a.createElement(K.Provider,{value:{state:n,dispatch:c}},r.a.createElement("div",{className:"App"},r.a.createElement(o,null)))};n(68),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(X,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[54,1,2]]]);
//# sourceMappingURL=main.9c089cfc.chunk.js.map