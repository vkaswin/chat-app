"use strict";(self.webpackChunkreact_chat_app=self.webpackChunkreact_chat_app||[]).push([[1077,8641,517,8731,9599,3487],{8641:function(e,n,t){t.r(n),t.d(n,{Emoji:function(){return l}});var i=t(885),o=t(2791),r=t(9930),a=t(5357),c=t(517),s=t(184),l=function(e){var n=e.toggle,t=e.isOpen,l=e.selector,u=e.onChange,m=(0,o.useRef)(),d=function(e){return function(){u(e),n()}};return(0,s.jsx)(r.DropDown,{isOpen:t,toggle:n,selector:l,placement:"top-center",children:(0,s.jsxs)("div",{className:c.default.emoji_container,children:[(0,s.jsxs)("div",{className:c.default.emoji_header,children:[[{label:"Smileys & People",icon:"bx-smile"},{label:"Animals & Nature",icon:"bx-leaf"},{label:"Travel & Places",icon:"bx-home-alt"},{label:"Activities",icon:"bx-baseball"},{label:"Objects",icon:"bx-world"},{label:"Symbols",icon:"bx-bulb"},{label:"Flags",icon:"bx-flag"}].map((function(e,n){var t,i=e.label,o=e.icon;return(0,s.jsxs)("div",{id:"emoji-type-".concat(n),className:c.default.emoji_type,onClick:(t=i,function(){var e=document.querySelector('[emoji-title="'.concat(t,'"]')).offsetTop;m.current.scrollTo(0,e-95)}),children:[(0,s.jsx)("i",{className:o}),(0,s.jsx)(r.Tooltip,{placement:"top",selector:"#emoji-type-".concat(n),offset:10,children:i})]},n)})),(0,s.jsxs)("div",{id:"emoji-close",className:c.default.close,onClick:n,children:[(0,s.jsx)("span",{children:"\u2a2f"}),(0,s.jsx)(r.Tooltip,{placement:"top",selector:"#emoji-close",offset:10,children:"Close"})]})]}),(0,s.jsxs)("div",{className:c.default.search_emoji,children:[(0,s.jsx)("input",{type:"text",placeholder:"Search Emoji"}),(0,s.jsx)("div",{className:c.default.search_icon,children:(0,s.jsx)("i",{className:"bx-search-alt-2"})})]}),(0,s.jsx)("div",{className:c.default.emoji_card,ref:m,children:Object.entries(a).map((function(e,n){var t=(0,i.Z)(e,2),o=t[0],r=t[1];return(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:c.default.emoji_title,"emoji-title":o,children:(0,s.jsx)("b",{children:o})}),(0,s.jsx)("div",{className:c.default.emoji_list,children:r.map((function(e,n){var t=e.emoji,i=e.description;return(0,s.jsx)("button",{title:i,onClick:d(t),children:(0,s.jsx)("div",{className:c.default.emoji_icon,children:t})},n)}))})]},n)}))})]})})}},1077:function(e,n,t){t.r(n),t.d(n,{TextArea:function(){return j}});var i=t(7762),o=t(4165),r=t(5861),a=t(885),c=t(2791),s=t(3487),l=t(8641),u=t(5145),m=t(2703),d=t(9102),f=t(8731),p=t(184),j=function(e){var n=e.onSend,t=e.onFocus,j=e.chatId,_=e.otherUser,h=(0,c.useState)(!1),x=(0,a.Z)(h,2),v=x[0],b=x[1],g=(0,c.useState)(""),y=(0,a.Z)(g,2),w=y[0],E=y[1],N=(0,c.useState)(),k=(0,a.Z)(N,2),Z=k[0],T=k[1],C=(0,c.useState)(!1),S=(0,a.Z)(C,2),A=S[0],F=S[1],U=(0,c.useRef)();(0,c.useEffect)((function(){var e=new(window.SpeechRecognition||window.webkitSpeechRecognition);e.interimResults=!0,e.continuous=!0,e.onstart=function(e){console.log(e)},e.onend=function(e){console.log(e)},e.onresult=function(e){var n=e.results,t=Array.from(n).map((function(e){return e[0]})).map((function(e){return e.transcript})).join("");E(w.concat(t))},e.onerror=function(e){console.log(e)},T(e)}),[]);var D=function(){return Array.isArray(_)?_.map((function(e){return{id:e._id,name:e.name}})):_},R=function(){var e=(0,r.Z)((0,o.Z)().mark((function e(){var t;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==(t=U.current.value).length){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,n(t);case 5:U.current.value="";case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(){var e=(0,r.Z)((0,o.Z)().mark((function e(n){var t,r,a,c,l,m;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=n.target.files,e.prev=1,r=new FormData,a=(0,i.Z)(t);try{for(a.s();!(c=a.n()).done;)l=c.value,r.append("file",l)}catch(o){a.e(o)}finally{a.f()}return e.next=7,(0,s.fileUpload)(r);case 7:m=e.sent,console.log(m),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),(0,u.Toast)({type:"error",message:null===e.t0||void 0===e.t0?void 0:e.t0.message});case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(n){return e.apply(this,arguments)}}();return(0,p.jsxs)(c.Fragment,{children:[(0,p.jsxs)("div",{className:f.default.chat_input,children:[(0,p.jsx)("i",{className:"bx-smile",id:"emoji"}),(0,p.jsxs)("div",{className:f.default.input_field,children:[(0,p.jsx)("textarea",{ref:U,placeholder:"Type your message...",name:"chat-input",onFocus:t,onKeyDown:function(){A||(d.socket.emit("start-typing",j,D()),F(!0))},onChange:(0,m.debounce)((function(){d.socket.emit("end-typing",j,D()),F(!1)}),1e3)}),(0,p.jsx)("label",{htmlFor:"chat-file",children:(0,p.jsx)("i",{className:"bx-paperclip",id:"attach"})}),(0,p.jsx)("input",{id:"chat-file",type:"file",onChange:P,multiple:!0,hidden:!0})]}),(0,p.jsx)("button",{onClick:R,children:(0,p.jsx)("i",{className:"bxs-send"})}),(0,p.jsx)("i",{className:"bx-microphone",id:"mic",onPointerDown:function(){null===Z||void 0===Z||Z.start()},onPointerUp:function(){null===Z||void 0===Z||Z.stop()}})]}),(0,p.jsx)(l.Emoji,{selector:"#emoji",isOpen:v,toggle:function(){b(!v)},onChange:function(e){E(w.concat(e))}})]})}},3487:function(e,n,t){t.r(n),t.d(n,{fileUpload:function(){return s},metaData:function(){return c}});var i=t(4165),o=t(5861),r=t(9599),a=t(77),c=(t(9930),function(e){var n;return(0,r.axios)({url:null===(n=a.endpoints.others)||void 0===n?void 0:n.metaData,method:"post",data:e})}),s=function(){var e=(0,o.Z)((0,i.Z)().mark((function e(n){var t;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,r.axios)({url:null===(t=a.endpoints.others)||void 0===t?void 0:t.fileUpload,method:"post",data:n}));case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},9599:function(e,n,t){t.r(n),t.d(n,{axios:function(){return c}});var i=t(4569),o=t.n(i),r=t(2703),a=t(77),c=o().create({baseURL:a.baseURL});c.interceptors.request.use((function(e){var n=(0,r.cookies)().get("authToken");return n&&(e.headers.Authorization=n),e}),(function(e){return Promise.reject(e)})),c.interceptors.response.use((function(e){return e}),(function(e){var n;return 401===e.response.status&&document.dispatchEvent(new CustomEvent("logout")),Promise.reject(null===e||void 0===e||null===(n=e.response)||void 0===n?void 0:n.data)}))},517:function(e,n,t){t.r(n),n.default={emoji_enter:"Emoji_emoji_enter__hm4pK",emoji_container:"Emoji_emoji_container__FeFYJ",emoji_wrapper:"Emoji_emoji_wrapper__Mni-7","emoji-anime":"Emoji_emoji-anime__vboWK",emoji_exit:"Emoji_emoji_exit__yUFuv",emoji_header:"Emoji_emoji_header__HJTsc",emoji_type:"Emoji_emoji_type__Hmz-D",close:"Emoji_close__Tlf+A",search_emoji:"Emoji_search_emoji__QHZYs",search_icon:"Emoji_search_icon__EVS9p",emoji_card:"Emoji_emoji_card__cVAbK",emoji_title:"Emoji_emoji_title__uaqYB",emoji_list:"Emoji_emoji_list__zUunG",emoji_icon:"Emoji_emoji_icon__QGww2"}},8731:function(e,n,t){t.r(n),n.default={chat_input:"TextArea_chat_input__+dl6x",input_field:"TextArea_input_field__++nq-"}}}]);
//# sourceMappingURL=1077.9da9a02e.chunk.js.map